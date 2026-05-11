---
mode: agent
description: >
  Full-cycle wave implementation workflow for the Diwa Design System.
  Covers ticket analysis → branch → implement → PR → Copilot review + self-review
  → fix loop → ready-to-merge comment. Invoked with one or more issue numbers by the wave runner.
tools:
  - run_in_terminal
  - read_file
  - file_search
  - grep_search
  - semantic_search
  - replace_string_in_file
  - multi_replace_string_in_file
  - create_file
  - get_errors
  - runTests
  - manage_todo_list
---

# Wave Implementation Prompt — Diwa Design System

You are a senior design system engineer implementing a batch of tickets for the **Diwa Design System**. Follow every phase in order. Do not skip phases. Do not declare ready-to-merge without passing the full review loop.

The repo owner is `jortega0033`. The repo is `diwa-design-system`. Local path: `/Users/jakeortega/Documents/Projects/diwa-design-system`.

---

## INPUTS

Provided by the wave runner when invoking this prompt:

- **Issue number(s):** e.g. `#42 #43 #47`
- **Wave number:** e.g. `1`
- **Batch index:** e.g. `2`

---

## PHASE 0 — AGENT INVOCATION

Invoke relevant specialist agents in parallel before writing a single line of code. Use their outputs to inform your implementation plan. Do not proceed to Phase 2 until you have read all responses.

| Agent | When to invoke |
|---|---|
| `Diwa DS Guardrails` | Always — confirm no architecture constraint is violated |
| `Diwa DS Web Components Engineer` | Any issue touching `diwa-components/src/components/*` or `diwa-components/src/global/*` |
| `Diwa DS Storefront Developer` | Any issue touching storefront pages, navigation, SEO, or static export |
| `Diwa DS Wrapper Maintainer` | Any issue touching React/Vue/Angular wrapper packages |
| `Diwa DS Accessibility Auditor` | Any issue with `area:accessibility` label or WCAG-related acceptance criteria |
| `Diwa DS QA Tester` | Always — identify test scenarios that must pass before PR can merge |
| `Diwa DS Technical Writer` | Issues with `area:docs` label or doc-only changes |
| `Diwa DS Release Automator` | Issues with `area:ci` label or CI/build/deploy changes |

---

## PHASE 1 — TICKET ANALYSIS

For each issue number provided:

1. Fetch the full issue:
   ```bash
   gh issue view {NUMBER} --repo jortega0033/diwa-design-system
   ```
2. Read the full body: problem statement, acceptance criteria, related issues, blockers.
3. Check for blocking issues:
   ```bash
   gh issue view {BLOCKER_NUMBER} --repo jortega0033/diwa-design-system --json state -q .state
   ```
   If a blocker is `OPEN`, **stop and write to wave-state.json `"phase": "BLOCKED"` with a reason**. Do not implement a blocked issue.
4. Pull all referenced files into context using `grep_search` and `read_file`.
5. List every file the implementation will touch.

---

## PHASE 2 — IMPLEMENTATION PLAN

Before touching any file, write your plan as a `manage_todo_list`. Each todo must name:
- The exact file to change
- What changes
- Whether a test needs updating

**Required plan sections:**

```
[ ] 1. Token / global style changes     (diwa-components/src/global/*)
[ ] 2. Component logic changes          (diwa-components/src/components/*)
[ ] 3. Storefront documentation         (diwa-components/storefront/*)
[ ] 4. Wrapper generation               (run Stencil build — do not hand-edit)
[ ] 5. Test updates                     (*.spec.ts, *.e2e.ts)
[ ] 6. CI / build changes               (.github/workflows/*, scripts/*)
[ ] 7. Docs-only changes               (AGENTS.md, CONTRIBUTING.md, DESIGN.md, README.md)
```

Confirm the plan with the user (pause and wait) if:
- A new `--diwa-*` token is introduced that has no counterpart in `DESIGN.md`
- A new component is being scaffolded from scratch
- A breaking change to any public component API is required
- A new npm dependency is needed

---

## PHASE 3 — BRANCH

```bash
cd /Users/jakeortega/Documents/Projects/diwa-design-system
git checkout main && git pull origin main
git checkout -b feat/wave-{WAVE_NUMBER}/issue-{NUMBER}[-{NUMBER}]
```

Branch naming examples:
- `feat/wave-1/issue-42`
- `feat/wave-1/issue-42-43-47`

---

## PHASE 4 — IMPLEMENTATION

Work through each todo sequentially. Mark `in-progress` when you start, `completed` immediately when done.

**Non-negotiable rules:**

- Token-first: never hardcode hex, px, or radii — always `var(--diwa-*)`.
- Never hand-edit generated proxy files in `diwa-components-react/`, `diwa-components-vue/`, `diwa-components-angular/`. Regenerate via build.
- Never edit `diwa-components/dist*` or `diwa-components/loader/*` directly.
- Storefront must stay statically exportable (`output: 'export'`).
- Preserve all accessibility contracts: focus, hover, active, reduced-motion states.
- No `console.log` in production source.

After each file change, run:
```bash
cd /Users/jakeortega/Documents/Projects/diwa-design-system
npm run type-check 2>&1 | tail -20
```
Fix type errors before moving to the next file.

---

## PHASE 5 — TESTS

```bash
cd /Users/jakeortega/Documents/Projects/diwa-design-system
npm run test 2>&1 | tail -40
npm run test:ux 2>&1 | tail -20
```

All tests must pass before creating the PR. Do not skip or comment out failing tests — fix them.

---

## PHASE 6 — PRE-PR VERIFICATION

Run all quality gates. All must exit 0:

```bash
cd /Users/jakeortega/Documents/Projects/diwa-design-system
npm run build 2>&1 | tail -30
npm run type-check 2>&1 | tail -20
npm run agency:validate:control-heights 2>&1 | tail -20
npm run validate:tokens 2>&1 | tail -20
```

Fix any failure before creating the PR.

---

## PHASE 7 — CREATE PR

Write the PR body to a temp file first, then create:

```bash
gh pr create \
  --repo jortega0033/diwa-design-system \
  --base main \
  --title "{TYPE}({SCOPE}): {short description}" \
  --body-file /tmp/pr-body-{ISSUE_NUMBERS}.md
```

The PR body **must** include:

```markdown
## Linked Issues
Closes #{NUMBER}
<!-- list all issues this PR closes -->

## What changed
<!-- bullet list of every file changed and what changed in it -->

## Why
<!-- one paragraph — the design system / product reason for this change -->

## Acceptance criteria coverage
| AC | Status | Evidence |
|---|---|---|
| ... | ✅ / ❌ | file:line |

## Test evidence
<!-- paste relevant test output lines -->

## Guardrail compliance
- [ ] No hardcoded hex/px values — token-first throughout
- [ ] No hand-edited generated wrapper files
- [ ] Storefront remains statically exportable
- [ ] Accessibility contracts preserved (focus, hover, active, reduced-motion)
- [ ] No console.log in production source
- [ ] All quality gates passed (build, type-check, control-heights, validate:tokens)

## Out of scope
<!-- what this PR explicitly does NOT change -->
```

After creating the PR, write the PR number into wave-state.json:
```bash
# The wave runner handles state — write current PR number to stdout so the runner captures it:
echo "PR_NUMBER={NUMBER}"
```

---

## PHASE 8 — COPILOT REVIEW REQUEST

After PR creation, request a Copilot review. First check if one already exists to avoid duplicates:

```bash
EXISTING=$(gh api graphql -f query='
{
  repository(owner: "jortega0033", name: "diwa-design-system") {
    pullRequest(number: {PR_NUMBER}) {
      reviews(first: 10) {
        nodes { author { login } state }
      }
    }
  }
}' --jq '.data.repository.pullRequest.reviews.nodes[].author.login' 2>/dev/null)

if echo "$EXISTING" | grep -q "copilot"; then
  echo "Copilot review already exists — skipping request"
else
  gh pr edit {PR_NUMBER} --repo jortega0033/diwa-design-system --add-reviewer "copilot"
fi
```

Then update wave-state.json phase to `WAITING_REVIEW` by writing to stdout:
```
STATE_PHASE=WAITING_REVIEW
```

---

## PHASE 9 — SELF-REVIEW

Read the full PR diff:

```bash
gh pr diff {PR_NUMBER} --repo jortega0033/diwa-design-system
```

Review against these dimensions and write every finding numbered:

**Token compliance**
- Any hardcoded color, size, radius, or spacing that should be a `--diwa-*` token?
- Any new token introduced without an entry in `DESIGN.md`?

**Correctness**
- Does the implementation exactly match every AC in the issue?
- Any edge case in component state machine (focus, disabled, error, loading)?

**Accessibility**
- Are all interactive elements keyboard-reachable?
- Are ARIA roles, labels, and live regions correct?
- Does reduced-motion work correctly?

**Wrapper safety**
- Were any proxy files hand-edited instead of regenerated?
- Did the build regenerate wrappers correctly?

**Storefront**
- Does the storefront build remain statically exportable?
- Are all navigation entries, SEO tags, and component demos updated?

**Tests**
- Does every new behavior have a corresponding test?
- Any assertion that could pass for the wrong reason?

Write findings as:
```
SELF-REVIEW FINDINGS
1. [TOKENS] ...
2. [CORRECTNESS] ...
3. [A11Y] ...
4. [TESTS] ...
```

---

## PHASE 10 — REVIEW-FIX LOOP

Fetch all Copilot inline review comments via GraphQL (do not rely on `gh pr view --comments` — it misses inline threads):

```bash
gh api graphql -f query='
{
  repository(owner: "jortega0033", name: "diwa-design-system") {
    pullRequest(number: {PR_NUMBER}) {
      reviewThreads(first: 30) {
        nodes {
          isResolved
          comments(first: 5) {
            nodes {
              author { login }
              body
              path
              line
            }
          }
        }
      }
    }
  }
}'
```

Also fetch PR-level review summaries:
```bash
gh pr view {PR_NUMBER} --repo jortega0033/diwa-design-system --json reviews,comments
```

Merge all findings:
- Copilot inline comments (GraphQL above)
- Your self-review findings (Phase 9)
- Any risk flags from agents in Phase 0

For every finding:
1. Is it a **must-fix** (correctness / AC gap / accessibility / token violation) or **nice-to-have** (style/refactor)?
2. Fix all **must-fix** items.
3. Document **nice-to-have** items as follow-up PR comments — do not block merge.

After fixing:
```bash
git add -A
git commit -m "fix({SCOPE}): address review findings"
git push origin feat/wave-{N}/issue-{NUMBER}
```

Re-run Phase 6 (pre-PR verification) after every fix batch. All gates must remain green.

---

## PHASE 11 — FINAL REVIEW PASS + READY-TO-MERGE

Run a final self-review pass (same checklist as Phase 9) on the latest diff.

**Merge confidence checklist — all must be YES:**

- [ ] Every AC from every linked issue is implemented and evidenced
- [ ] All must-fix review findings addressed
- [ ] All pre-PR gates pass (build, type-check, control-heights, validate:tokens)
- [ ] All tests pass
- [ ] No hardcoded values, no console.log
- [ ] PR body complete with test evidence and guardrail compliance
- [ ] Wrappers regenerated via build (not hand-edited)
- [ ] Storefront static export intact

If all YES, post the ready-to-merge comment:

```bash
gh pr comment {PR_NUMBER} \
  --repo jortega0033/diwa-design-system \
  --body "✅ Implementation and review loop complete. All findings addressed. All quality gates green. Ready to merge. @jortega0033"
```

Then write to stdout so the wave runner advances to the next batch:
```
STATE_PHASE=COMPLETE_BATCH
```

⚠️ Do NOT run `gh pr merge` or `git merge`. Leave the merge to the repo owner.
