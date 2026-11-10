import { Layout } from '../components/Layout';
import { ArrowUpRight, Doc, GitHub } from '../components/Icons';

const sections = [
  { id: 'quickstart', label: '快速开始' },
  { id: 'layers', label: '三层能力' },
  { id: 'vfml', label: 'VFML 规范' },
  { id: 'architecture', label: '架构' },
  { id: 'boundary', label: '开源 / 云端' },
  { id: 'cli', label: 'Skill / CLI / MCP' },
  { id: 'compliance', label: '合规' },
  { id: 'testing', label: '测试与部署' },
];

export function DocsPage() {
  return (
    <Layout>
      <div className="container docs-page">
        <div className="breadcrumbs">
          <a href="#/">首页</a> <span>/</span> <span>开源文档</span>
        </div>
        <div style={{ marginBottom: 38 }}>
          <span className="eyebrow">OPEN SOURCE · v0.1.0</span>
          <h1 className="h1" style={{ fontSize: 'clamp(38px, 5vw, 64px)', marginTop: 16 }}>
            ViralForge 文档
          </h1>
          <p className="lead" style={{ maxWidth: 680, marginTop: 14 }}>
            贴一个爆款链接，拆出基因，用你的产品复刻，再批量出变体。
            拆解引擎与合成管线开源，模型与模板留在 WearAI 云端。
          </p>
        </div>

        <div className="docs-grid">
          <aside className="docs-nav">
            {sections.map((section) => (
              <a href={`#/docs`} key={section.id} onClick={(event) => {
                event.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}>
                {section.label}
              </a>
            ))}
            <a href="#/studio" style={{ color: 'var(--acid)', marginTop: 10 }}>
              打开工作台 <ArrowUpRight style={{ display: 'inline', width: 11, height: 11 }} />
            </a>
          </aside>

          <div className="docs-content">
            <section id="quickstart">
              <h2>快速开始</h2>
              <p>
                三种入口：网页工作台、CLI、Agent Skill。网页工作台用于演示与人工操作；
                CLI 用于接入本地素材与渲染；Skill 用于让 Claude Code、Codex、Cursor、OpenClaw 直接调用。
              </p>
              <pre>{`# 安装依赖并启动 Web 工作台
npm install
npm run dev        # http://127.0.0.1:5173

# 构建 + 本地预览
npm run build
npm run preview    # http://127.0.0.1:4173

# 重新渲染 3 条案例成片
npm run render

# E2E 冒烟 + 媒体校验
npm run test
npm run test:media`}</pre>
              <p>
                仓库内已包含 3 个完整案例、VFML 示例、Skill、CLI 与 MCP server。
                所有成片为本地渲染，带「AI 生成」标识，参考片关键帧为自制模拟。
              </p>
            </section>

            <section id="layers">
              <h2>三层能力</h2>
              <p>
                <strong>拆解</strong>：镜头切分 → 词级对齐 → 节拍检测 → 多模态逐镜标注，输出爆款基因 JSON 与可分享报告卡。
                不调用生成模型，边际成本趋近于 0。
              </p>
              <p>
                <strong>复刻</strong>：保留结构，替换产品、脚本、配音、授权数字人；以词为锚点重排时间线；
                商品参考图约束每个镜头；输出可编辑工程文件（VFML）而不只是 MP4。
              </p>
              <p>
                <strong>批量变体</strong>：一条命令生成 10 个版本，换钩子、人群、场景；只重生成 dirty 镜头；
                镜头级并行渲染；每条标注成本与耗时。
              </p>
            </section>

            <section id="vfml">
              <h2>VFML 规范</h2>
              <p>
                VFML（ViralForge Markup Language）是面向短视频的可编辑工程格式。核心原则是
                <strong>词是锚点，秒是结果</strong>：镜头通过词区间定位，而不是固定秒数。
              </p>
              <pre>{`{
  "version": "0.1",
  "meta": { "title": "熬夜脸，还有救", "ratio": "9:16", "duration": 15 },
  "productRefs": [{ "id": "serum", "lock": ["logo", "color", "shape"] }],
  "words": [
    { "text": "别再", "start": 0.2, "end": 0.6 },
    { "text": "交智商税了", "start": 0.6, "end": 1.1 }
  ],
  "shots": [{
    "id": "s1",
    "wordRange": [0, 3],
    "visual": "macro-skin",
    "productRef": "serum",
    "caption": "别再交智商税了。",
    "dirty": false
  }],
  "audio": { "bgm": "bed-glow", "beatAnchors": [0.5, 1.0, 1.5] },
  "render": { "engine": "ffmpeg", "fps": 30, "parallelism": 4 }
}`}</pre>
              <p>
                改一句台词时，重排只影响引用该词区间的镜头；<code>dirty</code> 标记让渲染器跳过未改动镜头。
                这让变体矩阵的渲染成本可控，也让团队可以 diff 两份工程。
              </p>
            </section>

            <section id="architecture">
              <h2>架构</h2>
              <pre>{`输入（链接 / 文件 + 商品素材）
  → 拆解：OpenCV 镜头切分 · WhisperX 词级对齐 · librosa 节拍 · 多模态标注
  → 爆款基因 JSON + 报告卡（免费、可分享）
  → 改写：换商品 / 脚本 / 配音 / 授权数字人（商品参考图约束）
  → 生成：可插拔模型（Seedance / 可灵 / Wan2.2 / Flux / TTS）
  → 渲染：FFmpeg 优先 · 选择性重生成 · 并行 · AI 标识
  → 输出：VFML 工程 + MP4 + 成本账单`}</pre>
              <p>
                Web 端为静态 SPA（hash 路由），可直接部署到 Vercel / Cloudflare Pages / GitHub Pages。
                真实渲染 worker 需要 Node + FFmpeg + 浏览器，建议独立容器运行。
              </p>
            </section>

            <section id="boundary">
              <h2>开源 / 云端边界</h2>
              <p>
                开源保留拆解与合成能力，云端保留模板数据、模型与一致性模型。这是「开源拉新 + 云端变现」的边界。
              </p>
              <pre>{`开源：
  Skill / MCP / CLI
  拆解引擎 + 报告格式
  FFmpeg 合成管线
  商品参考图基础约束
  本地小批量变体

WearAI 云端：
  8 大品类视频配方库
  33 个托管模型
  商品 / 角色一致性模型
  大批量、多语言变体
  模板库、团队协作、计费`}</pre>
              <p>
                对外口径：GitHub 演示使用美妆、鞋包、家居等通用品类；WearAI 的品类深度只作为云端卖点，
                不作为开源项目的宣传点。
              </p>
            </section>

            <section id="cli">
              <h2>Skill / CLI / MCP</h2>
              <p>CLI 提供三个子命令，MCP 暴露四个 tool，Skill 告诉 Agent 何时以及如何调用。</p>
              <pre>{`# CLI
viralforge analyze ./viral.mp4          # 输出 dna.json
viralforge report dna.json              # 生成报告卡 HTML/JSON
viralforge render project.json          # 调用本地渲染管线

# MCP tools
analyze_video(url | path) -> dna
get_report(caseId) -> report
build_project(dna, product) -> vfml
render_video(vfml) -> mp4`}</pre>
              <p>
                Skill 入口见仓库 <code>skills/viralforge/SKILL.md</code>，MCP server 见 <code>mcp/server.mjs</code>。
                没有模型 Key 时，CLI 的结构分析仍可运行；生成与渲染会提示需要配置服务。
              </p>
            </section>

            <section id="compliance">
              <h2>合规</h2>
              <ul>
                <li>默认不支持替换真人脸，只使用授权数字人；</li>
                <li>成片画面与元数据自动加「AI 生成」标识；</li>
                <li>参考片只做结构分析，不二次分发原片；</li>
                <li>演示使用自制模拟关键帧与自制 BGM；</li>
                <li>商品参考图仅用于一致性约束，不对外传播未授权素材。</li>
              </ul>
            </section>

            <section id="testing">
              <h2>测试与部署</h2>
              <p>
                <code>npm run build</code> 执行 TypeScript 类型检查与生产构建；
                <code>npm run test</code> 用 Playwright 走通首页 → 工作台 → 拆解 → 复刻 → 变体 → 报告页；
                <code>npm run test:media</code> 用 ffprobe 校验 3 条成片的分辨率、时长与编码。
              </p>
              <pre>{`# 本地部署
npm run build
npm run preview   # 127.0.0.1:4173

# 静态托管
# 将 dist/ 部署到 Vercel / Cloudflare Pages / GitHub Pages
# 渲染 worker 需独立 Node 容器（FFmpeg + Chromium）`}</pre>
              <div
                style={{
                  marginTop: 24,
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                  padding: 18,
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                }}
              >
                <Doc style={{ width: 22, height: 22, color: 'var(--acid)', flex: 'none' }} />
                <p style={{ margin: 0, fontSize: 12 }}>
                  完整方案、架构与验收标准见仓库 <code>docs/PLAN.md</code>；实现说明见{' '}
                  <code>docs/IMPLEMENTATION.md</code>。
                </p>
              </div>
              <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a className="btn btn-sm" href="#/studio">
                  去工作台试一次
                </a>
                <a className="btn btn-ghost btn-sm" href="#/case/glow">
                  看发布案例
                </a>
                <span className="tag" style={{ alignSelf: 'center' }}>
                  <GitHub style={{ width: 11, height: 11 }} /> viralforge 0.1.0
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
