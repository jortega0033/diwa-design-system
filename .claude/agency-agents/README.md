# Agency Agents in this repository

The role definitions in `.claude/agents/` (except `loop-verifier.md`, which comes from
Loop Engineering, see [`LOOP.md`](../../LOOP.md)) are copied from
[msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents), MIT licensed.
The upstream license text is in [`LICENSE`](LICENSE) next to this file.

This README lives outside `.claude/agents/` on purpose: Claude Code parses every Markdown
file in that folder as an agent definition.

## Pin

- Upstream revision: `8ae6164602c95ca78828b148b9052460ee426885` (`main`, committed 2026-11-09)
- Copied: 2026-11-21
- Copyright (c) 2025 AgentLand Contributors, MIT License

## Installed roles

| File in `.claude/agents/` | `name:` | Upstream path | Upstream blob SHA | Local change |
|---|---|---|---|---|
| `engineering-software-architect.md` | Software Architect | `engineering/engineering-software-architect.md` | `1a69148c99b2c170e36e035a0c7a341e98e634e9` | added `tools: Read, Grep, Glob` |
| `engineering-code-reviewer.md` | Code Reviewer | `engineering/engineering-code-reviewer.md` | `fb93291f4b94a8d5687aa1cc0d05741c3352dd22` | added `tools: Read, Grep, Glob` |
| `engineering-codebase-onboarding-engineer.md` | Codebase Onboarding Engineer | `engineering/engineering-codebase-onboarding-engineer.md` | `cc36ec153ebe38ebf51515d8591a44e1213e5aa1` | added `tools: Read, Grep, Glob` |
| `engineering-frontend-developer.md` | Frontend Developer | `engineering/engineering-frontend-developer.md` | `7fc1a355bf6cc53b5f2b8b58db52ae2860fc0616` | none |
| `engineering-technical-writer.md` | Technical Writer | `engineering/engineering-technical-writer.md` | `e17f72e5c9b958e9550c976c082e05cf42fa01ff` | none |
| `testing-accessibility-auditor.md` | Accessibility Auditor | `testing/testing-accessibility-auditor.md` | `350dc3d468b96015a6b3cdefbb06f4a33f673cb1` | none |
| `design-ux-architect.md` | UX Architect | `design/design-ux-architect.md` | `27a951fd63ef3981f54a3e35c64666e86ea901db` | none |
| `design-ui-designer.md` | UI Designer | `design/design-ui-designer.md` | `6744e81bf2d64a4b22881eace74d8438045dca6e` | none |

The only edit to any upstream file is one added frontmatter line, `tools: Read, Grep, Glob`,
on the three review roles. Unmodified files hash to the upstream blob SHA
(`git hash-object <file>`).

## Why these roles

They are the roles [`TICKET_EXECUTION_HANDOFF.md`](../../TICKET_EXECUTION_HANDOFF.md) already
names for ticket work (Code Reviewer, Accessibility Auditor, UX Architect, Frontend
Developer, Technical Writer, UI Designer), plus two read-only roles for planning and
onboarding (Software Architect, Codebase Onboarding Engineer).

| Use | Role | Tools |
|---|---|---|
| Review a plan, epic or diff | Code Reviewer, Software Architect | read-only |
| Explain or trace the codebase | Codebase Onboarding Engineer | read-only |
| Component, wrapper and storefront implementation | Frontend Developer | all |
| WCAG, keyboard and ARIA audits | Accessibility Auditor | all |
| Token and layout foundations | UX Architect, UI Designer | all |
| Docs and migration notes | Technical Writer | all |

## Relation to the existing Diwa DS agents

`.github/agents/*.agent.md` holds the nine repository-specific Diwa DS agents listed in
[`AGENTS.md`](../../AGENTS.md). Those files use the GitHub Copilot agent format and are not
loaded by Claude Code. They stay the source for repository-specific role rules. The Agency
roles here are general-purpose and must follow `AGENTS.md` like any other contributor.
No Diwa DS agent was ported or duplicated.

## Name collisions

A machine that also has Agency Agents installed at user level (`~/.claude/agents/`) defines
agents with the same `name:` values. Claude Code gives the project-level definition
precedence in a session started from a checkout that contains these files. A session that
was already running when the files appeared, or one started from a checkout or worktree
without `.claude/agents/`, keeps the user-level definitions (seen on 2026-11-21: a
`Software Architect` launched from such a session still had every tool). In a freshly
started session:

- `Software Architect`, `Code Reviewer` and `Codebase Onboarding Engineer` resolve to the
  read-only project copies.
- The other five resolve to the pinned project copies, which may differ from a newer or
  older user-level copy.

The names were kept identical to upstream so that existing references in
`TICKET_EXECUTION_HANDOFF.md` resolve to the pinned copy for every contributor.

## Verify loading

Run from the repository root. The reviewer must report only `Read, Grep, Glob`; that shows
the project copy is the one in use.

```bash
claude -p "Launch the agent type 'Code Reviewer' with the prompt: 'List the exact names of every tool you can call, comma separated, nothing else.' Print its reply verbatim." --model haiku
```

Observed on 2026-11-21 with Claude Code 2.1.323: all eight roles and `loop-verifier` were
listed as available agent types, the three review roles with `Read, Grep, Glob`, and the
launched `Code Reviewer` replied `Read, Grep, Glob`.

## Updating

1. Pick a new upstream revision and read the diff for each file listed above.
2. Fetch each file at that revision, for example:
   `gh api "repos/msitarzewski/agency-agents/contents/engineering/engineering-code-reviewer.md?ref=<sha>" --jq .content | base64 -d`
3. Re-apply the `tools:` line on the three review roles.
4. Update the pin, the blob SHAs and the copy date in this file, then re-run the loading check.

## Local change: automatic delegation (2026-11-22)

One sentence beginning "Use proactively" was appended to the `description:` line of every Agency Agents role in `.claude/agents/` (not to `loop-verifier`). Claude Code uses that field to decide when to delegate, so the roles now run during ticket work without being named. Nothing else in the role files changed.

This supersedes any statement above that a role file is unmodified or that the `tools:` line is the only local change. To compare a role with the pinned upstream file, remove that sentence (and the `tools:` line where one was added) first.

The steps at which each role runs are in `.claude/skills/implement-ticket/SKILL.md`.
