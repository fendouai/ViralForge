# Compliance and safety notes

ViralForge replicates **structure**, not creative assets. These rules are product requirements, not
optional advice.

## What the open-source demo does

- Analyzes a local reference the user owns or has permission to use.
- Extracts structural signals: shot cuts, pacing, word anchors, beat grid, hook type and a
  transferable formula.
- Rebuilds the structure with a different product, script, voice and licensed avatar.
- Labels every output, on frame and in metadata, as AI-generated.
- Uses self-made reference stills and locally synthesized BGM in the demo.

## What it does not do

- It does not download or redistribute platform footage.
- It does not copy the original footage, music or script into the output.
- It does not perform face swaps. Only the user's own or licensed avatars are allowed.
- It does not hide AI generation. The label is always on.
- It does not store model or platform credentials in the browser bundle.

## Reference footage

Prefer local uploads. Downloading platform videos may violate their terms. The open-source pipeline
never needs to redistribute a reference file: it reads the file, extracts structure, and writes a DNA
document. The reference never enters the replica.

## AI disclosure

Every rendered output carries:

- a visible on-frame label;
- metadata marking the asset as AI-generated;
- a cost and model ledger for auditability.

## Product and character consistency

Reference images constrain logo, color and shape on shots that show the product. The open-source
version provides a template-level constraint; the hosted product provides a learned consistency model.
Do not use reference images you do not have rights to.

## Model keys

When real providers are connected, keys belong in a server-side worker. Never add `VITE_*` secrets:
front-end environment variables are shipped to the browser. See
[LOCAL-SETUP.md](./LOCAL-SETUP.md).

## Reporting a concern

Open a security report through [`SECURITY.md`](../../SECURITY.md) for vulnerabilities. For a content
or compliance concern, open an issue with the case id and a description; do not attach unlicensed
footage.

This document is a product safety summary, not legal advice. Platform terms and local law govern how
you may use a reference.
