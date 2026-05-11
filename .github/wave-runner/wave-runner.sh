#!/usr/bin/env bash
# wave-runner.sh — Autonomous wave implementation orchestrator for diwa-design-system
# Invoked by launchd every 20 minutes. Reads/writes wave-state.json to advance the pipeline.

set -euo pipefail

REPO="jortega0033/diwa-design-system"
REPO_DIR="/Users/jakeortega/Documents/Projects/diwa-design-system"
STATE_FILE="$REPO_DIR/.github/wave-runner/wave-state.json"
PROMPT_FILE="$REPO_DIR/.github/prompts/wave-implementation.prompt.md"
LOCK_FILE="/tmp/diwa-wave-runner.lock"
LOG_FILE="/tmp/diwa-wave-runner.log"

# ---------------------------------------------------------------------------
# Utilities
# ---------------------------------------------------------------------------

log() {
  local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $*"
  echo "$msg"
}

get_state() {
  python3 -c "import json,sys; d=json.load(open('$STATE_FILE')); print(d.get('$1',''))"
}

set_state() {
  local key="$1"
  local value="$2"
  python3 - <<PYEOF
import json
with open('$STATE_FILE', 'r') as f:
    d = json.load(f)
d['$key'] = $value
d['last_run'] = '$(date -u +"%Y-%m-%dT%H:%M:%SZ")'
with open('$STATE_FILE', 'w') as f:
    json.dump(d, f, indent=2)
PYEOF
}

set_state_str() {
  local key="$1"
  local value="$2"
  python3 - <<PYEOF
import json
with open('$STATE_FILE', 'r') as f:
    d = json.load(f)
d['$key'] = '$value'
d['last_run'] = '$(date -u +"%Y-%m-%dT%H:%M:%SZ")'
with open('$STATE_FILE', 'w') as f:
    json.dump(d, f, indent=2)
PYEOF
}

append_log() {
  python3 - <<PYEOF
import json
from datetime import datetime
with open('$STATE_FILE', 'r') as f:
    d = json.load(f)
d.setdefault('log', []).append({'ts': datetime.utcnow().isoformat()+'Z', 'msg': '$1'})
d['log'] = d['log'][-50:]  # keep last 50 entries
with open('$STATE_FILE', 'w') as f:
    json.dump(d, f, indent=2)
PYEOF
}

# ---------------------------------------------------------------------------
# Lock — prevent concurrent runs
# ---------------------------------------------------------------------------

acquire_lock() {
  if [ -f "$LOCK_FILE" ]; then
    local lock_pid
    lock_pid=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
    if [ -n "$lock_pid" ] && kill -0 "$lock_pid" 2>/dev/null; then
      log "Another runner instance (PID $lock_pid) is still running. Exiting."
      exit 0
    fi
    log "Stale lock found — removing."
    rm -f "$LOCK_FILE"
  fi
  echo $$ > "$LOCK_FILE"
}

release_lock() {
  rm -f "$LOCK_FILE"
}

trap release_lock EXIT

# ---------------------------------------------------------------------------
# Batching — fetch and group issues once, on first run
# ---------------------------------------------------------------------------

batch_issues() {
  log "Fetching and batching all open issues..."

  python3 - <<'PYEOF'
import subprocess, json, sys

result = subprocess.run(
    ['gh', 'issue', 'list', '--repo', 'jortega0033/diwa-design-system',
     '--state', 'open', '--limit', '200',
     '--json', 'number,title,labels'],
    capture_output=True, text=True
)
issues = json.loads(result.stdout)

def severity_rank(labels):
    for l in labels:
        name = l['name']
        if name == 'severity:P0': return 0
        if name == 'severity:P1': return 1
        if name == 'severity:P2': return 2
        if name == 'severity:P3': return 3
    return 4

def area(labels):
    for l in labels:
        if l['name'].startswith('area:'):
            return l['name']
    return 'area:misc'

# Sort by severity then area
issues.sort(key=lambda i: (severity_rank(i['labels']), area(i['labels']), i['number']))

# Group into batches: same severity+area together, max 4 per batch
batches = []
current_batch = []
current_key = None

for issue in issues:
    key = (severity_rank(issue['labels']), area(issue['labels']))
    if key != current_key or len(current_batch) >= 4:
        if current_batch:
            batches.append(current_batch)
        current_batch = []
        current_key = key
    current_batch.append(issue['number'])

if current_batch:
    batches.append(current_batch)

print(json.dumps(batches))
PYEOF
}

# ---------------------------------------------------------------------------
# Check if Copilot has already reviewed the PR
# ---------------------------------------------------------------------------

copilot_has_reviewed() {
  local pr_number="$1"
  local result
  result=$(gh api graphql -f query="{
    repository(owner: \"jortega0033\", name: \"diwa-design-system\") {
      pullRequest(number: $pr_number) {
        reviews(first: 20) {
          nodes { author { login } state }
        }
      }
    }
  }" --jq '.data.repository.pullRequest.reviews.nodes[].author.login' 2>/dev/null || echo "")

  if echo "$result" | grep -qi "copilot"; then
    return 0
  fi
  return 1
}

# ---------------------------------------------------------------------------
# Run claude with a prompt
# ---------------------------------------------------------------------------

run_claude() {
  local prompt="$1"
  cd "$REPO_DIR"
  claude -p "$prompt" 2>&1
}

# ---------------------------------------------------------------------------
# Main state machine
# ---------------------------------------------------------------------------

main() {
  acquire_lock

  local phase
  phase=$(get_state phase)
  log "Current phase: $phase"

  case "$phase" in

    # -----------------------------------------------------------------------
    IDLE)
      local batches_raw
      batches_raw=$(python3 -c "import json; d=json.load(open('$STATE_FILE')); print(json.dumps(d.get('batches', [])))")

      if [ "$batches_raw" = "[]" ] || [ -z "$batches_raw" ]; then
        log "No batches yet — fetching and grouping issues..."
        local batches
        batches=$(batch_issues)
        python3 - <<PYEOF
import json
with open('$STATE_FILE', 'r') as f:
    d = json.load(f)
d['batches'] = $batches
d['batch_index'] = 0
with open('$STATE_FILE', 'w') as f:
    json.dump(d, f, indent=2)
PYEOF
        log "Batches written. Next run will begin implementation."
        append_log "Batched issues into $(echo "$batches" | python3 -c 'import json,sys; print(len(json.load(sys.stdin)))') batches"
        exit 0
      fi

      local batch_index
      batch_index=$(get_state batch_index)
      local total_batches
      total_batches=$(python3 -c "import json; d=json.load(open('$STATE_FILE')); print(len(d.get('batches', [])))")

      if [ "$batch_index" -ge "$total_batches" ]; then
        log "All batches complete. Wave finished."
        set_state_str phase "DONE"
        append_log "All batches complete — wave finished"
        exit 0
      fi

      local current_issues
      current_issues=$(python3 -c "
import json
d = json.load(open('$STATE_FILE'))
batch = d['batches'][d['batch_index']]
print(' '.join(f'#{n}' for n in batch))
")
      local wave_number
      wave_number=$(get_state wave_number)

      log "Starting batch $batch_index (wave $wave_number): $current_issues"
      set_state_str phase "IMPLEMENTING"
      append_log "Starting batch $batch_index: $current_issues"

      local prompt
      prompt="You are implementing a batch of design system tickets. Issues: $current_issues. Wave: $wave_number. Batch index: $batch_index. Follow every phase in $PROMPT_FILE exactly. When you reach Phase 8 and request the Copilot review, output 'STATE_PHASE=WAITING_REVIEW' on its own line. When you reach Phase 7 and create the PR, output 'PR_NUMBER=<number>' on its own line."

      local output
      output=$(run_claude "$prompt" 2>&1) || true
      log "Claude output: $output"

      local pr_number
      pr_number=$(echo "$output" | grep -o 'PR_NUMBER=[0-9]*' | cut -d= -f2 || echo "")

      if [ -n "$pr_number" ]; then
        python3 - <<PYEOF
import json
with open('$STATE_FILE', 'r') as f:
    d = json.load(f)
d['current_pr'] = {'number': $pr_number, 'batch_index': d['batch_index'], 'issues': d['batches'][d['batch_index']]}
with open('$STATE_FILE', 'w') as f:
    json.dump(d, f, indent=2)
PYEOF
        log "PR #$pr_number created and recorded."
      fi

      if echo "$output" | grep -q "STATE_PHASE=WAITING_REVIEW"; then
        set_state_str phase "WAITING_REVIEW"
        log "Phase advanced to WAITING_REVIEW"
      fi
      ;;

    # -----------------------------------------------------------------------
    IMPLEMENTING)
      # claude -p is synchronous — if a new tick sees IMPLEMENTING, the previous
      # claude run already finished without producing the expected sentinels.
      # Reset to IDLE so the batch is retried.
      log "IMPLEMENTING seen on a fresh tick — previous Claude run produced no sentinels. Resetting to IDLE."
      set_state_str phase "IDLE"
      append_log "Stale IMPLEMENTING state cleared — resetting to IDLE for retry"
      ;;

    # -----------------------------------------------------------------------
    WAITING_REVIEW)
      local pr_number
      pr_number=$(python3 -c "import json; d=json.load(open('$STATE_FILE')); pr=d.get('current_pr'); print(pr['number'] if pr else '')")

      if [ -z "$pr_number" ]; then
        log "ERROR: WAITING_REVIEW but no current_pr in state. Resetting to IDLE."
        set_state_str phase "IDLE"
        exit 1
      fi

      if copilot_has_reviewed "$pr_number"; then
        log "Copilot has reviewed PR #$pr_number — advancing to ADDRESSING"
        set_state_str phase "ADDRESSING"
        append_log "Copilot review found on PR #$pr_number"
      else
        log "No Copilot review yet on PR #$pr_number — will check again next run."
      fi
      ;;

    # -----------------------------------------------------------------------
    ADDRESSING)
      local pr_number
      pr_number=$(python3 -c "import json; d=json.load(open('$STATE_FILE')); pr=d.get('current_pr'); print(pr['number'] if pr else '')")

      log "Addressing Copilot review comments on PR #$pr_number"
      set_state_str phase "FIXING"

      local prompt
      prompt="You are addressing review comments on PR #$pr_number in the diwa-design-system repo (jortega0033/diwa-design-system). Follow Phase 10 and Phase 11 of $PROMPT_FILE exactly. Fetch all inline Copilot review threads via GraphQL, fix all must-fix items, run all quality gates, then post the ready-to-merge comment. When done, output 'STATE_PHASE=COMPLETE_BATCH' on its own line."

      local output
      output=$(run_claude "$prompt" 2>&1) || true
      log "Claude output (addressing): $output"

      if echo "$output" | grep -q "STATE_PHASE=COMPLETE_BATCH"; then
        set_state_str phase "COMPLETE_BATCH"
        log "Phase advanced to COMPLETE_BATCH"
      else
        log "Addressing incomplete — will retry next run."
        set_state_str phase "ADDRESSING"
      fi
      ;;

    # -----------------------------------------------------------------------
    FIXING)
      log "Claude is still fixing review comments — waiting."
      ;;

    # -----------------------------------------------------------------------
    COMPLETE_BATCH)
      log "Batch complete — advancing to next batch"
      python3 - <<PYEOF
import json
with open('$STATE_FILE', 'r') as f:
    d = json.load(f)
d['batch_index'] = d.get('batch_index', 0) + 1
d['current_pr'] = None
d['phase'] = 'IDLE'
with open('$STATE_FILE', 'w') as f:
    json.dump(d, f, indent=2)
PYEOF
      append_log "Batch completed — advanced to batch index $(get_state batch_index)"
      log "Advanced to batch index $(get_state batch_index). Next run will start next batch."
      ;;

    # -----------------------------------------------------------------------
    BLOCKED)
      local reason
      reason=$(get_state blocked_reason)
      log "Runner is BLOCKED: $reason"
      log "Resolve the blocker and set phase to IDLE in wave-state.json to resume."
      ;;

    # -----------------------------------------------------------------------
    DONE)
      log "All waves complete. Nothing to do."
      ;;

    *)
      log "Unknown phase: $phase. Manual intervention required."
      ;;
  esac
}

main
