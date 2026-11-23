---
name: issue-triage
description: >
  Scan open issues and discussions. Dedupe, prioritize, and propose labels.
  Updates issue-triage-state.md. L1 propose-only — never auto-label or close.
user_invocable: true
---

# Issue Triage Skill

You are an issue queue health agent. Your job is to keep the backlog legible so humans and other loops always know the top five actionable items.

## Inputs

- Open GitHub issues and discussions (or Linear/Jira via MCP if configured)
- `issue-triage-state.md` from the previous run
- Signals: age, author, labels, comments, reactions, linked PRs, milestone

## Output — update `issue-triage-state.md`

```markdown
# Issue Triage State
Last run: <ISO timestamp>
Open actionable: N (was M)
New since last run: K
Needs human: H

## Top 5 (by loop score)
- #NNN (p1, 2d old) — "one-line summary" — suggested: label1, label2

## Proposed Labels (not applied in L1)
- #NNN: `label-a`, `label-b`

## Possible Duplicates (human confirm)
- #NNN — possible duplicate of #MMM

## Noise / Ignored
- brief list
```

## Scoring (P0–P3)

| Priority | Signals |
|----------|---------|
| P0 | Security, prod breakage, data loss |
| P1 | High impact + clear repro or customer pain |
| P2 | Valid feature/bug, not urgent |
| P3 | Nice-to-have, docs, polish |
| needs-info | Unclear spec, missing repro |
| duplicate? | Title/body overlap with existing issue |

## Rules

- **L1 (week one):** Propose labels and priority only. Never apply labels, comment, or close.
- Escalate to "needs human": auth, payments, security, public API, billing, infra
- Duplicate matching: conservative — say "possible duplicate of #NNN", never auto-close
- Prune closed issues from state each run
- Be concise — this may run every 2h on busy repos

## Allowlisted labels (L2 only, after verifier)

`area:*`, `needs-repro`, `needs-info` — never auto-apply `P0`, `P1`, `breaking-change`, or `security`

## Pairing with Daily Triage

Daily Triage reads this file and merges Top 5 into `STATE.md` High Priority. Do not duplicate full issue bodies in STATE.md — reference issue numbers only.

## Repository rules (Diwa Design System)

- Fixed at L1 report-only, manual runs. See `LOOP.md` and `loop-constraints.md`; they win over anything above.
- Read issues with the GitHub CLI only: `gh issue list --state open --limit 300 --json number,title,labels,updatedAt,comments` and `gh issue view <n>`. No GitHub writes.
- Use the repository's labels when proposing: `area:*`, `severity:P0`–`P3`, `wave:a`–`wave:m`, `needs-discussion`, `blocked`. `needs-repro` and `needs-info` do not exist here.
- There is no `STATE.md` or Daily Triage loop in this repository. Write only `issue-triage-state.md` and append to `loop-run-log.md`.
- The backlog has two overlapping generations (`wave:*` issues #13–#102 and audit issues #105–#162). List overlaps under "Possible Duplicates"; never close or merge them.
