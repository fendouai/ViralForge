<p align="center">
  <img src="./docs/en/wordmark.svg" alt="ViralForge" width="460" />
</p>

<h3 align="center">One-click replication for viral short videos.<br/>Deconstruct the script. Keep the structure. Ship 10 variants.</h3>

<p align="center">
  <a href="#quickstart"><strong>Quickstart</strong></a> ·
  <a href="#case-studies"><strong>Case studies</strong></a> ·
  <a href="#agent-native-by-design"><strong>Agent</strong></a> ·
  <a href="#how-it-works"><strong>How it works</strong></a> ·
  <a href="./README.zh-CN.md"><strong>Chinese</strong></a>
</p>

<p align="center">
  <a href="https://github.com/fendouai/ViralForge/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" /></a>
  <img alt="Node" src="https://img.shields.io/badge/node-22.15%2B-5FA04E?style=flat-square" />
  <img alt="Agent native" src="https://img.shields.io/badge/agent--native-MCP%20%2B%20Skill-C9FF3D?style=flat-square" />
  <img alt="Status" src="https://img.shields.io/badge/status-v0.1.0-8E9088?style=flat-square" />
  <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-FF5A2B?style=flat-square" />
</p>

<p align="center">
  <img src="./docs/en/hero.jpg" alt="ViralForge turns a viral link into a Viral DNA report, then into an editable replica project and 10 costed variants" />
</p>

**ViralForge is an agent-native studio for viral short videos.** Paste a link or a local file and
get a **Viral DNA report** that deconstructs the video script: the hook, shot-by-shot structure,
word anchors, beat grid, caption style, emotional curve and conversion logic. Replace the product
and script, and ViralForge rebuilds the winning structure **in one click** as an editable VFML
project. Then generate **10 costed variants** for A/B testing. Not another black-box MP4.

**Keywords:** viral video replication · video script deconstruction · one-click video remix ·
AI agent · MCP server · VFML · FFmpeg · UGC ads · content repurposing

English is the default documentation language. Chinese documentation lives in
[README.zh-CN.md](./README.zh-CN.md). The v0.1 studio ships with Chinese-language demo fixtures; the
documentation and agent surfaces are English-first.

---

## Why ViralForge

Operators already deconstruct viral videos by hand: pause on the first three seconds, guess the
hook, note the shot rhythm, copy the caption, find the BGM, re-shoot with their product. It takes
hours, depends on taste, and the conclusion stays in one person's head.

The hard part is not editing. It is **not knowing what will work**. ViralForge turns that tacit
knowledge into a shareable, structured, editable asset — and makes the whole loop callable by an
agent.

| | Generic AI video | Template editors | ViralForge |
| --- | --- | --- | --- |
| Starting point | Prompt | Template | A real viral reference |
| Explains why it works | No | No | **Viral DNA report** |
| Deconstructs the script | No | No | **Hook, beats, word anchors, formula** |
| Output | Opaque MP4 | Fixed template | **Editable VFML project** |
| Scale | One at a time | Manual | **10 costed variants** |
| Agent-callable | Rarely | No | **Skill + MCP + CLI** |
| Product consistency | No | No | Reference-image lock per shot |

**Built for:** growth teams, UGC agencies, e-commerce brands, solo founders, and agent builders who
want a reproducible video workflow instead of a prompt lottery.

---

## Case studies

Three worked examples from the demo. Each shows the reference DNA, the replica script and the
variant matrix. The references are self-made simulations and the replica films are pre-rendered;
metrics are fixture values that demonstrate the report format, not customer results. Costs are CNY
demo estimates; the app does not bill.

| # | Case | Category | Hook | DNA score | Length · replica cost |
| --- | --- | --- | --- | --- | --- |
| 01 | [GLOW LAB](#case-01) | Beauty · serum | "Stop paying the stupid tax." | 92 | 15s · ¥1.86 |
| 02 | [AER](#case-02) | Fashion · tote | "Every bag that fits a 14-inch laptop looks like it's headed to a meeting." | 89 | 14s · ¥1.72 |
| 03 | [MORI](#case-03) | Home · lamp | "My landlord's beat-up rental? I fixed it for 30 yuan." | 94 | 13s · ¥1.64 |

<a name="case-01"></a>
### Case 01 · GLOW LAB: a 15s serum demo, rebuilt for a different product

[![GLOW LAB case dossier: reference hook, Viral DNA structure, replica script and 10 variants](./docs/en/case-glow.jpg)](./docs/en/case-glow.jpg)

**Reference:** Douyin · 15s · 96 BPM · 3.12M views · 187K likes · 41.2% completion · 78% 3s retention

**Hook:** "Stop paying the stupid tax." A counter-intuitive negation followed by outcome-first proof.

**What the DNA says**

- The first 0.8 seconds reject the viewer's last purchase, creating a "did I get it wrong?" tension.
  A skin-scanner close-up immediately turns the claim into visual evidence.
- The product does not appear until 0:05. The first five seconds sell the problem, not the bottle.
- Captions land about 0.2 seconds before the voice, so the viewer feels they know before they hear.
- The ending asks for a sample, not a sale. Lower decision cost, higher comment-section intent.

**Transferable formula:** negation → 3 concrete pains → one ingredient → 7-day proof → low-friction CTA.

**Replica script**

| Time | Line | Shot |
| --- | --- | --- |
| 0.0–2.4s | Stop layering ten bottles on your face. | Scanner close-up, hard light |
| 2.4–5.2s | Late nights, creasing, dull skin — it is not your foundation. | Three problem cuts |
| 5.2–8.2s | 5% niacinamide, micro-encapsulated for slow release. | Product enters, orbit shot |
| 8.2–11.6s | Day one. Day seven. | Split-screen comparison |
| 11.6–15s | Try a sample first. Then decide. | CTA, soft glow |

<details>
<summary><strong>All 10 variants and costs</strong> (total ¥4.34)</summary>

| # | Hook | Angle | Audience | Cost |
| --- | --- | --- | --- | --- |
| 01 | Stop paying the stupid tax | Counter-intuitive negation | Ingredient nerds | ¥0.42 |
| 02 | Up at 3am, look like you slept 8 hours | Result first | Night owls | ¥0.51 |
| 03 | The one ingredient your dermatologist won't mention | Authority + curiosity | Ingredient nerds | ¥0.38 |
| 04 | A ¥300 serum vs a ¥30 serum: what actually differs | Price contrast | Students | ¥0.46 |
| 05 | Creasing is not your foundation's fault | Attribution reversal | Dry skin | ¥0.33 |
| 06 | I put the skin scanner on my face. The result was... | Live test | Rational buyers | ¥0.55 |
| 07 | Seven days. I changed one thing. | Challenge log | Low-effort buyers | ¥0.49 |
| 08 | Sensitive skin? Read this before you buy | Risk warning | Sensitive skin | ¥0.36 |
| 09 | My boyfriend thought I got a treatment | Social proof | Dating | ¥0.44 |
| 10 | The 3-minute morning routine for early shifts | Scene efficiency | Commuters | ¥0.40 |

</details>

**[View the case dossier](./docs/en/case-glow.jpg)** · run `npm run dev` and pick GLOW LAB in the studio.

---

<a name="case-02"></a>
### Case 02 · AER: a 14s tote film, rebuilt around a 14-inch laptop

[![AER case dossier: reference hook, Viral DNA structure, replica script and 10 variants](./docs/en/case-tote.jpg)](./docs/en/case-tote.jpg)

**Reference:** Xiaohongshu · 14s · 112 BPM · 1.86M views · 121K likes · 38.6% completion · 74% 3s retention

**Hook:** "Every bag that fits a 14-inch laptop looks like it's headed to a meeting." Identity contrast
plus a specific number.

**What the DNA says**

- "14-inch laptop" is more credible than "large capacity". The viewer does not have to imagine; they
  only have to confirm their laptop fits.
- It says the stereotype out loud first — big bags look corporate — then breaks it. The contrast only
  works because the prejudice is acknowledged.
- Three macro shots carry the premium feel: vegetable-tanned leather, stitching, hardware.
- Three scenes map to three audiences, so the comments split into three camps and the engagement
  rate climbs.

**Transferable formula:** identity contrast → 3 scenes → material and pocket details → one bag, three
uses → color close.

**Replica script**

| Time | Line | Shot |
| --- | --- | --- |
| 0.0–2.6s | Every bag that fits a 14-inch laptop looks like it's headed to a meeting. | Laptop into bag, top-down |
| 2.6–5.4s | Until I carried this one. Commute. Travel. School run. | Three-scene montage |
| 5.4–8.4s | One piece of vegetable-tanned leather. Softer every week. | Leather macro, side light |
| 8.4–11.4s | 13 pockets, plus a dedicated laptop sleeve. | Pocket layout, hands |
| 11.4–14s | Three colors. Walk out the door. | Three-color lineup |

<details>
<summary><strong>All 10 variants and costs</strong> (total ¥4.21)</summary>

| # | Hook | Angle | Audience | Cost |
| --- | --- | --- | --- | --- |
| 01 | Fits a 14-inch laptop. Still doesn't look like the office. | Identity contrast | Commuters | ¥0.44 |
| 02 | The only commuter bag I kept | Minimal choice | Minimalists | ¥0.35 |
| 03 | 13 pockets. No more digging for keys. | Detail pain | Organizers | ¥0.39 |
| 04 | Three days away. One bag. | Scene efficiency | Travelers | ¥0.47 |
| 05 | Parenthood made my bag smaller | Identity reversal | Parents | ¥0.43 |
| 06 | Vegetable-tanned leather that ages with you | Material story | Texture seekers | ¥0.52 |
| 07 | Petite frame, big bag. No shrinking. | Body concern | Petite buyers | ¥0.38 |
| 08 | I wore it to an interview. They thought it cost more. | Social proof | New grads | ¥0.46 |
| 09 | Rainy day. Laptop still dry. | Risk scene | Rainy commuters | ¥0.41 |
| 10 | One bag. Three ways to carry. | Versatility | Practical buyers | ¥0.36 |

</details>

**[View the case dossier](./docs/en/case-tote.jpg)** · run `npm run dev` and pick AER in the studio.

---

<a name="case-03"></a>
### Case 03 · MORI: a 13s rental makeover, rebuilt for a 30-yuan lamp

[![MORI case dossier: reference hook, Viral DNA structure, replica script and 10 variants](./docs/en/case-lamp.jpg)](./docs/en/case-lamp.jpg)

**Reference:** Douyin · 13s · 72 BPM · 4.29M views · 263K likes · 44.1% completion · 81% 3s retention

**Hook:** "My landlord's beat-up rental? I fixed it for 30 yuan." Price contrast plus a renovation
story.

**What the DNA says**

- "Landlord's rental" is instant identity. "30 yuan" is the price hook. "I fixed it" is the result
  promise. Three pieces of information in one sentence.
- Turning the light off and on is a native before/after. No filter, no set design — the switch is the
  strongest visual evidence in the home category.
- The price appears in the hook, not the CTA. The earlier the price, the more it feels like sharing
  rather than advertising.
- It sells ten minutes before sleep, not three brightness levels. People remember the feeling, not the
  spec sheet.

**Transferable formula:** price contrast → off/on proof → 3 concrete features → pre-sleep scene →
low-ticket CTA.

**Replica script**

| Time | Line | Shot |
| --- | --- | --- |
| 0.0–2.2s | My landlord's beat-up rental. I fixed it for 30 yuan. | Wide, cold light |
| 2.2–4.8s | One lamp. Lights off. Lights on. | Switch moment, warm light |
| 4.8–8.0s | Three warm levels, stepless dimming, a timer. | Feature macro, hands |
| 8.0–10.8s | Ten minutes before bed, the room goes quiet first. | Bedside scene, slow push |
| 10.8–13s | 30 yuan. Start with the mood. | Still life, glow |

<details>
<summary><strong>All 10 variants and costs</strong> (total ¥4.10)</summary>

| # | Hook | Angle | Audience | Cost |
| --- | --- | --- | --- | --- |
| 01 | 30 yuan turned my rental into a showroom | Price contrast | Renters | ¥0.40 |
| 02 | Day 7 without the big light. The bill moved. | Result log | Solo dwellers | ¥0.45 |
| 03 | Ten minutes before sleep, the room goes quiet | Emotional scene | Insomniacs | ¥0.37 |
| 04 | My landlord won't let me paint. I bought this. | Constraint reversal | Renters | ¥0.42 |
| 05 | Every woman living alone needs one warm light | Identity call | Women living alone | ¥0.39 |
| 06 | No filter. It's the lamp. | Result proof | Photo takers | ¥0.48 |
| 07 | Three light levels, three moods | Feature visualization | Ambience seekers | ¥0.34 |
| 08 | Even in a shared flat, you get your own corner | Space pain | Shared renters | ¥0.41 |
| 09 | I gave it to a friend. She thought it was 300. | Social proof | Gift buyers | ¥0.46 |
| 10 | The moment the big light goes off, work leaves | Emotional release | Office workers | ¥0.38 |

</details>

**[View the case dossier](./docs/en/case-lamp.jpg)** · run `npm run dev` and pick MORI in the studio.

---

## Agent-native by design

ViralForge is not a UI with an API bolted on. The whole studio is an agent toolchain: a Skill that
teaches the workflow, an MCP server that exposes the tools, a CLI that executes locally, and
machine-readable artifacts at every step.

**Use it from Claude Code, Codex, Cursor, OpenClaw, or any MCP client.**

| Surface | What the agent gets | Entry point |
| --- | --- | --- |
| **Skill** | Workflow rules, output style, guardrails | [`skills/viralforge/SKILL.md`](./skills/viralforge/SKILL.md) |
| **MCP** | `list_cases`, `get_case`, `analyze_video`, `build_project` | [`mcp/server.mjs`](./mcp/server.mjs) |
| **CLI** | Deterministic local analysis and reports | `viralforge analyze / report / render` |
| **Artifacts** | DNA JSON, VFML project, variants CSV, cost ledger | `dna.json`, `project.vfml.json` |

### One agent session

```text
> Use ViralForge on ./reference.mp4. Keep the structure, rebuild it for my serum, and give me 10 variants.

get_case glow                  -> hook + transferable formula (curated demo DNA)
analyze_video ./reference.mp4  -> 6 shots · 96 BPM · 2.3s average shot
build_project glow             -> project.vfml.json · 6 shots · 14 word anchors
                                  10 variants · ¥4.34 estimated
```

The agent can inspect the DNA, decide what to keep, rewrite the script, lock the product across
shots, mark dirty shots, and export the variant matrix. No browser automation, no screen-scraping.

_Abridged example using the demo case. The demo's semantic DNA is curated; structural analysis is
computed locally._

### Install the Skill

```bash
mkdir -p .claude/skills
cp -R skills/viralforge .claude/skills/viralforge
```

Then ask your agent: *"Use the viralforge skill to deconstruct ./reference.mp4 and rebuild it for my
product."*

### MCP server

```json
{
  "mcpServers": {
    "viralforge": {
      "command": "node",
      "args": ["/absolute/path/to/viralforge/mcp/server.mjs"]
    }
  }
}
```

### CLI

```bash
viralforge analyze ./reference.mp4 --out dna.json
viralforge report dna.json
viralforge cases
viralforge render glow
```

---

## Quickstart

```bash
git clone https://github.com/fendouai/ViralForge.git
cd ViralForge
npm install
npm run doctor      # optional: check local prerequisites
npm run dev         # http://127.0.0.1:5173
```

Open the studio, pick one of the three cases, and walk the flow: **Deconstruct → Replicate → 10
variants**. The demo runs on pre-rendered, self-made assets. Structural analysis (shot cuts, BPM,
pacing) is computed locally and is real. No model or platform API key is required.

```bash
npm run build
npm run preview      # http://127.0.0.1:4173
npm run render       # re-render the three demo films (FFmpeg + dev server)
```

Analyze your own local video without an API key (FFmpeg, Python 3.9+, `numpy`,
`opencv-python-headless`):

```bash
node cli/viralforge.mjs analyze ./reference.mp4 --out dna.json
node cli/viralforge.mjs report dna.json
```

> Prefer local uploads. Downloading platform videos may violate their terms; ViralForge never
> redistributes the reference footage.

### Requirements

| Requirement | Needed? | Used for |
| --- | --- | --- |
| Node.js 22.15+ | Yes | web app, build |
| npm | Yes | install |
| FFmpeg + ffprobe | Optional | re-render, media checks, CLI analysis |
| Python 3.9+ / numpy / opencv-python-headless | Optional | `viralforge analyze` |
| Chromium (Playwright) | Optional | `npm run render`, E2E tests |
| Model / platform API keys | No | — |

The app never reads `OPENAI_API_KEY`, `DASHSCOPE_API_KEY`, platform cookies, or any `VITE_*` secret.
Setup and troubleshooting: [`docs/en/LOCAL-SETUP.md`](./docs/en/LOCAL-SETUP.md).

---

## How it works

<p align="center">
  <img src="./docs/en/pipeline.jpg" alt="ViralForge pipeline: paste a link, deconstruct the script, keep the DNA, one-click rebuild, ship 10 variants" />
</p>

### 01 · Deconstruct — free, offline

Shot cuts (OpenCV / PySceneDetect), word-level alignment (WhisperX, optional), BGM beat detection
(librosa in the full pipeline), multimodal annotation. Output: hook, rhythm curve, caption style,
beat anchors, emotional curve, conversion lines — plus a **shareable report card** and `dna.json`.

### 02 · Replicate — one-click rebuild

Keep the structure; replace the product, script, voice and licensed avatar. Shots are anchored to
**words, not seconds**. Reference images lock the product across shots. Output is a `project.json`
(VFML) plus assets, subtitles and a shot list — not only an MP4.

### 03 · Variants — scale

One command, 10 versions across hook × audience × scene. Only dirty shots are regenerated, rendering
is parallelized per shot, and every variant carries a model / shot / time / cost ledger.

---

## VFML: word-anchored video projects

Words are the anchor; seconds are a result. Change a line and shots, captions and voice re-flow
together.

```json
{
  "version": "0.1",
  "meta": {
    "title": "Overnight skin, 7-day glow",
    "ratio": "9:16",
    "duration": 15,
    "aiDisclosure": true
  },
  "productRefs": [{ "id": "serum", "lock": ["logo", "color", "shape"] }],
  "words": [
    { "text": "Stop", "start": 0.2, "end": 0.6 },
    { "text": "paying the stupid tax", "start": 0.6, "end": 1.1 }
  ],
  "shots": [
    {
      "id": "s1",
      "wordRange": [0, 3],
      "visual": "scanner-closeup",
      "productRef": "serum",
      "caption": "Stop paying the stupid tax.",
      "dirty": false
    }
  ],
  "render": { "engine": "ffmpeg", "fps": 30, "parallelism": 4 }
}
```

`dirty` marks the shots that need regeneration. That is what keeps 10 variants affordable. The project
file is diffable, reviewable, and portable between the open-source renderer and the hosted worker.

---

## Open source vs cloud

| Capability | Open source | WearAI Cloud |
| --- | --- | --- |
| Skill / CLI / MCP | Yes | — |
| Deconstruct engine + report format | Yes | batch, multilingual |
| FFmpeg composition pipeline | Yes | hosted render queue |
| Reference-image product lock | Yes, template constraint | consistency model |
| Small local batches | Yes | large batches, cost optimization |
| Category recipes / template library | No | Yes, 8 categories |
| Hosted models | bring your own key | 33 hosted models |
| Character consistency | No | Yes |
| Team spaces / billing | No | Yes |

The cloud side is where replication and batch generation become a paid product. The open-source side
is the free, shareable entry point.

---

## Compliance

- Replicate **structure and rhythm**, not footage, music or the original script.
- Reference footage is analyzed only; it never enters the output.
- **No face swap.** Only the user's own or licensed avatars.
- Every output carries an explicit on-frame and metadata **AI-generated** label.
- Demo stills are self-made simulations; BGM is synthesized locally.
- Prefer local uploads; platform terms are respected.

See [`docs/en/COMPLIANCE.md`](./docs/en/COMPLIANCE.md) for the full safety notes.

---

## Repository layout

```text
src/                  Web studio (Vite + React + TS)
src/render/           Film render template (DOM -> frames)
scripts/              analyze.py, make_audio.py, render-cases.mjs
public/media/         Three rendered films + covers
cli/                  viralforge CLI
mcp/                  MCP stdio server
skills/viralforge/    Agent Skill
tests/                E2E, media, MCP tests
docs/                 PLAN, IMPLEMENTATION, OPEN-QUESTIONS
docs/en/              English docs, README artwork, social preview
```

## Test

```bash
npm run typecheck
npm run build
npm run test        # Playwright E2E
npm run test:media  # ffprobe checks on the three films
npm run test:mcp    # MCP handshake, tools/list, tools/call
npm run test:readme # English README, artwork and metadata checks
```

## Demo script

A 3-minute click path with what to say on each beat is in [`docs/en/DEMO.md`](./docs/en/DEMO.md).
The README artwork can be regenerated with `npm run docs:images` (Playwright).

## Status and roadmap

**v0.1.0 · MVP.** The demo's semantic insights are curated, the replica films are pre-rendered, and
batch variants produce scripts, covers and cost estimates. Model calls and batch rendering require a
key or a worker. Everything else — the studio, analysis CLI, report pages, VFML export and cost ledger
— runs end to end.

- [x] Deconstruct, replicate and batch-variant flow
- [x] Skill + MCP + CLI surfaces
- [x] Three worked demo cases with 10 variants each
- [x] Editable VFML export and cost ledger
- [ ] English studio UI (the demo ships with Chinese-language fixtures today)
- [ ] WhisperX word alignment and multimodal annotation
- [ ] Provider adapters for video, image and TTS models
- [ ] Hosted render queue and team spaces

Known limits: platform link download is intentionally not implemented; local uploads only. No face
swap. AI-generated labels are always on. The open-source demo's semantic layer is curated, not a
live model output.

## Open-source release

- **Version:** v0.1.0 · 2026-11-11
- **License:** Apache-2.0
- **Repository:** `fendouai/ViralForge`
- [CHANGELOG](./CHANGELOG.md) · [Release notes](./docs/RELEASE-NOTES-v0.1.0.md) · [Releasing guide](./docs/RELEASING.md)
- [Contributing](./CONTRIBUTING.md) · [Security](./SECURITY.md) · [Code of Conduct](./CODE_OF_CONDUCT.md)

The release archive is built with `npm run release:archive` and contains the tracked source (no
`node_modules`, no build output).

## Contributing

Issues and PRs are welcome. Start with [`CONTRIBUTING.md`](./CONTRIBUTING.md); run `npm run doctor`
and the test commands before opening a PR. No face swap, no unlicensed footage, no secrets in the
client.

If ViralForge saves you time, a star helps more builders find it.

[![GitHub stars](https://img.shields.io/github/stars/fendouai/ViralForge?style=social)](https://github.com/fendouai/ViralForge)

## License

Apache-2.0. See [LICENSE](./LICENSE).

### A note on prior art

ViralForge does **not** include or derive from Hypit code. Hypit's custom license restricts
multi-tenant SaaS and commercial redistribution; we only adopt the publicly discussed idea of
word-anchored video authoring, with our own implementation. No AGPL dependencies. Remotion and
HyperFrames are intentionally not used; the renderer is Playwright + FFmpeg so commercial licensing
can be reviewed separately.

---

<p align="center"><em>Clone the structure. Not the footage.</em></p>
