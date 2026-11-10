<p align="center">
  <img src="./docs/wordmark.svg" alt="ViralForge" width="420" />
</p>

<h3 align="center">贴个链接，把爆款拆开。</h3>

<p align="center">
  <a href="#快速开始">快速开始</a> ·
  <a href="#三层能力">三层能力</a> ·
  <a href="#开源与云端">开源与云端</a> ·
  <a href="./README.md">English</a>
</p>

> 贴一个爆款视频链接 → 拆出「爆款基因报告」→ 用你的产品和脚本复刻 → 得到可编辑工程，而不是一条黑盒 MP4 → 批量出 10 个标好成本的变体。

ViralForge 是一个 Agent-native 的短视频拆解与复刻工作台。它不教你「怎么剪」，而是先回答
「为什么这条会火」，再把结构变成可编辑、可复用、可规模化的资产。

**当前为 MVP demo：三条成片为本地真实渲染，结构分析真实计算；语义洞察为预置样例，批量变体产出脚本/封面/成本，视频渲染需接入模型或云端 worker。**

![ViralForge 首页](./docs/home.png)

## 为什么

商家和运营每天都在手工拆解爆款：暂停在前 3 秒、猜钩子、记镜头、抄文案、找 BGM、用自己的产品翻拍。
耗时、依赖经验，结论还留在个人脑子里。最大的问题不是「不会剪」，而是「不知道什么会火」。

| | 通用 AI 视频 | 模板剪辑 | ViralForge |
| --- | --- | --- | --- |
| 起点 | 提示词 | 模板 | 一条真实爆款 |
| 解释为什么火 | 否 | 否 | **爆款基因报告** |
| 产物 | 黑盒 MP4 | 固定模板 | **可编辑 VFML 工程** |
| 规模 | 一条条做 | 手动 | **10 条带成本变体** |
| 商品一致性 | 否 | 否 | 逐镜参考图锁定 |

## 三层能力

1. **拆解（免费、可离线）**：镜头切分、词级对齐、BPM、多模态标注；输出钩子、节奏、字幕、
   卡点、情绪、话术、可迁移公式，以及可分享报告卡和 `dna.json`。
2. **复刻（付费入口）**：保留结构，替换产品、脚本、配音、授权数字人；以词为锚点重排；
   商品参考图锁每个镜头；输出 VFML 工程 + 素材 + 字幕 + 分镜表 + MP4。
3. **批量变体**：一条命令 10 个版本，只重生成 dirty 镜头，镜头级并行，每条标成本。

## 快速开始

```bash
npm install
npm run dev          # http://127.0.0.1:5173
npm run build
npm run preview      # http://127.0.0.1:4173
npm run render       # 重新渲染 3 条成片（需 FFmpeg + dev server）
```

本地分析任意视频（无需 Key）：

```bash
node cli/viralforge.mjs analyze ./reference.mp4 --out dna.json
node cli/viralforge.mjs report dna.json
```

MCP / Skill：

```bash
node mcp/server.mjs                       # stdio JSON-RPC
# Skill: skills/viralforge/SKILL.md
```

## 开源与云端

- 开源：Skill / CLI / MCP、拆解引擎与报告格式、FFmpeg 合成、商品参考图基础约束、本地小批量。
- 云端（WearAI）：8 大品类配方库、33 个托管模型、商品/角色一致性、大批量、多语言、模板库与计费。

对外口径：GitHub 演示使用美妆、鞋包、家居等通用品类；WearAI 品类差异化只作为云端卖点。

## 合规

- 只复刻结构与节奏，不搬运原片画面、音乐、文案；
- 不做真人换脸，只用本人或授权数字人；
- 成片画面与元数据都加 AI 生成标识；
- 演示关键帧为自制模拟，BGM 为本地合成；
- 优先本地上传，尊重平台条款。

## 测试

```bash
npm run typecheck
npm run build
npm run test
npm run test:media
npm run test:mcp
```

## 许可证

Apache-2.0。ViralForge 不包含、也不派生自 Hypit 代码；Hypit 的自定义许可限制多租户 SaaS 与商业再分发，
本项目只借鉴公开讨论的「以词为锚点」思路并独立实现。无 AGPL 依赖，未使用 Remotion / HyperFrames。

更多：`docs/PLAN.md`（方案）、`docs/IMPLEMENTATION.md`（实现与边界）、`docs/OPEN-QUESTIONS.md`（待确认）。
