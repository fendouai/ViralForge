# 本地运行与外部 Key

## 结论：不需要任何外部 Key

ViralForge 的 v0.1 demo **零 Key 可运行**：

- 3 条成片已随仓库提供（`public/media/*.mp4`）；
- 拆解报告、工作台、变体、成本账单都是本地前端状态；
- 结构分析 CLI 用 OpenCV + numpy 本地计算，不联网；
- 不读取 OpenAI / Anthropic / 可灵 / 即梦 / 抖音 / 小红书 的任何 Key。

`npm run doctor` 会明确打印「外部 API Key：不需要」。

## 最低依赖

| 依赖 | 是否必需 | 用途 |
| --- | --- | --- |
| Node.js 22.15+ | ✅ 必需 | Web 应用 / 构建 |
| npm | ✅ 必需 | 安装依赖 |
| FFmpeg + ffprobe | ○ 可选 | 重新渲染成片、媒体校验、CLI 分析 |
| Python 3.9+ | ○ 可选 | `viralforge analyze` 本地结构分析 |
| numpy + opencv-python | ○ 可选 | 同上（`pip install -r scripts/requirements.txt`） |
| Chromium（Playwright） | ○ 可选 | `npm run render` 逐帧渲染、E2E 测试 |
| 任何模型 / 平台 API Key | ❌ 不需要 | — |

## 启动

```bash
git clone <repo> viralforge
cd viralforge
npm install
npm run doctor      # 可选：检查本机依赖
npm run dev         # http://127.0.0.1:5173
```

构建后本地预览（更接近部署状态）：

```bash
npm run build
npm run preview     # http://127.0.0.1:4173
```

## 可选能力怎么开

**重新渲染 3 条成片**（需要 FFmpeg + Chromium）：

```bash
# 终端 A
npm run dev
# 终端 B
npm run render
```

**分析自己的本地视频**（需要 FFmpeg + Python + numpy + OpenCV）：

```bash
pip install -r scripts/requirements.txt
node cli/viralforge.mjs analyze ./reference.mp4 --out dna.json
node cli/viralforge.mjs report dna.json
```

**跑测试**（需要 Chromium）：

```bash
npx playwright install chromium
npm test
npm run test:media
npm run test:mcp
```

## 以后接真实模型时才需要 Key

当前没有实现模型调用。未来接真实生成时，Key 只应存在于服务端 / 本地 worker，
不要写进前端：

- 视频生成：Seedance / 可灵 / Wan2.2 等 provider；
- 图像：Flux / GPT Image / Seedream；
- ASR：WhisperX（可本地跑，无需 Key）；
- 平台链接下载：优先本地上传，避免平台条款风险。

在 provider adapter 落地前，**不要**把任何 Key 写进 `.env` 或 `VITE_*`：
前端环境变量会被打包进浏览器产物，等于公开。

## 常见问题

**`npm install` 提示 esbuild install script 未批准？**
Node 26 的 npm 会拦截安装脚本；本项目已能正常构建。若构建失败，运行 `npm rebuild esbuild`。

**端口被占用？**
`npm run dev -- --port 5174` 或 `npm run preview -- --port 4174`。

**没有声音？**
浏览器默认静音自动播放；点视频控件打开声音即可，或直接播放 `public/media/*.mp4`。

**需要公网链接？**
本地 demo 不需要。要公网部署时，静态站点可放 Vercel / Cloudflare Pages；
重新渲染需要独立 Node + FFmpeg + Chromium worker，不能跑在纯静态托管上。
