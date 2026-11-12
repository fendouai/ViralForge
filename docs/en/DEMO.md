# 3-minute demo script

> Goal: in three minutes, make the viewer understand **deconstruct -> replicate -> 10 variants** and
> remember **free deconstruction, paid replication**.
> The demo needs no model key; every asset loads locally.

The current studio is Chinese-first. This script refers to controls by function rather than by label;
run it against the local build and match the layout.

The English demo cuts live in `public/media/en/`; the Chinese cuts live in `public/media/`. The
click-to-play README posters are in `docs/en/demo-*.jpg`.

## 0. Thirty seconds before the demo

```bash
npm install
npm run build
npm run preview     # http://127.0.0.1:4173
npm run render:en   # optional: re-render the English cuts
```

Check:

- the three case cards on the home page autoplay;
- the film on `#/case/glow` plays;
- the studio deconstruct progress finishes (about five seconds).

If the network is unreliable, stay on local URLs and do not open platform links. The case cards and
films are local.

## 1. Timeline

| Time | Action | What to say |
| --- | --- | --- |
| 0:00–0:20 | Open the home page | "Brands make a lot of video every day. The hard part is not editing; it is not knowing what will work. ViralForge deconstructs first, then replicates." |
| 0:20–0:40 | Open the first case, GLOW LAB | "This is a 15-second winner. We are not reviewing whether it is good; we are deconstructing why it holds attention." |
| 0:40–1:10 | Let the studio run; the report appears | "The first 2.4 seconds hold with a counter-intuitive negation. The product only appears at 0:05. Five structure segments, six shots, 96 BPM. Deconstruction calls no generation model, so the marginal cost is almost zero." |
| 1:10–1:25 | Open the shareable report card | "The output is a shareable report card. This is the distribution entry point." |
| 1:25–2:00 | Enter Replicate, edit the third shot caption, apply | "Keep the structure, replace the content. Words are the anchor: change one line and the timeline re-flows. Only this shot is regenerated, so the cost rises by 0.18." |
| 2:00–2:20 | Export VFML | "The output is an editable project, not a black-box MP4. A team can diff it and reuse it." |
| 2:20–2:45 | Enter Batch variants and generate 10 | "One command, 10 versions across hooks, audiences and scenes, each with a cost. Total cost 4.34, estimated 3 minutes 12 seconds." |
| 2:45–3:00 | Switch to GitHub and the docs | "Skill + MCP + CLI are open source; the cloud keeps models, templates and product consistency. Free deconstruction, paid replication on WearAI." |

## 2. Three lines to land

1. **"We are not another generator. We explain why the video works first."**
2. **"The output is an editable project, not an MP4 you cannot change."**
3. **"Free deconstruction, paid replication; open source for reach, cloud for scale."**

## 3. One line per case

| Case | One line | Structure |
| --- | --- | --- |
| GLOW LAB, beauty | "Stop paying the stupid tax" -> 7-day before/after | Counter-intuitive negation -> 3 pains -> one ingredient -> comparison -> sample |
| AER, bags | "Fits a 14-inch laptop, does not look like the office" | Identity contrast -> 3 scenes -> material details -> one bag, three uses |
| MORI, home | "30 yuan turned my rental into a showroom" | Price contrast -> off/on proof -> 3 features -> pre-sleep scene |

## 4. Likely questions

**Q: Is this a copycat tool?**
A: It replicates structure and rhythm, not footage, music or the original script. It does no face
swap, and every output carries an AI-generated label. The reference is analyzed only; it never enters
the output.

**Q: How is this different from Hypit?**
A: Hypit focuses on an agent generation workflow. ViralForge moves the entry point earlier with free
deconstruction and a shareable report, then adds product consistency and a 10-variant cost ledger. The
projects share no code.

**Q: Why is deconstruction free?**
A: It runs video understanding, not generation, so the marginal cost is near zero. It is the
distribution and acquisition entry point. Replication and batch variants need models and compute.

**Q: Can it generate video now?**
A: The demo films are pre-rendered assets; structural analysis is real. Connect a model key and the
same VFML and render pipeline can switch to live generation. We do not present fixtures as live model
output.

**Q: How are the 10 variant costs calculated?**
A: Shots generated x model unit price, listed per variant and in the ledger. The demo environment
incurs no real model cost.

## 5. Five-minute extended version

- Open `#/report/glow` and explain the five-axis radar and the transferable formula.
- Open `#/case/tote` and explain that the reference stills are self-made simulations and the original
  footage is not redistributed.
- Open `#/docs` and explain the open-source / cloud boundary and VFML.
- Run `node cli/viralforge.mjs analyze public/media/glow.mp4` and show that five shots and 96 BPM are
  computed locally.
- Show the four tools in `mcp/server.mjs` and explain that any MCP client can connect.

## 6. After the demo

- Send the report-card link and the home-page screenshot.
- Send one 15-second film and three variant covers.
- Ask which category the audience wants deconstructed next; ship a Top 50 teardown next.
