# Loop Configuration — Issue Triage (Diwa Design System)

Scaffolded on 2026-11-21 with [Loop Engineering](https://github.com/cobusgreyling/loop-engineering)
(MIT, `@cobusgreyling/loop@0.2.0`):

```bash
npx --yes @cobusgreyling/loop@0.2.0 init . --pattern issue-triage --tool claude
```

## Active Loops

| Pattern | Cadence | Status | Command |
|---------|---------|--------|---------|
| Issue Triage | Manual, on request | **L1 report-only** | `/issue-triage` in Claude Code, from the repository root |

Maturity is fixed at **L1 (report-only)** until a maintainer changes this file:

- No scheduler. Do not use `/loop <interval>`, cron, a scheduled GitHub workflow or a
  scheduled agent for this pattern. The scaffold generated no workflow file, so there was
  nothing to disable.
- No automated source fixes. The loop never edits files under `diwa-components*/`,
  `scripts/` or `.github/`.
- No GitHub writes. The loop does not label, comment on, close or assign issues, and it
  never merges or enables auto-merge. It writes `issue-triage-state.md` and appends to
  `loop-run-log.md` only.

## Next manual triage run

From the repository root, in an interactive Claude Code session:

```text
/issue-triage
```

Expected result: `issue-triage-state.md` is refreshed (Top 5, proposed labels, possible
duplicates) and one JSON entry is appended to `loop-run-log.md`. Review the diff and commit
it through a normal pull request.

Health checks:

```bash
npx --yes @cobusgreyling/loop@0.2.0 doctor .
npx --yes @cobusgreyling/loop@0.2.0 status .
```

Doctor exit codes: `0` healthy, `1` warnings, `2` blocked.

### Recorded result

2026-11-21, `@cobusgreyling/loop@0.2.0`, after tailoring the scaffold:

| Command | Exit | Output summary |
|---|---|---|
| `doctor .` | 0 | `Status: HEALTHY`, `Ready: 100/100 L2`, `Files: state=issue-triage-state.md LOOP.md=yes budget=yes run-log=yes gate=no`, `Sync: n/a` with the note "Could not parse loop-sync JSON output" |
| `status .` | 0 | `Pattern: issue-triage`, `State: issue-triage-state.md · not yet run`, `constraints=yes`, no recent runs |

"L2" in that output is the tool's structural readiness score. It is not the operating
level: this repository runs the loop at L1 report-only, as stated above. Doctor's remaining
suggestions (a `docs/safety.md`, a `patterns/registry.yaml`, `allowed-tools` in skill
frontmatter) were not adopted; the safety rules live in `loop-constraints.md` and this file.
No loop run has been executed yet, so `loop-run-log.md` is empty.

## Human Gates

- Priority (`severity:P0`, `severity:P1`, `priority:*`) and wave assignment — human only
- Public component API, events, tokens and anything labelled `breaking-change` — always escalate
- Release, publish and CI workflow changes (`area:ci`) — always escalate
- Duplicate closure — human confirms
- Stale issue closure — human confirms

## Scope notes for this backlog

- Open issues fall into two generations: `wave:a`–`wave:m` (issues #13–#102) and the
  May 2026 audit set labelled `severity:*` / `area:*` (#105–#162). Several pairs overlap;
  the triage report should list them as possible duplicates, not resolve them.
- The current planned batch is tracked in the epic linked from
  [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#backlog-and-roadmap-sources).

## MCP

MCP is not required for this pattern. The skill reads issues through the GitHub CLI
(`gh issue list`, `gh issue view`), read-only.

## Worktree isolation

Run the loop from a dedicated Git worktree or branch, never from a checkout with
uncommitted work. The only files it may change are `issue-triage-state.md` and
`loop-run-log.md`. `.claude/worktrees/` is gitignored.

## Budget

- Sub-agent spawns per run: 0 at L1
- See [`loop-budget.md`](loop-budget.md) and [`loop-constraints.md`](loop-constraints.md)

## Files

| File | Purpose |
|---|---|
| `.claude/skills/issue-triage/SKILL.md` | The triage skill |
| `.claude/skills/loop-constraints/SKILL.md`, `loop-constraints.md` | Binding rules read at the start of every run |
| `.claude/skills/loop-budget/SKILL.md`, `loop-budget.md` | Budget guard and limits |
| `.claude/skills/loop-intake/SKILL.md` | Clarify a vague item before acting |
| `.claude/agents/loop-verifier.md` | Checker agent, unused at L1 |
| `issue-triage-state.md` | Latest triage report |
| `loop-run-log.md` | One entry per run |

The scaffold also generated `.grok/` and `.codex/` variants. They were removed: this
repository is set up for Claude Code only, and [`CONTRIBUTING.md`](CONTRIBUTING.md) treats
Codex skill folders as local-only.

## Links

- Pattern: <https://github.com/cobusgreyling/loop-engineering/blob/main/patterns/issue-triage.md>
- Quickstart: <https://github.com/cobusgreyling/loop-engineering/blob/main/docs/QUICKSTART.md>
