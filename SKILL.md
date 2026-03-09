---
name: your-skill-by-altf1be
description: "One-line description of what this skill does — key features, API used, auth method."
homepage: https://github.com/ALT-F1-OpenClaw/openclaw-skill-your-service
metadata:
  {"openclaw": {"emoji": "🔧", "requires": {"env": ["YOUR_API_KEY"]}, "primaryEnv": "YOUR_API_KEY"}}
---

# Your Skill by @altf1be

Brief description of the skill and what service it connects to.

## Setup

1. Get API credentials from [service website](https://example.com)
2. Set environment variables (or create `.env` in `{baseDir}`):

```
YOUR_API_KEY=your-api-key
YOUR_API_HOST=api.example.com
```

3. Install dependencies: `cd {baseDir} && npm install`

## Commands

```bash
# List items
node {baseDir}/scripts/skill-name.mjs list

# Create an item
node {baseDir}/scripts/skill-name.mjs create --name "My item"

# Read item details
node {baseDir}/scripts/skill-name.mjs read --id 123

# Update an item
node {baseDir}/scripts/skill-name.mjs update --id 123 --name "Updated"

# Delete an item (requires --confirm)
node {baseDir}/scripts/skill-name.mjs delete --id 123 --confirm

# Search
node {baseDir}/scripts/skill-name.mjs search --query "keyword"
```

## Security

- [Describe auth method — API token, certificate, OAuth, etc.]
- No secrets or tokens printed to stdout
- All delete operations require explicit `--confirm` flag
- Path traversal prevention for file operations
- Built-in rate limiting with exponential backoff retry

## Dependencies

- `commander` — CLI framework
- `dotenv` — environment variable loading

## Author

Abdelkrim BOUJRAF — [ALT-F1 SRL](https://www.alt-f1.be), Brussels 🇧🇪 🇲🇦
X: [@altf1be](https://x.com/altf1be)
