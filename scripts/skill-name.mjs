#!/usr/bin/env node

/**
 * OpenClaw [Service Name] Skill — CLI for [service] operations via [API name].
 *
 * @author Abdelkrim BOUJRAF <abdelkrim@alt-f1.be>
 * @license MIT
 * @see https://www.alt-f1.be
 */

import { readFileSync, statSync } from 'node:fs';
import { basename, resolve, posix } from 'node:path';
import { Buffer } from 'node:buffer';
import { config } from 'dotenv';
import { Command } from 'commander';

// ── Config ──────────────────────────────────────────────────────────────────

config(); // load .env

// Lazy config — only validated when a command actually runs
let _cfg;
function getCfg() {
  if (!_cfg) {
    _cfg = {
      apiKey:      env('YOUR_API_KEY'),
      apiHost:     env('YOUR_API_HOST'),
      maxResults:  parseInt(process.env.YOUR_MAX_RESULTS || '50', 10),
      maxFileSize: parseInt(process.env.YOUR_MAX_FILE_SIZE || '52428800', 10), // 50 MB
    };
  }
  return _cfg;
}
const CFG = new Proxy({}, { get: (_, prop) => getCfg()[prop] });

function env(key) {
  const v = process.env[key];
  if (!v) {
    console.error(`ERROR: Missing required env var ${key}. See .env.example`);
    process.exit(1);
  }
  return v;
}

// ── Security helpers ────────────────────────────────────────────────────────

/**
 * Prevent path traversal attacks.
 * Rejects any path containing ".." sequences.
 */
function safePath(p) {
  if (!p) return '';
  const normalized = posix.normalize(p).replace(/\\/g, '/');
  if (normalized.includes('..')) {
    console.error('ERROR: Path traversal detected — ".." is not allowed');
    process.exit(1);
  }
  return normalized.replace(/^\/+/, '');
}

/**
 * Check file size against configurable limit.
 */
function checkFileSize(filePath) {
  const stat = statSync(filePath);
  if (stat.size > CFG.maxFileSize) {
    console.error(`ERROR: File exceeds size limit (${(stat.size / 1048576).toFixed(1)} MB > ${(CFG.maxFileSize / 1048576).toFixed(1)} MB)`);
    process.exit(1);
  }
  return stat.size;
}

// ── HTTP client with rate-limit retry ───────────────────────────────────────

/**
 * Build authorization header.
 * Adapt this to your service's auth method:
 * - Basic auth: Buffer.from(`${email}:${token}`).toString('base64')
 * - Bearer token: `Bearer ${token}`
 * - API key header: custom header name
 */
function authHeader() {
  return `Bearer ${CFG.apiKey}`;
}

/**
 * Build base URL for API requests.
 */
function baseUrl() {
  const host = CFG.apiHost.replace(/\/+$/, '');
  const prefix = host.startsWith('http') ? host : `https://${host}`;
  return `${prefix}/api/v1`;
}

/**
 * Fetch with automatic rate-limit retry and exponential backoff.
 *
 * @param {string} path - API path (relative to baseUrl) or full URL
 * @param {object} options - fetch options (method, body, headers)
 * @param {number} retries - max retry attempts (default 3)
 */
async function apiFetch(path, options = {}, retries = 3) {
  const url = path.startsWith('http') ? path : `${baseUrl()}${path}`;
  const headers = {
    'Authorization': authHeader(),
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    const resp = await fetch(url, { ...options, headers });

    // Rate limited — retry with exponential backoff
    if (resp.status === 429) {
      const retryAfter = parseInt(resp.headers.get('retry-after') || '5', 10);
      const backoff = retryAfter * 1000 * attempt;
      if (attempt < retries) {
        console.error(`⏳ Rate limited — retrying in ${(backoff / 1000).toFixed(0)}s (attempt ${attempt}/${retries})`);
        await new Promise(r => setTimeout(r, backoff));
        continue;
      }
    }

    if (resp.status === 204) return null; // No content (deletes)

    const body = await resp.text();
    let json;
    try { json = JSON.parse(body); } catch { json = null; }

    if (!resp.ok) {
      const msg = json?.message || json?.error || body || resp.statusText;
      const err = new Error(msg);
      err.statusCode = resp.status;
      throw err;
    }

    return json;
  }
}

// ── Commands ────────────────────────────────────────────────────────────────

async function cmdList(options) {
  // TODO: Implement list command
  // const resp = await apiFetch('/items');
  console.log('TODO: Implement list command');
}

async function cmdCreate(options) {
  // TODO: Implement create command
  console.log('TODO: Implement create command');
}

async function cmdRead(options) {
  if (!options.id) {
    console.error('ERROR: --id is required');
    process.exit(1);
  }
  // TODO: Implement read command
  // const item = await apiFetch(`/items/${options.id}`);
  console.log('TODO: Implement read command');
}

async function cmdUpdate(options) {
  if (!options.id) {
    console.error('ERROR: --id is required');
    process.exit(1);
  }
  // TODO: Implement update command
  console.log('TODO: Implement update command');
}

async function cmdDelete(options) {
  if (!options.id) {
    console.error('ERROR: --id is required');
    process.exit(1);
  }
  if (!options.confirm) {
    console.error('ERROR: Delete requires --confirm flag for safety');
    console.error('Usage: skill-name delete --id 123 --confirm');
    process.exit(1);
  }
  // TODO: Implement delete command
  // await apiFetch(`/items/${options.id}`, { method: 'DELETE' });
  console.log('TODO: Implement delete command');
}

async function cmdSearch(options) {
  if (!options.query) {
    console.error('ERROR: --query is required');
    process.exit(1);
  }
  // TODO: Implement search command
  console.log('TODO: Implement search command');
}

// ── CLI ─────────────────────────────────────────────────────────────────────

const program = new Command();

program
  .name('skill-name')
  .description('OpenClaw [Service Name] Skill — [brief description]')
  .version('1.0.0');

program
  .command('list')
  .description('List items')
  .action(wrap(cmdList));

program
  .command('create')
  .description('Create a new item')
  .requiredOption('-n, --name <name>', 'Item name')
  .action(wrap(cmdCreate));

program
  .command('read')
  .description('Read item details')
  .requiredOption('--id <id>', 'Item ID')
  .action(wrap(cmdRead));

program
  .command('update')
  .description('Update an item')
  .requiredOption('--id <id>', 'Item ID')
  .option('-n, --name <name>', 'New name')
  .action(wrap(cmdUpdate));

program
  .command('delete')
  .description('Delete an item (requires --confirm)')
  .requiredOption('--id <id>', 'Item ID')
  .option('--confirm', 'Confirm deletion (required)')
  .action(wrap(cmdDelete));

program
  .command('search')
  .description('Search items')
  .requiredOption('-q, --query <text>', 'Search query')
  .action(wrap(cmdSearch));

/**
 * Wrap command handler with error handling.
 * Catches API errors and prints clean error messages with status codes.
 */
function wrap(fn) {
  return async (...args) => {
    try {
      await fn(...args);
    } catch (err) {
      if (err.statusCode) {
        console.error(`ERROR (${err.statusCode}): ${err.message}`);
      } else {
        console.error(`ERROR: ${err.message}`);
      }
      process.exit(1);
    }
  };
}

program.parse();
