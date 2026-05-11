#!/usr/bin/env node
/**
 * governance-check.cjs
 *
 * Validates CI/deploy governance rules for the Diwa Design System:
 *
 *  Rule 1 (issue #103): The projectId in deploy-storefront.yml must exactly match
 *    .firebaserc → projects.default (the canonical source of truth).
 *
 *  Rule 2 (issue #104): deploy-storefront.yml must use the workflow_run trigger and
 *    include a `conclusion == 'success'` guard on the deploy job to prevent broken
 *    commits from shipping before CI passes.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEPLOY_WORKFLOW = path.join(ROOT, '.github/workflows/deploy-storefront.yml');
const FIREBASERC = path.join(ROOT, '.firebaserc');

let errors = 0;

function fail(msg) {
  console.error(`[governance:check] FAIL: ${msg}`);
  errors++;
}

function pass(msg) {
  console.log(`[governance:check] PASS: ${msg}`);
}

// ---------------------------------------------------------------------------
// Rule 1 — projectId alignment (issue #103)
// Canonical source of truth: .firebaserc → projects.default
// Any future project ID change must update .firebaserc first.
// ---------------------------------------------------------------------------
function checkProjectIdAlignment() {
  let firebaserc;
  try {
    firebaserc = JSON.parse(fs.readFileSync(FIREBASERC, 'utf8'));
  } catch (err) {
    fail(`.firebaserc could not be read or parsed: ${err.message}`);
    return;
  }

  const canonicalId = firebaserc?.projects?.default;
  if (!canonicalId) {
    fail('.firebaserc is missing projects.default — cannot determine canonical project ID');
    return;
  }

  let deployYml;
  try {
    deployYml = fs.readFileSync(DEPLOY_WORKFLOW, 'utf8');
  } catch (err) {
    fail(`deploy-storefront.yml could not be read: ${err.message}`);
    return;
  }

  const match = deployYml.match(/^\s*projectId:\s*(\S+)\s*$/m);
  if (!match) {
    fail('projectId field not found in deploy-storefront.yml');
    return;
  }

  const workflowId = match[1];
  if (workflowId !== canonicalId) {
    fail(
      `projectId mismatch.\n` +
      `  canonical (.firebaserc):   ${canonicalId}\n` +
      `  workflow  (deploy yml):    ${workflowId}\n` +
      `  Fix: update deploy-storefront.yml to use "${canonicalId}"`
    );
  } else {
    pass(`projectId aligned — both sources use "${canonicalId}"`);
    console.log(
      '[governance:check] NOTE: .firebaserc → projects.default is the canonical ' +
      'source of truth. Any future project ID change must update .firebaserc first.'
    );
  }
}

// ---------------------------------------------------------------------------
// Rule 2 — workflow_run trigger + conclusion guard (issue #104)
// Prevents the deploy from running before CI completes (or on a failed CI run).
// ---------------------------------------------------------------------------
function checkWorkflowRunTrigger() {
  let deployYml;
  try {
    deployYml = fs.readFileSync(DEPLOY_WORKFLOW, 'utf8');
  } catch (err) {
    fail(`deploy-storefront.yml could not be read: ${err.message}`);
    return;
  }

  if (!deployYml.includes('workflow_run:')) {
    fail(
      'deploy-storefront.yml does not use the workflow_run trigger. ' +
      'Add "on: workflow_run: workflows: [\\"CI\\"] types: [completed]" ' +
      'to ensure deploys wait for CI to finish.'
    );
  } else {
    pass('workflow_run trigger is present');
  }

  if (!deployYml.includes("conclusion == 'success'")) {
    fail(
      "deploy job is missing the `conclusion == 'success'` guard. " +
      'Add `if: github.event.workflow_run.conclusion == \'success\'` ' +
      'to the deploy job to skip deploys on failed CI runs.'
    );
  } else {
    pass("conclusion == 'success' guard is present — broken commits will not ship");
  }
}

// ---------------------------------------------------------------------------
// Run all checks
// ---------------------------------------------------------------------------
checkProjectIdAlignment();
checkWorkflowRunTrigger();

if (errors > 0) {
  console.error(`\n[governance:check] ${errors} check(s) failed.`);
  process.exit(1);
} else {
  console.log('\n[governance:check] All checks passed.');
  process.exit(0);
}
