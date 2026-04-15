# Diwa Design System — Comprehensive Ticket Velocity Plan
## 32 Tickets Organized for AI Development Execution

**Scope:** 26 audit findings + 4 completed items + 2 new items (input refactor + link compact removal)  
**Total tickets:** DS-001 through DS-032  
**Timeline estimate:** ~24–28 days of AI velocity (parallel execution across sprints)  
**Exit criteria per sprint:** All tests pass, type-check clean, storefront builds, control-heights gate passes

### 🤖 BEFORE YOU START ANY TICKET
**READ THIS FIRST:** [TICKET_EXECUTION_HANDOFF.md](TICKET_EXECUTION_HANDOFF.md)

This document defines the complete **12-step autonomous execution workflow** for every ticket:
1. Refine & analyze ticket
2. Plan implementation (invoke agents)
3. Create feature branch
4. **Implement changes**
5. Commit & push
6. Create PR (with full checklist)
7. **Run review pass** (invoke Code Reviewer + domain agents)
8. Address findings
9. Tag @copilot for final review
10. Address Copilot findings (if any)
11. Resolve review comments
12. **Merge to main**

Each step includes concrete actions, quality gate checks, and checkpoints. **No ticket starts without reading the handoff framework.**

---

## Sprint Overview

| Sprint | Days | Focus | Tickets | Est. Effort |
|--------|------|-------|---------|-------------|
| **Sprint 1** | 1–3 | M1 critical parallel | DS-001, DS-002, DS-003 | 3×M, 1×S = ~5 days |
| **Sprint 2** | 4–5 | M1 final batch | DS-004, DS-005, DS-013 | 2×M, 1×XS = ~3 days |
| **Sprint 3** | 6–8 | M2 a11y start | DS-006, DS-007, DS-008 | 3×M = ~4 days |
| **Sprint 4** | 9–11 | M2 complex refactor | DS-009, DS-010 | 2×L = ~6 days |
| **Sprint 5** | 12–14 | M2 completion + cleanup | DS-011, DS-012, DS-032 | 1×XL + 1×M + 1×S = ~7 days |
| **Sprint 6** | 15–17 | M3 tokens/foundation | DS-014, DS-015, DS-016, DS-017, DS-020, DS-021 | 6×S/M = ~5 days |
| **Sprint 7** | 18–20 | M3 layout/structure | DS-023, DS-025 (pt1), DS-024 | 2×S + 1×L = ~4 days |
| **Sprint 8** | 21–23 | M3 docs/final | DS-018, DS-019, DS-022, DS-026 | 1×XS + 1×L + 1×M + 1×XS = ~6 days |
| **Sprint 9** | 24–28 | M3 long-running (parallel track) | DS-031 | 1×XL = ~10 days |

---

## Detailed Sprint Breakdown

### Sprint 1 — M1 Critical Parallel (Days 1–3)
**Execution:** Can run all 3 tickets in parallel; no inter-dependencies

#### DS-001 — fix(a11y): implement keyboard focus trap in diwa-flyout
- **Effort:** M (3 days)
- **Priority:** P0
- **Summary:** Add focus containment to flyout matching modal pattern
- **Parallelizable:** Yes (isolated to diwa-flyout)
- **Exit criteria:** Focus trap tests pass; Tab/Shift-Tab work; Escape returns focus; 487 tests green
- **Blocker for:** DS-016 (reduced-motion work can reference this pattern)

#### DS-002 — fix(select): close on Tab without trapping keyboard flow in open state
- **Effort:** M (3 days)
- **Priority:** P0
- **Summary:** Fix Tab behavior in select/multi-select; close and continue flow
- **Parallelizable:** Yes (isolated to select components; no blocker from radio group)
- **Exit criteria:** Tab closes dropdown; tests for both components pass; no regressions
- **Blocker for:** DS-009, DS-010 (APG focus model work)

#### DS-003 — fix(a11y): replace nondeterministic Math.random IDs with stable component IDs
- **Effort:** S (1-2 days)
- **Priority:** P0
- **Summary:** Use deterministic ID generation in radio group
- **Parallelizable:** Yes (isolated to radio-group)
- **Exit criteria:** No Math.random IDs remain; ARIA references stable across rerenders
- **Blocker for:** DS-006, DS-007, DS-008 (depend on stable IDs for label binding)

**Sprint 1 Exit:** All 3 tickets merged; all tests pass

---

### Sprint 2 — M1 Final Batch (Days 4–5)
**Execution:** Dependent on Sprint 1 completion; low parallelization

#### DS-004 — fix(radio-group): preserve per-item disabled semantics when parent disabled toggles
- **Effort:** M (2–3 days)
- **Priority:** P1
- **Summary:** Preserve child disabled state through parent toggle
- **Parallelizable:** Yes (builds on Sprint 1 radio-group work)
- **Exit criteria:** Disabled state preserved after parent toggle; tests cover mixed states
- **Blocker for:** None (improvement, no downstream dependencies)

#### DS-005 — feat(tokens): add token-contract validator and enforce in CI
- **Effort:** M (2–3 days)
- **Priority:** P1
- **Summary:** Create CI script to validate `var(--diwa-*)` references
- **Parallelizable:** Yes (orthogonal to component changes)
- **Exit criteria:** Script catches missing tokens; CI integration verified; no false positives
- **Blocker for:** DS-020, DS-021 (token remediation work)

#### DS-013 — docs(tabs): remove false keyboard guarantees until APG navigation ships
- **Effort:** XS (0.5 day)
- **Priority:** P1
- **Summary:** Correct docs to match current (non-APG) implementation
- **Parallelizable:** Yes (docs-only, isolated)
- **Exit criteria:** Tabs accessibility page updated; no stale claims
- **Blocker for:** DS-006 (can then ship proper docs when APG lands)

**Sprint 2 Exit:** All M1 tickets complete; 487 tests pass; type-check clean

---

### Sprint 3 — M2 A11Y Start (Days 6–8)
**Execution:** Depends on Sprint 1–2 completion; moderate parallelization

#### DS-006 — feat(a11y): implement full ARIA APG keyboard nav for diwa-tabs
- **Effort:** M (3 days)
- **Priority:** P1
- **Summary:** Add Arrow/Home/End keyboard support to tabs
- **Parallelizable:** No (must follow DS-003, DS-013)
- **Dependencies:** Blocked by DS-003, DS-013
- **Exit criteria:** Arrow Left/Right/Home/End work; roving focus correct; tests pass
- **Blocker for:** DS-018 (docs update)

#### DS-007 — fix(a11y): bind slotted label to combobox in diwa-select
- **Effort:** M (2–3 days)
- **Priority:** P1
- **Summary:** Fix slotted label association in select
- **Parallelizable:** Yes (independent from tabs)
- **Dependencies:** Blocked by DS-003 (needs stable IDs)
- **Exit criteria:** Slotted label ID generation works; aria-labelledby references correct; tests pass
- **Blocker for:** DS-009 (focus model work can reference this)

#### DS-008 — fix(a11y): bind slotted label to combobox in diwa-multi-select
- **Effort:** M (2–3 days)
- **Priority:** P1
- **Summary:** Fix slotted label association in multi-select (parity with DS-007)
- **Parallelizable:** Yes (can run in parallel with DS-007)
- **Dependencies:** Blocked by DS-003
- **Exit criteria:** Identical behavior to select for label handling; tests cover prop/slot/mixed
- **Blocker for:** DS-010

**Sprint 3 Exit:** Tabs keyboard and select/multi-select label fixes merged

---

### Sprint 4 — M2 Complex Refactors (Days 9–11)
**Execution:** Depends on Sprint 3; large effort, moderate parallelization

#### DS-009 — fix(a11y): align diwa-select listbox focus model with APG (active descendant)
- **Effort:** L (3–4 days)
- **Priority:** P1
- **Summary:** Implement APG-compliant active-descendant focus management in select
- **Parallelizable:** No (depends on DS-007)
- **Dependencies:** Blocked by DS-002, DS-007
- **Exit criteria:** aria-activedescendant points to highlighted option; Arrow/Home/End navigate; Enter/Space select; tests pass
- **Blocker for:** DS-011 (shared core extraction will reference this pattern)

#### DS-010 — fix(a11y): align diwa-multi-select listbox focus model with APG (active descendant)
- **Effort:** L (3–4 days)
- **Priority:** P1
- **Summary:** Implement APG-compliant active-descendant focus management in multi-select (parity with DS-009)
- **Parallelizable:** Yes (can run in parallel with DS-009 after common understanding established)
- **Dependencies:** Blocked by DS-002, DS-008
- **Exit criteria:** Identical focus model to select; toggle selection doesn't break focus; tests pass
- **Blocker for:** DS-011

**Sprint 4 Exit:** Both select/multi-select APG focus models complete and tested

---

### Sprint 5 — M2 Completion + Cleanup (Days 12–14)
**Execution:** Depends on Sprint 4; large effort

#### DS-011 — refactor(select): extract shared select core to prevent parity drift
- **Effort:** XL (4–5 days)
- **Priority:** P2
- **Summary:** Consolidate ~497 duplicate lines into shared base class/mixin
- **Parallelizable:** No (depends on DS-009, DS-010 stabilization)
- **Dependencies:** Blocked by DS-009, DS-010, DS-012
- **Exit criteria:** Shared module extracted; both components import and extend; all tests still pass; LOC reduced materially
- **Blocker for:** Wrapper generation updates (future)

#### DS-012 — fix(multi-select): port MutationObserver gating pattern from diwa-select
- **Effort:** M (2–3 days)
- **Priority:** P2
- **Summary:** Add option-aware mutation filtering to multi-select (parity with select PR #4)
- **Parallelizable:** Yes (can run in parallel with DS-011)
- **Dependencies:** Blocked by none; should land before DS-011 for shared extraction
- **Exit criteria:** Mutation filtering works; non-option DOM churn ignored; first-paint label stable
- **Blocker for:** DS-011 (should land first)

#### DS-032 — feat(link): remove compact prop and fully align size semantics with diwa-button
- **Effort:** S (1–2 days)
- **Priority:** P2
- **Summary:** Deprecate `compact` prop; use `size` exclusively (xs/sm/md/lg)
- **Parallelizable:** Yes (orthogonal to select refactors)
- **Dependencies:** Blocked by none (but assumes DS-028 xs implementation is stable)
- **Exit criteria:** `compact` removed; `size` default to 'md'; migration guide in CHANGELOG; tests updated; no TS errors
- **Breaking change:** Document in CHANGELOG

**Sprint 5 Exit:** Select/multi-select refactored and feature-parity locked; Link API normalized

---

### Sprint 6 — M3 Tokens & Foundation (Days 15–17)
**Execution:** Depends on Sprint 2; can mostly parallelize

#### DS-014 — fix(tokens): remediate warning notification contrast to WCAG AA
- **Effort:** S (1–2 days)
- **Priority:** P2
- **Summary:** Fix warning token pair to reach 4.5:1 contrast
- **Parallelizable:** Yes
- **Exit criteria:** Contrast ratio ≥ 4.5:1; components retain visual intent; tests pass

#### DS-015 — feat(storefront): add skip-to-content link in root layout
- **Effort:** S (1–2 days)
- **Priority:** P2
- **Summary:** Add keyboard-visible skip navigation link
- **Parallelizable:** Yes
- **Exit criteria:** Skip link appears first on focus; navigates to main content; visually hidden until focused

#### DS-016 — fix(scroller): honor prefers-reduced-motion in scroll behavior
- **Effort:** S (1–2 days)
- **Priority:** P2
- **Summary:** Disable smooth scroll when prefers-reduced-motion is active
- **Parallelizable:** Yes
- **Exit criteria:** Instant scroll when reduced-motion; tests cover both modes; docs note behavior

#### DS-017 — fix(a11y): set toast live region to atomic full-message announcements
- **Effort:** S (1 day)
- **Priority:** P2
- **Summary:** Set `aria-atomic="true"` on toast live region
- **Parallelizable:** Yes
- **Exit criteria:** Toast announces full message; screen reader tests pass; severity mode explicit

#### DS-020 — fix(tokens): define missing font-weight token alias and remove invalid references
- **Effort:** XS (0.5 day)
- **Priority:** P2
- **Summary:** Define `--diwa-font-weight-regular` token; remove invalid refs
- **Parallelizable:** Yes (depends on DS-005 validator being in place)
- **Dependencies:** Blocked by DS-005
- **Exit criteria:** All `var(--diwa-font-weight-regular)` references valid; validator passes

#### DS-021 — fix(tokens): formalize spacing token gaps and remove ad-hoc spacing fallbacks
- **Effort:** S (2 days)
- **Priority:** P2
- **Summary:** Define/migrate `--diwa-space-0-25` and `--diwa-space-1-5`; remove raw px fallbacks
- **Parallelizable:** Yes (depends on DS-005 validator)
- **Dependencies:** Blocked by DS-005
- **Exit criteria:** All spacing token references defined; no raw px fallbacks; validator passes

**Sprint 6 Exit:** All token gaps closed, a11y improvements in place

---

### Sprint 7 — M3 Layout & Structure (Days 18–20)
**Execution:** Depends on Sprint 1; mostly sequential

#### DS-023 — fix(storefront): align Tailwind screen config with token breakpoint scale
- **Effort:** S (1–2 days)
- **Priority:** P2
- **Summary:** Align Tailwind breakpoints with CSS token breakpoints
- **Parallelizable:** No (foundation for DS-024)
- **Exit criteria:** Tailwind screens map to token values; demo pages render correctly; no breakpoint mismatches

#### DS-024 — refactor(storefront): replace raw utility grid patterns with token-grid abstractions
- **Effort:** M (2–3 days)
- **Priority:** P3
- **Summary:** Migrate storefront layout to use token-aligned grid primitives
- **Parallelizable:** No (depends on DS-023)
- **Dependencies:** Blocked by DS-023
- **Exit criteria:** Targeted pages use token grid; no visual regressions; grid docs reference token approach

#### DS-025 — feat(docs): standardize interactive API/prop table coverage across component pages
- **Effort:** L (3–4 days)
- **Priority:** P3
- **Summary:** Create shared prop-table template; backfill missing pages
- **Parallelizable:** Yes (can run in parallel with DS-023/024)
- **Exit criteria:** Shared template component exists; priority pages use it; API section lint check passes

**Sprint 7 Exit:** Layout and docs structure aligned

---

### Sprint 8 — M3 Documentation & Final Polish (Days 21–23)
**Execution:** Depends on Sprints 1 & 6; mostly parallel

#### DS-018 — feat(storefront): finalize tabs accessibility docs after APG keyboard ship
- **Effort:** XS (0.5 day)
- **Priority:** P3
- **Summary:** Update tabs docs after DS-006 implementation lands
- **Parallelizable:** Yes
- **Dependencies:** Blocked by DS-006
- **Exit criteria:** Docs list shipped keyboard behavior; tested key map present; no stale caveats

#### DS-019 — refactor(inputs): harmonize id/inputId/name API across input components
- **Effort:** L (3–4 days)
- **Priority:** P2
- **Summary:** Standardize identifier prop naming across all input variants
- **Parallelizable:** No (architectural change; should follow DS-031 refactor if it lands first, or be done in parallel pre-planning)
- **Exit criteria:** Unified API naming; backward-compatible aliases; docs updated; no TS errors

#### DS-022 — feat(tokens): define elevation scale contract and apply consistently
- **Effort:** M (2–3 days)
- **Priority:** P3
- **Summary:** Document depth model; align elevation token usage
- **Parallelizable:** Yes
- **Exit criteria:** Elevation token scale documented; components use sanctioned tiers; storefront guide included

#### DS-026 — chore(release): backfill changelog entries for select PR #4 and related fixes
- **Effort:** XS (0.5 day)
- **Priority:** P3
- **Summary:** Add select first-paint and MutationObserver gating fixes to CHANGELOG
- **Parallelizable:** Yes
- **Exit criteria:** CHANGELOG includes fixes; references versions and user-visible impact

**Sprint 8 Exit:** Docs complete; final polish done; release notes up to date

---

### Sprint 9 — M3 Long-Running Refactor (Days 24–28) — Parallel Track
**Execution:** Can run in parallel with Sprints 6–8; no inter-dependencies with them

#### DS-031 — refactor(inputs): extract common input base class and eliminate 900+ lines of duplication
- **Effort:** XL (5–7 days)
- **Priority:** P1 (high — major code quality improvement)
- **Summary:** Consolidate 12 input variants into shared base class/mixin
- **Parallelizable:** No, but can run on separate track from Sprints 6–8
- **Dependencies:** Blocked by none
- **Exit criteria:** Shared base extracted; per-variant LOC reduced 150→30–50; all tests pass; no regressions; types exported correctly
- **Blocker for:** Wrapper generation updates (future); DS-019 (input API alignment) should reference this

**Sprint 9 Exit:** Input components refactored; ready for wrapper ports

---

## Already Completed (Do Not Reopen)
- **DS-027:** diwa-link size prop rollout with compact backward compat
- **DS-028:** add xs size to diwa-button-pure and diwa-link-pure (committed bd1e529)
- **DS-029:** diwa-select first-paint selected-label initialization (PR #4)
- **DS-030:** diwa-select MutationObserver option-mutation gating (PR #4)

---

## Parallelization Map

### Sprint 1 (3 parallel tracks, all independent)
```
DS-001 (Flyout focus trap)  ────────→
DS-002 (Select Tab close)   ────────→
DS-003 (Radio stable IDs)   ────→
                           Exit Sprint 1
```

### Sprint 2 (3 independent tasks, run sequentially or light parallel)
```
DS-004 (Radio disabled)     ──→
DS-005 (Token validator)    ──→
DS-013 (Tabs docs)          ─→
                           Exit Sprint 2
```

### Sprint 3 (Mix: DS-006 sequential, DS-007/008 parallel)
```
DS-006 (Tabs APG nav)       ─────→ (must follow DS-003, DS-013)
DS-007 (Select labels)      ───→
DS-008 (Multi-select labels) ───→ (parallel with DS-007)
                            Exit Sprint 3
```

### Sprint 4 (DS-009/010 can partially parallel after understanding established)
```
DS-009 (Select APG focus)   ─────→ (must follow DS-007)
DS-010 (Multi-select APG)   ─────→ (parallel after DS-009 pattern clear)
                            Exit Sprint 4
```

### Sprint 5 (DS-012 before DS-011; DS-032 independent)
```
DS-012 (Multi-select observer) ──→ (must precede DS-011)
DS-011 (Shared select core)    ────→ (must follow DS-012, DS-009, DS-010)
DS-032 (Link compact removal)  ──→ (independent)
                              Exit Sprint 5
```

### Sprint 6 (All 6 tasks fully parallel)
```
DS-014 (Warning contrast)   ──→
DS-015 (Skip link)          ──→
DS-016 (Reduced motion)     ──→
DS-017 (Toast atomic)       ──→
DS-020 (Font weight)        ┐
DS-021 (Spacing tokens)     ┴→ (after DS-005 validator)
                           Exit Sprint 6
```

### Sprint 7 (DS-023→024 sequential; DS-025 parallel)
```
DS-023 (Tailwind config)    ──→ (must precede DS-024)
DS-024 (Grid refactor)      ────→ (follows DS-023)
DS-025 (API tables)         ──→ (parallel)
                           Exit Sprint 7
```

### Sprint 8 (Mostly parallel; DS-018 follows DS-006)
```
DS-018 (Tabs docs)          ─→ (must follow DS-006)
DS-019 (Input API naming)   ────→
DS-022 (Elevation scale)    ──→
DS-026 (CHANGELOG)          ─→
                           Exit Sprint 8
```

### Sprint 9 (Isolated parallel track)
```
DS-031 (Input refactor)     ────────→ (can run alongside Sprints 6–8)
                           Exit Sprint 9 (May extend beyond Sprint 8 completion)
```

---

## CI Exit Criteria (per Sprint)
After each sprint merge, verify:
```bash
npm run build
npm run test              # All tests green
npm run test:ux
npm run type-check        # TypeScript clean
npm run build:storefront  # Static export works
npm run agency:validate:control-heights  # Control height gate passes
```

---

## Dependency Graph Summary

**Critical Path (no parallelization possible):**
```
Sprint 1 → Sprint 2 → Sprint 3 [DS-003, DS-013 required for DS-006] 
         → Sprint 4 [DS-007/008 block DS-009/010]
         → Sprint 5 [DS-009/010 block DS-011]
```

**Parallel Opportunities:**
- **Sprint 6** runs independently of Sprint 5 timeline
- **Sprint 7–8** loosely dependent on Sprints 1–2 (mostly for token/layout work)
- **Sprint 9** (DS-031) completely independent; can overlap with Sprints 6–8

**Total sequential days:** ~18 days (critical path)  
**Total calendar time (with parallelization):** ~24–28 days  
**AI execution advantage:** All sprints can be attempted in parallel teams; critical path is single-threaded

---

## Effort Summary

| Tier | Count | Stories | Est. Days |
|------|-------|---------|-----------|
| XS (0.5–1 day) | 3 | DS-013, DS-020, DS-026 | ~2 |
| S (1–2 days) | 11 | DS-003, DS-004, DS-014–017, DS-021, DS-032 | ~15 |
| M (2–4 days) | 10 | DS-001, DS-002, DS-005–007, DS-012, DS-022, DS-023, DS-025 | ~32 |
| L (3–4 days) | 6 | DS-008–010, DS-019, DS-024, DS-025 | ~22 |
| XL (5+ days) | 2 | DS-011, DS-031 | ~15 |
| **Total** | **32** | | **~86 story-days** |

**Realistic throughput at full parallelization:** ~24–28 days  
**Rationale:** Many tickets can be parallelized (20–25 per sprint window); Sprints 1–5 are critical path; Sprints 6–9 overlap.

---

## Success Measures

- ✅ All 32 tickets closed
- ✅ 487+ tests passing (no regressions)
- ✅ Type-check passes across all packages
- ✅ Storefront builds and deploys cleanly
- ✅ Token validator enforced in CI
- ✅ A11y audit findings resolved (tabs APG, flyout focus trap, ID stability, select labels)
- ✅ Component parity complete (select/multi-select, button/link sizes, input API)
- ✅ Documentation updated (tabs, accessibility, API tables, CHANGELOG)
- ✅ 900+ lines of input duplication eliminated
- ✅ Token system formally documented and enforced
