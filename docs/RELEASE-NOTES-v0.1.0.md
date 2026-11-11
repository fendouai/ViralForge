# ViralForge v0.1.0

**Clone the structure. Not the footage.**

ViralForge is an agent-native short-video studio: paste a viral reference, get a
shareable **Viral DNA report**, **deconstruct the video script**, **one-click
replicate** the structure with your product, and generate **10 costed variants**.
This is the first open-source MVP.

## Highlights

- **One-click replication** — keep the structure, replace the product and script,
  and rebuild the video as an editable project.
- **Video script deconstruction** — hook, shot-by-shot structure, word anchors,
  beat grid, caption style, emotional curve and transferable formula.
- **Three layers in one studio** — deconstruct, replicate, variants.
- **Zero-key local demo** — three rendered 9:16 films ship with the repo; no
  model or platform API key is required.
- **Editable VFML** — word-anchored project JSON with dirty-shot regeneration,
  not a black-box MP4.
- **Real local analysis** — `viralforge analyze` computes shot cuts, BPM, energy
  and pacing with OpenCV + numpy.
- **Agent-native** — Skill, MCP server (`list_cases`, `get_case`,
  `analyze_video`, `build_project`) and CLI.
- **Three worked demo cases** — beauty serum, commuter tote, ambient lamp; each
  with a dossier, a replica film and 10 variants.
- **English-first README** — English case dossiers, pipeline artwork and agent
  quickstart; Chinese documentation is linked, not embedded.
- **Cost ledger** — every variant has a cost, and the batch shows total cost and
  estimated render time.

## Run

```bash
npm install
npm run doctor
npm run dev        # http://127.0.0.1:5173
```

Build/preview:

```bash
npm run build
npm run preview    # http://127.0.0.1:4173
```

## Honest limits

- Semantic insights are curated; ASR and multimodal annotation are not wired.
- The three replica films are pre-rendered; batch variants produce scripts,
  covers and cost estimates.
- Platform link download is intentionally not implemented; local uploads only.
- No face swap. Only the user's own or licensed avatars.
- AI-generated labels are always on.

## License

Apache-2.0. No Hypit code is included or derived. See `NOTICE`.
