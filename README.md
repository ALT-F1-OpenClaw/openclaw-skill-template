# openclaw-skill-template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org/)
[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-orange.svg)](https://clawhub.ai)
[![GitHub last commit](https://img.shields.io/github/last-commit/ALT-F1-OpenClaw/openclaw-skill-template)](https://github.com/ALT-F1-OpenClaw/openclaw-skill-template/commits/main)
[![GitHub stars](https://img.shields.io/github/stars/ALT-F1-OpenClaw/openclaw-skill-template)](https://github.com/ALT-F1-OpenClaw/openclaw-skill-template/stargazers)

Template repository for creating OpenClaw skills — ALT-F1 best practices, structure, and conventions.

By [Abdelkrim BOUJRAF](https://www.alt-f1.be) / ALT-F1 SRL, Brussels 🇧🇪 🇲🇦

## Table of Contents

- [About](#about)
- [Quick Start](#quick-start)
- [Template Structure](#template-structure)
- [Conventions](#conventions)
- [Skills Built with This Template](#skills-built-with-this-template)
- [Documentation](#documentation)
- [License](#license)
- [Author](#author)
- [Contributing](#contributing)

## About

This repository provides a **standardized starting point** for building OpenClaw skills. It captures patterns and best practices learned from building production skills at ALT-F1 SRL.

Use this template to ensure consistency across your skills — same structure, same security patterns, same documentation quality.

## Quick Start

```bash
# 1. Use as GitHub template (recommended)
# Click "Use this template" on GitHub, or:
gh repo create ALT-F1-OpenClaw/openclaw-skill-YOUR-SERVICE --template ALT-F1-OpenClaw/openclaw-skill-template --public

# 2. Or clone manually
git clone https://github.com/ALT-F1-OpenClaw/openclaw-skill-template.git openclaw-skill-your-service
cd openclaw-skill-your-service
rm -rf .git && git init

# 3. Customize
# - Rename scripts/skill-name.mjs → scripts/your-service.mjs
# - Update package.json (name, description, bin, repository)
# - Update SKILL.md (name, description, homepage, metadata)
# - Update .env.example with your service's env vars
# - Update README.md with your service's details

# 4. Install & develop
npm install
node scripts/your-service.mjs --help
```

## Template Structure

```
openclaw-skill-template/
├── README.md                          # Standard README (this file)
├── SKILL.md                           # OpenClaw skill definition (frontmatter + docs)
├── LICENSE                            # MIT license
├── .gitignore                         # node_modules, .env, *.log
├── .env.example                       # Template environment variables
├── package.json                       # ESM, commander + dotenv
├── scripts/
│   └── skill-name.mjs                 # CLI skeleton with all ALT-F1 patterns
├── docs/
│   ├── CONVENTIONS.md                 # ALT-F1 coding conventions
│   ├── PUBLISHING.md                  # How to publish to ClawHub
│   └── CHECKLIST.md                   # Pre-publish checklist
└── .github/
    └── ISSUE_TEMPLATE/
        └── bug_report.md              # Standard bug report template
```

## Conventions

See [docs/CONVENTIONS.md](./docs/CONVENTIONS.md) for the full guide. Key points:

- **ESM only** — `"type": "module"` in package.json
- **Commander + dotenv** — minimal dependencies
- **Lazy config with Proxy** — validate only when commands run
- **`--confirm` for deletes** — never delete without explicit flag
- **No secrets to stdout** — ever
- **Rate-limit retry** — exponential backoff for cloud APIs
- **`safePath()`** — prevent path traversal attacks

## Skills Built with This Template

| Skill | Service | ClawHub Slug | Status |
|-------|---------|-------------|--------|
| [openclaw-skill-atlassian-jira](https://github.com/ALT-F1-OpenClaw/openclaw-skill-atlassian-jira) | Atlassian Jira Cloud | `atlassian-jira-by-altf1be` | ✅ Production |
| [openclaw-skill-sharepoint](https://github.com/ALT-F1-OpenClaw/openclaw-skill-sharepoint) | Microsoft SharePoint | `sharepoint-by-altf1be` | ✅ Production |
| [openclaw-skill-x-twitter](https://github.com/ALT-F1-OpenClaw/openclaw-skill-x-twitter) | X/Twitter | `x-twitter-by-altf1be` | ✅ Production |
| [openclaw-skill-m365-task-manager](https://github.com/ALT-F1-OpenClaw/openclaw-skill-m365-task-manager) | Microsoft 365 To Do | `openclaw-skill-m365-task-manager-by-altf1be` | ✅ Production |

## Documentation

- [Coding Conventions](./docs/CONVENTIONS.md) — patterns, security, naming
- [Publishing Guide](./docs/PUBLISHING.md) — how to publish to ClawHub
- [Pre-Publish Checklist](./docs/CHECKLIST.md) — quality gates before release

## License

MIT — see [LICENSE](./LICENSE)

> **Note:** Skills published on ClawHub are under **MIT-0** license. Do not add conflicting license terms in `SKILL.md`. See [docs/PUBLISHING.md](./docs/PUBLISHING.md) for details.

## Author

Abdelkrim BOUJRAF — [ALT-F1 SRL](https://www.alt-f1.be), Brussels 🇧🇪 🇲🇦
- GitHub: [@abdelkrim](https://github.com/abdelkrim)
- X: [@altf1be](https://x.com/altf1be)

## Contributing

Contributions welcome! Please open an issue or PR.
