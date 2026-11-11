# Local setup and API keys

## Short version: no external keys

The v0.1 demo runs with **zero API keys**:

- Three rendered films ship in the repository (`public/media/*.mp4`).
- The DNA report, studio, variants and cost ledger are local front-end state.
- The structural-analysis CLI computes shot cuts, BPM and pacing locally with OpenCV + numpy; it does
  not call the network.
- The app never reads OpenAI, Anthropic, Kling, Jimeng, Douyin or Xiaohongshu credentials.

`npm run doctor` reports that no external API key is required.

## Minimum requirements

| Requirement | Needed? | Used for |
| --- | --- | --- |
| Node.js 22.15+ | Yes | web app, build |
| npm | Yes | install |
| FFmpeg + ffprobe | Optional | re-render films, media checks, CLI analysis |
| Python 3.9+ | Optional | `viralforge analyze` local structural analysis |
| numpy + opencv-python-headless | Optional | same as above (`pip install -r scripts/requirements.txt`) |
| Chromium (Playwright) | Optional | `npm run render` frame capture, E2E tests |
| Any model / platform API key | No | — |

## Start

```bash
git clone https://github.com/fendouai/ViralForge.git viralforge
cd viralforge
npm install
npm run doctor      # optional: check local prerequisites
npm run dev         # http://127.0.0.1:5173
```

Build and preview locally (closer to a deployment):

```bash
npm run build
npm run preview     # http://127.0.0.1:4173
```

## Optional capabilities

**Re-render the three demo films** (FFmpeg + Chromium):

```bash
# terminal A
npm run dev
# terminal B
npm run render
```

**Analyze your own local video** (FFmpeg + Python + numpy + OpenCV):

```bash
pip install -r scripts/requirements.txt
node cli/viralforge.mjs analyze ./reference.mp4 --out dna.json
node cli/viralforge.mjs report dna.json
```

**Run the tests** (Chromium):

```bash
npx playwright install chromium
npm test
npm run test:media
npm run test:mcp
```

## Keys are only needed when you connect real models

Model calls are not implemented in v0.1. When you connect a real provider, the key must live in a
server-side worker, never in the front end:

- Video generation: Seedance, Kling, Wan2.2 and similar providers.
- Images: Flux, GPT Image, Seedream.
- ASR: WhisperX (runs locally, no key required).
- Platform link ingestion: prefer local uploads to avoid platform-terms risk.

Until a provider adapter exists, do **not** put keys in `.env` or `VITE_*` variables. Front-end
environment variables are bundled into the browser payload, which makes them public.

## FAQ

**`npm install` warns that the esbuild install script was not approved?**
Some npm versions block install scripts. The project still builds; if not, run `npm rebuild esbuild`.

**Port already in use?**
Run `npm run dev -- --port 5174` or `npm run preview -- --port 4174`.

**No sound?**
Browsers autoplay muted. Use the video controls to turn sound on, or play `public/media/*.mp4`
directly.

**Need a public URL?**
The local demo does not. For a public deployment, the static site can live on Vercel or Cloudflare
Pages; re-rendering needs a separate Node + FFmpeg + Chromium worker and cannot run on pure static
hosting.
