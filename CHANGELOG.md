# Changelog

All notable changes to ViralForge are documented here. This project follows
[Semantic Versioning](https://semver.org/).

## [0.1.0] — 2026-11-11

First open-source MVP.

### Added

- **Studio**: three-step flow — deconstruct → replicate → 10 variants.
- **Viral DNA report**: hook, 3-second retention, structure segments, shot table,
  emotional radar, transferable formula, shareable report page.
- **VFML**: word-anchored, editable video project format; dirty-shot regeneration
  and per-variant cost ledger.
- **Three demo cases**: beauty serum (GLOW LAB), commuter tote (AER), ambient lamp
  (MORI), each with a rendered 9:16 film and 10 variants.
- **Local analysis CLI**: `viralforge analyze` uses OpenCV shot detection and
  numpy tempo/energy analysis; no API key.
- **MCP server**: `list_cases`, `get_case`, `analyze_video`, `build_project`.
- **Agent Skill**: `skills/viralforge/SKILL.md`.
- **Renderer**: Playwright frame capture + FFmpeg; self-synthesized BGM.
- **Tests**: Playwright E2E (21 checks), media validation, MCP handshake.
- **Docs**: plan, implementation notes, local setup, demo script, open questions.

### Known limits

- Semantic insights are curated; ASR/multimodal annotation are not wired.
- Replica films are pre-rendered; batch variants produce scripts, covers and cost
  estimates rather than rendered videos.
- Platform link ingestion is intentionally not implemented; local uploads only.
- No public deployment credentials are bundled.

### License

Apache-2.0. No Hypit code is included or derived. See `NOTICE`.
