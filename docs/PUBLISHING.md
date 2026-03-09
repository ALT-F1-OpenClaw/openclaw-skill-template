# Publishing to ClawHub

Guide for publishing OpenClaw skills to [ClawHub](https://clawhub.ai).

## Prerequisites

1. Install ClawHub CLI: `npm i -g clawhub`
2. Log in: `clawhub login` (opens browser for authorization)
3. Verify: `clawhub whoami`

## License

**All skills on ClawHub are published under MIT-0.** This is non-negotiable.

> ⚠️ Do NOT add a `license:` field in your `SKILL.md` frontmatter — it will conflict with ClawHub's MIT-0 requirement and cause publish errors.

## Publish Command

```bash
clawhub publish ./path-to-skill \
  --slug your-skill-by-altf1be \
  --name "Your Skill by altf1be" \
  --version 1.0.0 \
  --changelog "Initial release: feature list here"
```

## Update an Existing Skill

```bash
clawhub publish ./path-to-skill \
  --slug your-skill-by-altf1be \
  --name "Your Skill by altf1be" \
  --version 1.1.0 \
  --changelog "What changed in this version"
```

## Sync (Auto-Detect Changes)

```bash
clawhub sync --workdir ./path-to-skill
```

This scans for local skills and offers to upload new or changed ones.

## After Publishing

1. Verify on ClawHub: `clawhub search "your-skill"`
2. Test install: `clawhub install your-skill-by-altf1be`
3. Security review may take a few days — check status on ClawHub

## ALT-F1 Published Skills

| Slug | Version | Service |
|------|---------|---------|
| `atlassian-jira-by-altf1be` | 1.1.0 | Atlassian Jira Cloud |
| `sharepoint-by-altf1be` | 1.2.0 | Microsoft SharePoint |
| `x-twitter-by-altf1be` | 1.1.0 | X/Twitter |
| `openclaw-skill-m365-task-manager-by-altf1be` | 0.2.0 | Microsoft 365 To Do |

## Troubleshooting

### `acceptLicenseTerms: invalid value`
Known bug in ClawHub CLI v0.7.0. See [issue #660](https://github.com/openclaw/clawhub/issues/660).

### Skill not showing in search after publish
Security review may take several days. Check your ClawHub dashboard or contact support on [Discord](https://discord.com/invite/clawd).
