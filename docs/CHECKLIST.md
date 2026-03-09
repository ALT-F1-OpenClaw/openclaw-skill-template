# Pre-Publish Checklist

Run through this checklist before publishing a new skill or version to ClawHub.

## Code Quality

- [ ] All commands work with valid credentials
- [ ] `--help` works WITHOUT credentials (lazy config)
- [ ] All delete commands require `--confirm` flag
- [ ] No secrets/tokens printed to stdout
- [ ] `safePath()` used on all user-provided file paths
- [ ] `checkFileSize()` used on all file uploads
- [ ] Rate-limit retry implemented for cloud APIs
- [ ] Error messages include HTTP status codes
- [ ] `wrap()` error handler on all command actions

## Files

- [ ] `SKILL.md` — valid frontmatter (name, description, homepage, metadata)
- [ ] `SKILL.md` — NO `license:` field in frontmatter
- [ ] `README.md` — follows standard TOC structure
- [ ] `README.md` — all badges present and correct
- [ ] `README.md` — "By" line with 🇧🇪 🇲🇦 flags
- [ ] `package.json` — correct version, name, description, repository URL
- [ ] `.env.example` — all required env vars documented
- [ ] `.gitignore` — includes `.env`, `node_modules/`, `*.log`
- [ ] `LICENSE` — MIT license present

## Git

- [ ] All changes committed
- [ ] Version bumped in `package.json`
- [ ] Git tag created: `git tag v1.x.0`
- [ ] Pushed to GitHub: `git push && git push --tags`

## GitHub Repo

- [ ] Description set
- [ ] Topics added: `openclaw`, `<service>`, `ai-skill`, `openclaw-skill`
- [ ] Public visibility (for open-source skills)

## ClawHub

- [ ] Slug follows pattern: `<service>-by-altf1be`
- [ ] Version matches `package.json`
- [ ] Changelog describes what changed
- [ ] Tested install: `clawhub install <slug>`
