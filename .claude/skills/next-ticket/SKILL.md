---
name: next-ticket
description: Owner-started driver that takes one ticket of epic #169 (release-candidate packages that install and render in real consumer projects) from the queue to a ready pull request. Starting it is the owner's go signal.
argument-hint: "[issue number]"
disable-model-invocation: true
---

# Next ticket

The owner starts this with `/next-ticket` or `/next-ticket <issue number>`. That start is the go signal for this run, and it counts as the owner's request to push the ticket branch and open the pull request for this one ticket. Nothing else starts ticket work: there is no scheduler and no loop run does it ([LOOP.md](../../../LOOP.md)).

One ticket per run. This skill never merges, never releases and never starts another run by itself. Only the owner merges.

Repository: `jortega0033/diwa-design-system`. Epic: #169. Labels: `status:ready`, `status:blocked`, `status:in-progress`, `needs-decision`.

## Steps

1. **Refresh the queue.** Read epic #169 and its children with `gh issue list -R jortega0033/diwa-design-system --state open --limit 100` and `gh issue view`. For each `status:blocked` ticket whose prerequisites (the "Needs" column of the epic table and the "Prerequisites" line of the issue) are all closed, change its label to `status:ready`. Do not change the dependency lines. Then check the parents: a ticket labelled `tracking` or with sub-issues (`gh api repos/jortega0033/diwa-design-system/issues/<n>/sub_issues`) whose sub-issues are all closed is closed with a comment naming them. Epic #169 itself stays open until the owner closes it.
2. **Pick the ticket.** Only leaf tickets are work. A ticket labelled `tracking`, or with open sub-issues, is a container and is never picked.
   - With an issue number: use it, but stop and say why if it is closed, `status:blocked`, `status:in-progress` or `needs-decision`. If it is a `tracking` ticket or has open sub-issues, refuse it and list its open sub-issues.
   - Without one: take the first `status:ready` leaf ticket in the epic's order: the order of the parents in the table "Tickets in dependency order" in #169, then the order of the sub-issues inside each parent (`gh api repos/jortega0033/diwa-design-system/issues/<n>/sub_issues`). Skip tickets that are `status:in-progress` or `needs-decision`.
   - If none qualifies, say so, list what blocks each open ticket, and stop. Do not guess.
3. **Claim it.** Label the issue `status:in-progress` (remove `status:ready`).
4. **Branch and worktree.** Follow "Git workflow" in [CLAUDE.md](../../../CLAUDE.md): never work on `main`. Create a branch named `<type>/<issue number>-<short slug>` (`fix/`, `feat/`, `docs/`, `refactor/` or `test/`) in a fresh worktree under `.claude/worktrees/`, cut from the current `main`. Leave other checkouts, their uncommitted files and other people's pull requests and branches alone.
5. **Implement.** Run the [implement-ticket](../implement-ticket/SKILL.md) playbook for that issue from its step 1 to its last step: the roles, both gates, the evidence, the changelog line, the pull request template.
6. **Pull request.** The playbook has you push the branch and open the pull request as a draft. The review gate hook blocks `gh pr create` and `gh pr ready` until Code Reviewer and Reality Checker have run after the last code edit. The order is: local checks, both gates, draft pull request, CI. Before calling the gates, write the diff and the local evidence to the ticket worktree's `.claude/state/review/` (`git diff --stat origin/main...HEAD`, `git diff origin/main...HEAD`, each check's output), because both roles have no shell, and name those files in the request. Open the draft only after local checks passed and both gates passed on the current diff. If the ticket is the last open sub-issue of a parent, the pull request body says `Closes #<ticket>` and `Closes #<parent>`.
   - **Waiting for CI.** After `gh pr create --draft` and `git push`, bind the pull request to the session if the app offers it (the desktop app's pull request tools) and end the turn with the line "Draft pull request #N is waiting for CI". Do not loop, sleep or watch. When the session is woken (a CI event from the app, or the owner says "continue"), read `gh pr checks <n>` once: green, mark the pull request ready (`gh pr ready`) and comment on the issue with the CI run link; red, fix, re-run local checks and both gates, and push, then end the turn with the same line; still running, end the turn again with the same line. You check CI, not Reality Checker. Never open a pull request, draft or ready, with a gate not run.
7. **Report.** Comment on the issue with the pull request link, the evidence summary and anything left for the owner, including the "Owner checks" for acceptance steps that need a person. Change nothing else on the issue.
8. **Stop.** Report the pull request, the evidence and any open question. The owner reviews and merges.

## Stop and ask the owner when

- the ticket names an open owner decision with no stated default ([docs/owner-decisions.md](../../../docs/owner-decisions.md) lists the ones already settled);
- a decision recorded there blocks the work;
- a gate fails twice on the same finding, or CI stays red for a reason outside the ticket;
- the ticket needs a change to generated files by hand, a package publish, a deploy, or work that overlaps open pull request #165 or #166 (the epic says they do not overlap; leave them alone), or that edits files pull request #167 touches (handle it with the #105 default in the epic and `docs/owner-decisions.md`).

Say what is blocked and why, put `needs-decision` on the issue if that label fits, and end the run.
