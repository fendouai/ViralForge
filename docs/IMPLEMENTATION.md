# ViralForge 实现说明

> 对应方案：`docs/PLAN.md`。本文记录 MVP 实际做了什么、哪些是真实计算、哪些是演示资产，以及如何验证。

## 1. 已交付

| 模块 | 状态 | 说明 |
| --- | --- | --- |
| Web 工作台 | ✅ | 首页、三步工作台、报告页、案例页、文档页 |
| 拆解（结构层） | ✅ 真实计算 | OpenCV 镜头切分 + numpy 节拍/能量 + ffprobe |
| 拆解（语义层） | ✅ 预置样例 | 钩子、话术、情绪、可迁移公式；真实接入需 WhisperX/多模态模型 |
| 复刻 | ✅ 演示 + 可编辑工程 | VFML 时间轴、字幕编辑、dirty 标记、成本变化、JSON 导出 |
| 批量变体 | ✅ 脚本/封面/成本 | 10 条变体、维度切换、CSV 导出；视频渲染需模型/worker |
| 3 条成片 | ✅ 本地渲染 | 720×1280 / 30fps / H.264 + AAC，自制 BGM |
| Skill / CLI / MCP | ✅ | CLI 真实跑本地分析；MCP 可直接握手调用 |
| 报告页 | ✅ | 独立 hash 路由，可分享；DNA JSON 可下载/复制 |
| 测试 | ✅ | Playwright E2E + ffprobe 媒体校验 + MCP 握手测试 |

## 1.1 零 Key 运行

本地 demo 不读取任何模型 / 平台 Key；3 条成片随仓库提供，结构分析在本地完成。
`npm run doctor` 可检查依赖并打印「外部 API Key：不需要」。

## 2. 技术栈

- Vite 7 + React 19 + TypeScript，手写 CSS，无 UI 框架。
- hash 路由，构建产物可直接静态托管（Vercel / Cloudflare Pages / GitHub Pages）。
- 视频渲染：独立 HTML 模板 `render.html` + React；Playwright 逐帧截图；FFmpeg 编码。
- 音频：`scripts/make_audio.py` 用 numpy 合成三条 BGM，无外部采样。
- 拆解 CLI：`scripts/analyze.py`（OpenCV + numpy + ffprobe），不依赖模型 Key。
- 不引入 Remotion / HyperFrames，规避商业授权确认；不引入任何 AGPL 依赖。

## 3. 渲染管线

```
npm run dev                     # Vite 提供 /render.html
node scripts/render-cases.mjs   # 逐 case：
  Chromium 720×1280
  → window.__setTime(t)
  → 2× requestAnimationFrame
  → screenshot(frame-%04d.png)
  → ffmpeg -framerate 30 -i frames -i audio.wav
  → public/media/<id>.mp4 + <id>-cover.jpg
```

每条成片 13–15 秒、390–450 帧。脚本会自动清理临时帧目录。

## 4. 真实 vs 演示

**真实：**

- 成片是本地真实渲染的 MP4，可播放、有音轨、有 AI 标识；
- CLI 对任意本地视频做镜头切分、节拍、能量、分辨率/时长分析；
- 工作台的进度日志、报告、时间轴、变体、成本、导出均为真实前端状态；
- `dna.json` / `project.json` / `variants.csv` 是真实可下载文件；
- 报告页、案例页、分享链接可独立访问。

**演示（明确标注）：**

- 语义洞察（钩子类型、情绪、话术）为预置内容；
- 复刻成片是预渲染资产，不是按用户输入实时生成；
- 批量变体生成脚本/封面/成本，不实时渲染 10 条视频；
- 链接输入映射到 3 个预置案例，不抓取平台视频。

工作台在成本账单、变体页、案例页均写明了这些边界。

## 5. 自测结果

最近一次：类型检查 / 构建通过；E2E **21/21**；3 条成片媒体校验 **18/18**；MCP 4 项通过。

```bash
npm run typecheck   # 通过
npm run build       # 通过，dist 可静态部署
npm run test        # Playwright E2E
npm run test:media  # ffprobe 校验
npm run test:mcp    # MCP 握手 / tools/list / tools/call
```

测试脚本使用本机缓存的 Chromium（自动探测 1254/1223/1194 与系统 Chrome），
不要求重新下载浏览器。

## 6. 已知限制

- 没有模型 Key，因此不做真实生成；接入后同一套 VFML 可切换。
- 未接入 WhisperX，词级时间戳为预置数据；CLI 输出 `transcript: null` 并注明。
- 平台链接抓取未实现，遵守平台条款，优先本地上传。
- 公网部署需要 Vercel/Cloudflare 凭据；当前只保证本地 URL。
- 商品一致性目前是模板/参考图约束的工程占位，不是模型级一致性。

## 7. 目录

```
src/                Web 应用
src/render/         成片渲染模板
scripts/            音频合成、逐帧渲染、结构分析
public/media/       3 条成片与封面
cli/                viralforge CLI
mcp/                MCP stdio server
skills/viralforge/  Agent Skill
tests/              E2E / 媒体 / MCP
docs/               方案、实现、待确认
```
