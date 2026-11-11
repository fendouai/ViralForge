# Contributing to ViralForge

Thanks for helping. ViralForge is a local-first, agent-native short-video studio.
We care about clear structure, honest demos, and safe defaults.

## Development

```bash
npm install
npm run doctor
npm run dev        # http://127.0.0.1:5173
```

Before opening a PR:

```bash
npm run typecheck
npm run build
npm test
npm run test:media
npm run test:mcp
```

If you do not have the optional tools, `npm run doctor` tells you what is missing.
FFmpeg, Python/OpenCV and Chromium are only needed for rendering, local analysis and tests.

## What to work on

- New provider adapters (video/image/TTS) behind a server-side boundary.
- Better local analysis: scene detection, WhisperX word alignment, beat grids.
- VFML improvements: selective regeneration, multi-language reflow, diffing.
- Product consistency: reference-image constraints and evaluation.
- Report-page and accessibility improvements.

Open an issue before large changes. Keep PRs focused; one concern per PR.

## Ground rules

- **No face swap.** Only the user's own or licensed avatars.
- **No original footage redistribution.** Analyze structure, not assets.
- **No secrets in the frontend.** Never add `VITE_*_KEY`; keys belong in a server/worker.
- **Label AI output.** Keep the explicit and metadata AI labels.
- **Honest demos.** Do not present pre-rendered fixtures as live model output.
- **License.** Contributions are accepted under Apache-2.0. Do not add AGPL or
  license-incompatible dependencies. Do not copy Hypit code.

## Commit style

Use short, imperative subjects, for example:

```
feat: add Wan2.2 provider adapter
fix: keep caption input in sync with dirty shots
docs: clarify zero-key setup
```

## Reporting bugs

Use the issue templates. Include OS, Node version, `npm run doctor` output, and
reproduction steps. For security issues, see `SECURITY.md`.
