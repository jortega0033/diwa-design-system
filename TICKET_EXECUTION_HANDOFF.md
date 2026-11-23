# Ticket Execution Handoff Framework

> **Status, 2026-11-21: historical.** This workflow was written for the DS-001…DS-032 round in April 2026.
> DS-001–005, DS-013, DS-031 and DS-032 are merged; DS-006, DS-007, DS-014 and DS-025 are open as issues #13, #14, #15 and #16; the other IDs were never filed.
> The backlog is GitHub issues, the current batch is epic [#169](https://github.com/jortega0033/diwa-design-system/issues/169), and the current workflow and evidence rules are in [`CLAUDE.md`](CLAUDE.md) and [`AGENTS.md`](AGENTS.md).
> See the drift table in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#documentation-drift).
## Autonomous AI-Driven Workflow for Diwa DS Tickets

This document defines the complete autonomous execution workflow for each ticket (DS-001 through DS-032). Follow this process to take a ticket from creation to merge without interruption.

---

## Pre-Execution Checklist

**Before starting ANY ticket:**
- [ ] Ticket is created on GitHub (issue open, not draft)
- [ ] Read this entire handoff framework before proceeding
- [ ] Note ticket number (e.g., DS-001), title, and milestone
- [ ] Review the **Affected Files** section in the ticket
- [ ] Identify blocking tickets in **Dependencies** section
- [ ] Confirm all blocking tickets are MERGED before starting

---

## Execution Workflow (12 Steps)

### Step 1: Refine & Analyze Ticket (15 min)

**Objective:** Deeply understand the ticket scope, constraints, and success criteria.

**Actions:**
1. Read the ticket body completely 2-3 times
2. Extract and note:
   - **Problem statement** (2-3 sentences)
   - **Acceptance criteria** (bullet list — these are your test map)
   - **Affected files** (exact paths)
   - **Blocking tickets** (must be merged first)
   - **Type of work** (a11y, refactor, feat, fix, docs, tokens, etc.)

3. Run terminal search to understand current state:
   ```bash
   # Example for DS-001 (flyout focus trap)
   grep -r "focus.*trap\|FocusTrap" diwa-components/src/components/diwa-flyout/
   grep -r "focus.*trap\|FocusTrap" diwa-components/src/components/diwa-modal/  # Reference impl
   ```

4. Create a **session memory note** with:
   - Ticket scope summary
   - Key acceptance criteria
   - Files to modify
   - Known related tickets/patterns
   - Risks or edge cases

5. **Checkpoint:** Privately ask yourself — "Can I explain this ticket's goal in one sentence? Do I know what 'done' looks like?" If not, re-read and refine understanding.

---

### Step 2: Plan Implementation (30 min)

**Objective:** Design the implementation approach and identify which agents/experts to invoke.

**Actions:**
1. **Determine agent lineup:**
   - **Always:** Code Reviewer (final feedback)
   - **A11y tickets (DS-001–003, 006–010, 013–017):** Accessibility Auditor + Code Reviewer
   - **Token tickets (DS-005, 014, 020–022):** UX Architect + Code Reviewer
   - **Refactor tickets (DS-011, DS-019, DS-031):** Frontend Developer + Code Reviewer
   - **Docs tickets (DS-018, 025, 026):** Technical Writer + Code Reviewer
   - **Storefront tickets (DS-015, 023–024):** Diwa DS Storefront Developer + Code Reviewer
   - **UI/layout tickets:** UI Designer + UX Architect + Code Reviewer

2. **Invoke subagents to plan:**
   ```markdown
   CALL: runSubagent("Diwa DS [ROLE] Engineer")
   PROMPT: [Include full ticket description, affected files, acceptance criteria]
   REQUEST: Provide detailed 3-5 step implementation plan with:
   - Approach overview
   - File modification sequence
   - Key functions/components to create/modify
   - Testing strategy
   - Risks and mitigation
   ```

3. **Document the plan:**
   - Copy agent output to session memory
   - Identify any gaps or questions
   - Note test fixtures needed
   - List dependencies on other code

4. **Checkpoint:** "Does the plan cover all acceptance criteria? Can I implement this solo, or do I need additional research?"

---

### Step 3: Create Feature Branch (5 min)

**Objective:** Isolate work in a dedicated branch following conventional naming.

**Actions:**
1. Create branch using conventional name:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b "{type}/{short-description}"
   # Examples:
   # fix/flyout-focus-trap        # for DS-001
   # feat/tabs-apg-keyboard       # for DS-006
   # refactor/input-base-class    # for DS-031
   # docs/tabs-accessibility      # for DS-013
   ```

2. Verify branch created:
   ```bash
   git branch --show-current     # Confirm current branch
   git log --oneline | head -3   # Confirm at latest main commit
   ```

3. **Checkpoint:** "Am I on the correct branch with no uncommitted changes?"

---

### Step 4: Implement Changes (2–5 hours depending on effort tier)

**Objective:** Write code per the acceptance criteria and implementation plan.

**Actions:**

1. **Follow file editing patterns:**
   - Use `read_file` to inspect existing code before editing
   - Use `multi_replace_string_in_file` for parallel edits (more efficient)
   - Preserve 3–5 lines of context before/after each edit
   - Keep commits focused (one logical change per commit during development)

2. **For each file modification:**
   - [ ] Read current code
   - [ ] Understand existing patterns/conventions
   - [ ] Implement the change
   - [ ] Verify no TypeScript errors: `npm run type-check`
   - [ ] Note file in session memory

3. **Tests:**
   - Write/update tests alongside code (TDD or simultaneous)
   - Run tests locally: `npm run test` (should pass, no regressions)
   - For component work: verify control-heights gate passes: `npm run agency:validate:control-heights`

4. **Quality gates (run during development):**
   ```bash
   npm run build          # Must compile without errors
   npm run test           # All tests pass (487+)
   npm run type-check     # No TypeScript errors
   npm run build:storefront  # Static export works (if storefront changes)
   ```

5. **Checkpoints (every 30 min):**
   - Tests still passing?
   - Code compiles?
   - Acceptance criteria being met?
   - Any blocking issues surfacing?

---

### Step 5: Commit & Push (10 min)

**Objective:** Preserve work and prepare for PR creation.

**Actions:**

1. **Stage changes by feature (logical commits):**
   ```bash
   # Review what changed
   git status
   git diff --stat
   
   # Commit with conventional message format
   git add <files>
   git commit -m "{type}({scope}): {description}"
   
   # Examples:
   # fix(flyout): implement keyboard focus trap pattern
   # feat(tabs): add ARIA APG keyboard navigation
   # refactor(inputs): extract common base class
   # docs(tabs): remove false keyboard guarantees
   ```

2. **Rebase and clean (if multiple commits):**
   ```bash
   git rebase -i main  # Interactive rebase to squash/organize if needed
   ```

3. **Push branch:**
   ```bash
   git push origin <branch-name>
   git push --set-upstream origin <branch-name>  # First push
   ```

4. **Verify:**
   ```bash
   git log --oneline origin/<branch-name>..origin/main | wc -l  # Count commits
   ```

5. **Checkpoint:** "Are all commits pushed? Is the branch visible on GitHub?"

---

### Step 6: Create Pull Request (10 min)

**Objective:** Open PR for review with full context and acceptance criteria visibility.

**Actions:**

1. **Use GitHub CLI to create PR with full body:**
   ```bash
   gh pr create \
     --title "[TICKET-NUMBER] {title}" \
     --body "$(cat <<'EOF'
   ## Ticket
   [Link to GitHub issue](https://github.com/jortega0033/diwa-design-system/issues/XX)
   
   ## Scope
   {Copy ticket summary from issue}
   
   ## Changes
   - [ ] {Acceptance criterion 1}
   - [ ] {Acceptance criterion 2}
   - ...
   
   ## Testing
   - Ran: npm run build
   - Ran: npm run test (XX tests passed)
   - Ran: npm run type-check
   - Ran: npm run build:storefront
   - Ran: npm run agency:validate:control-heights
   
   ## Files Modified
   - `file1.tsx`
   - `file2.spec.ts`
   - etc.
   
   ## Implementation Notes
   {Copy key decisions from implementation phase}
   
   CC: @copilot (review)
   EOF
   )" \
     --head <branch-name> \
     --base main
   ```

2. **Or manually on GitHub:**
   - Go to repo → Pull Requests
   - Click "New Pull Request"
   - Select branch
   - Fill in title and description (template above)
   - Create PR

3. **Copy PR URL and note it:**
   ```
   Example: https://github.com/jortega0033/diwa-design-system/pull/42
   ```

4. **Checkpoint:** "Is the PR visible on GitHub with full description and checklist?"

---

### Step 7: Run Review Pass with Relevant Agents (45 min)

**Objective:** Invoke specialized agents to review code quality, a11y, and patterns before merging.

**Actions:**

1. **Invoke Code Reviewer (always):**
   ```
   CALL: runSubagent("Code Reviewer")
   PROMPT:
   "Review the following PR for the Diwa Design System:
   
   GitHub PR: [URL from Step 6]
   Ticket: [DS-XXX]
   Branch: [branch-name]
   
   Please review for:
   - Correctness (no logic bugs, edge cases handled)
   - Maintainability (code clarity, patterns followed)
   - Security (no vulnerabilities, input validation)
   - Performance (no regressions, efficient approach)
   - Alignment with Diwa conventions (see AGENTS.md, DESIGN.md)
   
   Provide specific, actionable feedback. Focus on bugs and architecture, not style preferences."
   ```

2. **Invoke domain-specific agents based on ticket type:**
   - **A11y tickets:** Accessibility Auditor
   - **Token tickets:** UX Architect  
   - **Refactors:** Frontend Developer
   - **Docs:** Technical Writer
   - **Storefront:** Diwa DS Storefront Developer
   
   Same format as Code Reviewer, tailored to domain.

3. **Collect feedback:**
   - Copy agent outputs to session memory
   - Categorize findings as:
     - 🔴 **Blockers** (must fix before merge)
     - ⚠️ **Issues** (should fix)
     - 💡 **Suggestions** (nice-to-have)
     - ✅ **Approvals** (agent satisfied)

4. **Checkpoint:** "Are all agents' feedback captured? Are there blockers?"

---

### Step 8: Address Findings (30 min–2 hours depending on feedback)

**Objective:** Apply agent feedback to code and re-test.

**Actions:**

1. **For each blocker (🔴):**
   - Understand the feedback
   - Modify code to address
   - Run tests: `npm run test` (confirm pass)
   - Commit: `git commit -m "review: address {reviewer} feedback on {topic}"`
   - Push: `git push origin <branch>`

2. **For each issue (⚠️):**
   - Evaluate if fix is appropriate for ticket scope
   - If in scope, commit and push (same pattern)
   - If out of scope, create a separate follow-up ticket or note it in PR comment

3. **For suggestions (💡):**
   - Consider if applicable and low-effort
   - If yes, apply and commit
   - If no, add comment in PR explaining why not addressed now

4. **Quality gates (after each batch of fixes):**
   ```bash
   npm run build
   npm run test
   npm run type-check
   ```

5. **Checkpoint:** "Are all blockers resolved? Do tests still pass? Is PR updated with new commits?"

---

### Step 9: Tag @copilot for Final Review (2 min)

**Objective:** Request final pass from Copilot before resolution.

**Actions:**

1. **Add comment to PR on GitHub:**
   ```markdown
   @copilot please perform a final architectural and pattern review on this PR.
   
   Ticket: [DS-XXX]
   Branch: [branch-name]
   
   Focus areas:
   1. Alignment with Diwa DS architecture (AGENTS.md boundary checks)
   2. Token system compliance (if applicable)
   3. A11y contract preservation
   4. Generated wrapper compatibility (if applicable)
   5. Overall quality gate pass
   
   Once you're satisfied, we'll proceed to merge.
   ```

2. **Wait for Copilot comment response**

3. **Checkpoint:** "Has Copilot responded? Are there new findings?"

---

### Step 10: Address Copilot Findings (if any) (15 min–1 hour)

**Objective:** Fix any final issues Copilot raised.

**Actions:**

1. If Copilot flags issues:
   - Treat with same priority as Step 8
   - Apply fixes
   - Commit and push
   - Run quality gates
   - Respond in PR comment thread

2. If Copilot approves:
   - Note approval in session memory
   - Move to Step 11

3. **Checkpoint:** "Are Copilot's concerns fully addressed? Did they approve?"

---

### Step 11: Resolve Comments (5 min)

**Objective:** Mark all resolved review threads and clean up discussion.

**Actions:**

1. **On GitHub PR:**
   - Scan all review threads
   - For comments that are addressed:
     - Click "Resolve conversation" (if thread exists)
   - Verify all are marked resolved or have follow-up ticket

2. **Final checklist in PR:**
   - [ ] All acceptance criteria met
   - [ ] All tests pass (487+)
   - [ ] Type-check clean
   - [ ] Storefront builds (if applicable)
   - [ ] All review comments resolved
   - [ ] Agents approved
   - [ ] Copilot approved

3. **PR ready state:**
   - Status checks green (CI/CD, tests, etc.)
   - All reviewers signed off
   - No merge conflicts

4. **Checkpoint:** "Is PR in mergeable state? All checks green?"

---

### Step 12: Merge & Verify (5 min)

**Objective:** Merge branch to main and verify post-merge state.

**Actions:**

1. **Merge on GitHub:**
   - Click "Merge pull request" (or use GitHub CLI)
   - Confirm merge (usually "Create a merge commit" is fine)
   - Delete branch after merge (GitHub offers this)

   Via CLI:
   ```bash
   gh pr merge <number> --merge  # or --squash for single commit
   ```

2. **Verify main branch:**
   ```bash
   git checkout main
   git pull origin main
   git log --oneline | head -5  # Confirm merge commit
   ```

3. **Run full CI suite locally (optional but recommended):**
   ```bash
   npm run build
   npm run test
   npm run type-check
   npm run build:storefront
   npm run agency:validate:control-heights
   ```

4. **Update session memory:**
   - Mark ticket COMPLETE
   - Note: Merged as PR#{number}, commit {sha}
   - Link to ticket performance (if measuring)

5. **Checkpoint:** "Are changes on main? Do all gates pass? Is branch deleted?"

---

## Parallel Execution Guide

**For multi-ticket sprints (e.g., Sprint 1 with DS-001, DS-002, DS-003):**

1. **Create three branches** (Step 3) — one per ticket
2. **Work on each in parallel:**
   - Switch between branches as needed
   - Keep work isolated (no shared file conflicts if possible)
   - Run quality gates frequently

3. **Avoid merge conflicts:**
   - Coordinate file modifications across branches
   - If both need same file, do one PR merge first, then rebase second branch
   - Communicate state in session memory

4. **Create PRs in sequence (not parallel):**
   - PR #1 (DS-001), review, merge
   - PR #2 (DS-002), review, merge
   - PR #3 (DS-003), review, merge
   - (Parallel review is OK, but sequential merge avoids conflicts)

5. **Test after each merge:**
   - Pull main after each merge
   - Run full suite to confirm stability
   - Only then switch to next ticket branch

---

## Critical Checkpoints (Do Not Skip)

| Checkpoint | Location | Pass Criteria |
|------------|----------|---------------|
| Understanding | Step 1 | Can explain ticket in 1 sentence; know what 'done' looks like |
| Planning | Step 2 | Have agents' implementation plan; risks identified |
| Branch isolation | Step 3 | On correct branch; at latest main commit; no uncommitted changes |
| Code quality | Step 4 | `npm run build`, `npm run test`, `npm run type-check` all pass |
| Commit hygiene | Step 5 | Commits pushed; visible on GitHub; conventional message format |
| PR visibility | Step 6 | PR on GitHub with full description; checklist visible |
| Agent feedback | Step 7 | All agents responded; feedback categorized |
| Findings resolved | Step 8 | All blockers fixed; tests still pass |
| Copilot approval | Step 10 | Copilot approved or concerns addressed |
| Merge readiness | Step 11 | All checks green; no conflicts; ready to merge |
| Post-merge | Step 12 | Changes on main; all gates pass; branch deleted |

---

## Emergency Exit: If Stuck

If you encounter a blocker or uncertainty:

1. **Document the blocker:**
   - What were you trying to do?
   - What error/issue occurred?
   - What have you tried?

2. **Invoke a specialist agent:**
   ```
   CALL: runSubagent("Code Reviewer" or domain expert)
   PROMPT: "I'm stuck on ticket [DS-XXX] at step [N].
   Problem: [describe issue]
   Attempted solutions: [list]
   Please advise on next steps."
   ```

3. **Or pause the ticket:**
   - Leave branch as-is (no force push cleanup)
   - Note blocker in session memory
   - Move to a different (unblocked) ticket
   - Return to this one after blocker is resolved

4. **Escalate if needed:**
   - If architectural question, ping Diwa DS SDLC Lead
   - If token question, ping Diwa DS Web Components Engineer
   - If storefront, ping Diwa DS Storefront Developer

---

## Post-Ticket Handoff

After Step 12 (merge complete), before starting next ticket:

1. **Update ticket tracking:**
   - Ticket is CLOSED on GitHub
   - Mark in velocity plan as DONE
   - Note completion time (estimated vs actual)

2. **Capture learnings in session memory:**
   - What went well?
   - What was harder than expected?
   - Any patterns to reuse for similar tickets?

3. **Prepare for next ticket:**
   - Read next ticket in sprint (same process)
   - Check if it's dependent on this ticket (probably not, but verify)
   - Start Step 1: Refine & Analyze

---

## Appendix: Commands Cheat Sheet

```bash
# Branch management
git checkout -b feature/name
git branch --show-current
git push origin <branch> --set-upstream

# PR creation
gh pr create --title "Title" --body "Body" --head <branch> --base main

# Quality gates
npm run build
npm run test
npm run type-check
npm run build:storefront
npm run agency:validate:control-heights

# Git workflow
git add <files>
git commit -m "type(scope): message"
git push origin <branch>
git log --oneline | head -5

# Review & merge
gh pr list          # List open PRs
gh pr checks <num>  # Check CI status
gh pr merge <num>   # Merge PR
```

---

## Ticket Template with Handoff Instructions

When creating issues (or when handed a ticket), ensure it includes:

```markdown
## DS-XXX: {Title}

### Milestone
M1 / M2 / M3

### Priority
P0 / P1 / P2 / P3

### Effort Estimate
XS / S / M / L / XL

### Summary
{Problem description}

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- ...

### Dependencies
- Blocked by: [list tickets]
- Blocks: [list tickets]

### Affected Files
- file1.tsx
- file2.spec.ts

---

## 🤖 AUTONOMOUS HANDOFF EXECUTION

**To execute this ticket autonomously, follow the 12-step workflow in TICKET_EXECUTION_HANDOFF.md:**

1. Refine & analyze ticket
2. Plan implementation (invoke agents)
3. Create feature branch (`fix/short-name`)
4. Implement changes (follow code patterns)
5. Commit & push (`git commit -m "type(scope): message"`)
6. Create PR with checklist
7. Run review pass (invoke agents: Code Reviewer + domain specialist)
8. Address findings (blockers first)
9. Tag @copilot for final review
10. Address Copilot findings (if any)
11. Resolve comments (mark all threads resolved)
12. Merge & verify (confirm on main; all gates pass)

**Quality gates after each step:**
- npm run build
- npm run test
- npm run type-check

**PR merge ready checklist:**
- [ ] All acceptance criteria met
- [ ] All tests pass (487+)
- [ ] All agents approved
- [ ] Copilot approved
- [ ] All comments resolved
- [ ] CI checks green
```

---

**End of Handoff Framework**

Use this document as the execution guide for every ticket (DS-001 through DS-032). Each ticket should be self-contained, executable, and completable without external coordination.
