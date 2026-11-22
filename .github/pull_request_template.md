## Ticket

Closes #

Epic: #169

## What changed

## Evidence

Each command you ran and its real result. Name the commit the evidence belongs to and any step you skipped, with the reason. `CLAUDE.md`, "Evidence before calling a ticket done", lists what is required.

| Command | Result |
| ------- | ------ |
|         |        |

## Agent roles run

| Role | Asked to | Verdict |
| ---- | -------- | ------- |
|      |          |         |

Code Reviewer (review gate) and Reality Checker (acceptance gate) must both appear, on the current diff.

## Risks and rollback

## Checklist

- [ ] One issue, small diff, conventional commit messages
- [ ] The checks in `CLAUDE.md` that cover the changed files passed, or the skipped ones are named above
- [ ] `git status --short` after `npm run build` shows only what `CLAUDE.md` expects
- [ ] UI changes checked in dark and `data-theme="light"`, by keyboard, and against `docs/ui-quality.md`
- [ ] Copy and text in this description went through `unslop`
- [ ] `CHANGELOG.md` has a line under Unreleased
- [ ] Both CI jobs are green on the current commit
- [ ] I did not merge; only the owner merges
