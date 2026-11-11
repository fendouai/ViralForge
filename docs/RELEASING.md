# Releasing ViralForge

## 1. Preflight

```bash
git status                  # clean
npm run doctor
npm run build
npm test
npm run test:media
npm run test:mcp
```

## 2. Version and changelog

- Bump `version` in `package.json`.
- Add a section to `CHANGELOG.md`.
- Add `docs/RELEASE-NOTES-v<version>.md`.

## 3. Tag and archive

```bash
git add -A
git commit -m "release: v0.1.0"
git tag -a v0.1.0 -m "ViralForge v0.1.0"
npm run release:archive     # release/viralforge-0.1.0.tar.gz + .sha256
```

## 4. Create the GitHub repository

The repository must be public and named **ViralForge**. With GitHub CLI:

```bash
gh auth login
gh repo create ViralForge --public --source=. --remote=origin --push
git push origin main --tags
```

Or create an empty public repo in the GitHub UI, then:

```bash
git remote add origin git@github.com:<org>/ViralForge.git
git push -u origin main
git push origin v0.1.0
```

## 5. GitHub release

```bash
gh release create v0.1.0 \
  release/viralforge-0.1.0.tar.gz \
  release/viralforge-0.1.0.tar.gz.sha256 \
  --title "ViralForge v0.1.0" \
  --notes-file docs/RELEASE-NOTES-v0.1.0.md
```

Checklist:

- [ ] Repository is public and named ViralForge
- [ ] Description matches the README one-liner (see `docs/GITHUB-METADATA.md`)
- [ ] Topics applied: `viral-video`, `viral-video-replication`, `video-script-deconstruction`,
      `one-click-replication`, `ai-agent`, `mcp`, `claude-code`, `ffmpeg`, `ugc-ads` (full list in
      `docs/GITHUB-METADATA.md`)
- [ ] Social preview uses `docs/en/social-preview.jpg`
- [ ] License detected as Apache-2.0
- [ ] Security policy visible
- [ ] Release assets uploaded
- [ ] No secrets or `.env` committed

## 6. npm

Not published in v0.1.0. `package.json` keeps `"private": true` so a stray
`npm publish` cannot ship the whole demo. If we later publish the CLI, split it
into a small package (e.g. `@viralforge/cli`) with its own `files` allowlist.

## 7. After release

- Pin the release in the README.
- Post the 3-minute demo (`docs/DEMO.md`).
- Open “good first issue” items for providers, WhisperX alignment and product
  consistency.
