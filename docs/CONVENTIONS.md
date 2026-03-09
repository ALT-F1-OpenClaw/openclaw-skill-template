# ALT-F1 OpenClaw Skill Conventions

Standards and patterns for building OpenClaw skills at ALT-F1 SRL.

## Naming

| What | Pattern | Example |
|------|---------|---------|
| Repo name | `openclaw-skill-<service>` | `openclaw-skill-atlassian-jira` |
| ClawHub slug | `<service>-by-altf1be` | `atlassian-jira-by-altf1be` |
| CLI binary | `<service>` | `jira` |
| Main script | `scripts/<service>.mjs` | `scripts/jira.mjs` |

## Project Structure

Every skill MUST have:

```
├── README.md          # Standardized (see README template)
├── SKILL.md           # OpenClaw frontmatter + command docs
├── LICENSE            # MIT
├── .gitignore         # node_modules, .env, *.log
├── .env.example       # All env vars with comments
├── package.json       # ESM, minimal deps
└── scripts/
    └── <service>.mjs  # Main CLI script
```

## README Standard

Every README follows this exact order:

1. **Title** — `# openclaw-skill-<service>`
2. **Badges** — License, Node.js, Service (with logo), OpenClaw, ClawHub, last commit, issues, stars
3. **Description** — one line
4. **By-line** — `By [Abdelkrim BOUJRAF](https://www.alt-f1.be) / ALT-F1 SRL, Brussels 🇧🇪 🇲🇦`
5. **Table of Contents**
6. **Features**
7. **Quick Start**
8. **Setup**
9. **Commands**
10. **Security**
11. **ClawHub**
12. **License**
13. **Author** — with GitHub + X links
14. **Contributing**

## Code Patterns

### Lazy Config with Proxy

```javascript
let _cfg;
function getCfg() {
  if (!_cfg) {
    _cfg = {
      apiKey: env('YOUR_API_KEY'),
      // ...
    };
  }
  return _cfg;
}
const CFG = new Proxy({}, { get: (_, prop) => getCfg()[prop] });
```

**Why:** Config is only validated when a command runs. `--help` works without env vars.

### env() Helper

```javascript
function env(key) {
  const v = process.env[key];
  if (!v) {
    console.error(`ERROR: Missing required env var ${key}. See .env.example`);
    process.exit(1);
  }
  return v;
}
```

### safePath() — Path Traversal Prevention

```javascript
function safePath(p) {
  if (!p) return '';
  const normalized = posix.normalize(p).replace(/\\/g, '/');
  if (normalized.includes('..')) {
    console.error('ERROR: Path traversal detected — ".." is not allowed');
    process.exit(1);
  }
  return normalized.replace(/^\/+/, '');
}
```

### Rate-Limit Retry with Backoff

```javascript
if (resp.status === 429) {
  const retryAfter = parseInt(resp.headers.get('retry-after') || '5', 10);
  const backoff = retryAfter * 1000 * attempt;
  if (attempt < retries) {
    console.error(`⏳ Rate limited — retrying in ${(backoff / 1000).toFixed(0)}s`);
    await new Promise(r => setTimeout(r, backoff));
    continue;
  }
}
```

### wrap() Error Handler

```javascript
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
```

## Security Rules

1. **`--confirm` for ALL deletes** — never delete without explicit flag
2. **No secrets to stdout** — never print API keys, tokens, or passwords
3. **`safePath()`** — prevent path traversal on any file path input
4. **`checkFileSize()`** — enforce configurable upload limits
5. **Rate-limit retry** — respect API rate limits with exponential backoff
6. **Lazy validation** — `--help` must work without credentials

## Auth Patterns

| Method | Use Case | Example Skill |
|--------|----------|---------------|
| Email + API token (Basic) | Atlassian, simple APIs | [Jira](https://github.com/ALT-F1-OpenClaw/openclaw-skill-atlassian-jira) |
| Certificate auth | Microsoft Graph (high security) | [SharePoint](https://github.com/ALT-F1-OpenClaw/openclaw-skill-sharepoint) |
| OAuth 1.0a | X/Twitter | [X-Twitter](https://github.com/ALT-F1-OpenClaw/openclaw-skill-x-twitter) |
| Device Code (delegated) | Microsoft 365 user context | [M365 Task Manager](https://github.com/ALT-F1-OpenClaw/openclaw-skill-m365-task-manager) |

## Dependencies

Keep dependencies **minimal**:

- `commander` — CLI framework (always)
- `dotenv` — env vars (always)
- Service-specific SDKs only when needed

## Versioning

- Follow [semver](https://semver.org/)
- Tag releases: `git tag v1.0.0 && git push --tags`
- **Patch** (1.0.x) — bug fixes
- **Minor** (1.x.0) — new features, docs changes
- **Major** (x.0.0) — breaking changes

## SKILL.md Frontmatter

```yaml
---
name: your-skill-by-altf1be
description: "One-line description"
homepage: https://github.com/ALT-F1-OpenClaw/openclaw-skill-your-service
metadata:
  {"openclaw": {"emoji": "🔧", "requires": {"env": ["VAR1", "VAR2"]}, "primaryEnv": "VAR1"}}
---
```

> ⚠️ **Do NOT add a `license:` field** — ClawHub enforces MIT-0 for all published skills.
