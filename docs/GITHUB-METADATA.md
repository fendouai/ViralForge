# GitHub repository metadata

Use these values in **Settings → General** and the **About** panel so the repository reads
consistently with the README. GitHub does not store the description or topics in the repository, so
they have to be applied in the UI (or with `gh repo edit`).

## Description

> Agent-native viral video studio: one-click replicate viral short videos, deconstruct the hook and
> script into a Viral DNA report, and ship 10 costed variants. Skill + MCP + CLI. Apache-2.0.

Shorter alternative (for places with tight limits):

> One-click replicate viral short videos, deconstruct the script, and ship 10 costed variants.
> Agent-native: Skill + MCP + CLI.

## Topics

```text
viral-video
viral-video-replication
short-video
video-script
video-script-deconstruction
one-click-replication
video-remix
video-editing
ai-agent
ai-agents
agent-native
mcp
mcp-server
claude-code
ffmpeg
video-generation
ugc
ugc-ads
content-repurposing
viral-marketing
```

GitHub allows up to 20 topics; the list above is exactly 20.

## Apply with GitHub CLI

```bash
gh repo edit fendouai/ViralForge \
  --description "Agent-native viral video studio: one-click replicate viral short videos, deconstruct the hook and script into a Viral DNA report, and ship 10 costed variants. Skill + MCP + CLI. Apache-2.0." \
  --homepage "https://github.com/fendouai/ViralForge" \
  --add-topic viral-video,viral-video-replication,short-video,video-script,video-script-deconstruction,one-click-replication,video-remix,video-editing,ai-agent,ai-agents,agent-native,mcp,mcp-server,claude-code,ffmpeg,video-generation,ugc,ugc-ads,content-repurposing,viral-marketing
```

## Social preview

Upload `docs/en/social-preview.jpg` (1280x640) as the repository social preview image. It contains the product one-liner,
the Viral DNA report and the "10 variants" claim in English.

## About checklist

- [ ] Description applied
- [ ] Website set to the repository URL
- [ ] Topics applied (max 20)
- [ ] Social preview uploaded
- [ ] Releases pinned in the sidebar
- [ ] `README.md` is the default English landing page
- [ ] `README.zh-CN.md` is linked from the language switcher
