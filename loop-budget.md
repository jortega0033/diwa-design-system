# Loop Budget — Diwa Design System

> Primary loop: **Issue Triage** (scaffolded by loop-init), L1 report-only, manual runs only.

## Daily limits

| Loop | Max runs/day | Max tokens/day | Max sub-agent spawns/run |
|------|--------------|----------------|--------------------------|
| Issue Triage | 2 (manual) | 80k | 0 (L1) |

## On budget exceed

1. Stop. There is no scheduler to pause; do not start another run that day.
2. Append the event to `loop-run-log.md`.
3. Tell the maintainer in the session, or open an issue.

## Kill switch

- Flag: a line `loop-pause-all` under **Alerts This Period** below, or an open issue
  titled `loop-pause-all`.
- Resume only after a maintainer removes the flag.

## Alerts This Period

- (none)

## Estimate spend

```bash
npx --yes @cobusgreyling/loop-cost --pattern issue-triage --level L1
```
