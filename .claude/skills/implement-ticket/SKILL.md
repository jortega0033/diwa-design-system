---
name: implement-ticket
description: Playbook for implementing a GitHub issue in this repository from start to pull request, with the project subagents run at fixed steps. Use whenever asked to implement, start, continue or finish a ticket, an issue or an epic child, for example "implement #12" or "work on the next ticket".
argument-hint: "[issue number]"
---

# Implement a ticket

Use this playbook for every implementation ticket in this repository. `CLAUDE.md` holds the commands, the architecture boundaries, the Git workflow and the evidence rules; where this playbook and `CLAUDE.md` differ, `CLAUDE.md` wins.

The project subagents in `.claude/agents/` are part of the work. Delegate to them at the steps below without waiting to be asked. If a step names a role that is not installed, do that step yourself and say so in the pull request.

## Steps

1. **Read the ticket.** `gh issue view <number>` and the epic it belongs to. Work only on a leaf ticket: if the ticket is labelled `tracking` or has open sub-issues, stop, list its open sub-issues and ask the owner which one to take (or start `/next-ticket`). Check that every prerequisite issue is closed and that no owner decision named in the ticket is still open. If the ticket is blocked, stop and say what blocks it.
2. **Read the rules.** `CLAUDE.md`, then the architecture notes it links to. A ticket never changes agent configuration (`.claude/agents`, `skills`, `hooks`, `settings.json`, `agency-agents`), by tool or by shell command.
3. **Orient and check the approach.** Delegate as the table "Before coding" says. Settle open design questions before writing code. For a ticket that changes a screen or component visuals, start with the `ui-ux-pro-max` skill (`python .claude/skills/ui-ux-pro-max/scripts/search.py "design system component library" --design-system`) and read [docs/ui-quality.md](../../../docs/ui-quality.md).
4. **Branch** as the Git workflow in `CLAUDE.md` says. Never work on the default branch.
5. **Implement** inside the ticket's stated scope. Delegate the work to the implementing role that matches the files being changed (table "While coding"). Do not widen scope; note anything else you find as a follow-up.
6. **Test.** Add or change tests for every acceptance criterion and material edge case, then run the checks listed in `CLAUDE.md`. Record each command and its result.
7. **Specialist review.** Run every role in the table "After coding" whose trigger matches the change. For a UI ticket, check every changed screen and component against the ten rules in [docs/ui-quality.md](../../../docs/ui-quality.md), in dark and `data-theme="light"`, and fix or justify each breach.
8. **Final diff.** Add a line under Unreleased in `CHANGELOG.md`. Run the `unslop` skill on the user-facing copy and the documentation you wrote, and finish any UI-quality fixes. Both gates then judge the final diff.
9. **Review gate, always.** Run Code Reviewer on the full diff. Fix every material finding, re-run the checks, and have the reviewer look again until no material finding is left.
10. **Acceptance gate, always.** Run Reality Checker with the ticket's acceptance criteria and the recorded local evidence. It checks that the documented checks ran locally and passed and that CI is configured to run them; it does not confirm a CI result, which does not exist yet. Do not open the pull request unless it passes. A criterion that needs a person ("by hand in a normal browser", "manual, recorded") is done as far as an agent can (a scripted or headless run, with the evidence) and the rest is listed under "Owner checks" in the pull request; Reality Checker accepts that only when the ticket marks the step as manual.
11. **Hand off.** Fill in the pull request template `.github/pull_request_template.md` (ticket, evidence, "Agent roles run", risks and rollback) and run `unslop` on the description. Capture the evidence `CLAUDE.md` asks for. The review gate hook blocks `gh pr create` and `gh pr ready` until both gate roles ran after the last code edit. Pushing the branch and opening the pull request, as a draft, is part of this step when the owner asked for it in the current session; a `/next-ticket` run counts as that request. Order: local checks, both gates, draft pull request, CI. Open the draft only when local checks passed and both gates passed on the current diff. If CI fails, fix, re-run local checks and both gates, and push. Both read-only reviewers have no shell, so before calling them write the diff and the check outputs to `.claude/state/review/` in the worktree (`git diff --stat origin/main...HEAD`, `git diff origin/main...HEAD`) and name those files in the request. After `gh pr create --draft` and `git push`, end the turn with the line "Draft pull request #N is waiting for CI" and do not poll; when woken, read `gh pr checks <n>` once. The last open sub-issue of a parent says `Closes` for the ticket and for the parent. Mark the pull request ready (`gh pr ready`) only when both CI jobs are green on the current commit, and comment on the issue with the CI run link; the driver checks CI, not Reality Checker. Never open a pull request, draft or ready, with a gate not run. **Only the owner merges.** Do not merge, release or enable auto-merge.

## Roles

### Before coding

| Role | Access | Delegate to it |
|---|---|---|
| Codebase Onboarding Engineer | read-only reviewer | At the start of a ticket in an unfamiliar area, to trace the relevant code paths before anything is changed |
| Software Architect | read-only reviewer | Before implementing a ticket that changes a package entry point (`main`/`module`/`types`/`exports`), a Stencil output target, the build pipeline, a peer range, the public API or a dependency, to check the approach against `docs/ARCHITECTURE.md`. This row, not the generic sentence in the role's `description`, is the trigger in this repository |

### While coding

| Role | Access | Delegate to it |
|---|---|---|
| UI Designer | can edit | When a ticket changes component visuals, design tokens or themes |
| UX Architect | can edit | When a ticket changes a component API, layout structure or an interaction pattern |
| Frontend Developer | can edit | When a ticket changes browser-side code such as pages, components, client state, styling or keyboard interaction |
| Technical Writer | can edit | When a ticket changes public documentation, guides, the README or the changelog |

### After coding

| Role | Access | Delegate to it |
|---|---|---|
| Accessibility Auditor | can edit | After a ticket changes user-facing UI, keyboard handling, focus order or markup |

### Gates that run on every ticket

| Role | Access | Delegate to it |
|---|---|---|
| Code Reviewer | read-only reviewer | After implementing or changing code for a ticket, before the draft pull request is opened (review gate) |
| Reality Checker | read-only reviewer | After Code Reviewer and before the draft pull request, on every ticket: each acceptance criterion against the local evidence that was produced, and that CI is configured to run the checks; not a CI result (acceptance gate) |

## Rules

- The session or role that wrote a change does not count as its reviewer.
- Read-only reviewers cannot run commands. Give them the diff, the acceptance criteria and the recorded command output.
- Where a role's general advice (frameworks, dependencies, cloud services) conflicts with `CLAUDE.md`, `CLAUDE.md` wins.
- In the pull request description, add a section "Agent roles run" listing each role that ran, what it was asked and its verdict, and any step you did yourself because a role was missing.
