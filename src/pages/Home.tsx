import { useState, type CSSProperties, type FormEvent } from 'react';
import { Layout } from '../components/Layout';
import { SparkMark } from '../components/ProductArt';
import {
  Arrow,
  ArrowUpRight,
  Check,
  Cloud,
  Coin,
  Download,
  Grid,
  Layers,
  LinkIcon,
  Lock,
  Scan,
} from '../components/Icons';
import { cases, type CaseStudy } from '../data/cases';
import { navigate } from '../lib/router';
import { asset } from '../lib/utils';

const barHeights = [30, 42, 55, 48, 72, 86, 76, 64, 52, 44, 38, 30];

function pickCase(input: string): CaseStudy {
  const value = input.toLowerCase();
  if (value.includes('包') || value.includes('tote') || value.includes('bag')) return cases[1];
  if (value.includes('灯') || value.includes('香') || value.includes('家居') || value.includes('lamp')) return cases[2];
  return cases[0];
}

function Hero() {
  const [value, setValue] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const study = pickCase(value);
    navigate(`/studio?case=${study.id}&run=1&url=${encodeURIComponent(value || study.demoUrl)}`);
  };
  const trySample = (study: CaseStudy) => {
    navigate(`/studio?case=${study.id}&run=1&url=${encodeURIComponent(study.demoUrl)}`);
  };

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">OPEN-SOURCE · AGENT-NATIVE</span>
          <h1 className="h1">
            贴个链接，
            <br />
            把爆款<em>拆开</em>。
          </h1>
          <p className="lead">
            先拆出它为什么爆，再用你的产品和素材一键复刻成可编辑的新视频，
            最后批量出 10 个变体做 A/B 测试。拆解免费，复刻上云端。
          </p>
          <form className="hero-form" onSubmit={submit}>
            <div className="urlbar">
              <LinkIcon />
              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="粘贴抖音 / 小红书 / TikTok / YouTube Shorts 链接"
                aria-label="爆款视频链接"
              />
              <button className="btn" type="submit">
                免费拆解 <Arrow />
              </button>
            </div>
            <div className="samples">
              <span>没链接？试试</span>
              {cases.map((study) => (
                <button className="chip" type="button" key={study.id} onClick={() => trySample(study)}>
                  {study.category.split(' · ')[0]} · {study.product}
                </button>
              ))}
            </div>
            <div className="hero-meta">
              <span>
                <i /> 拆解免费
              </span>
              <span>
                <i /> 无需登录
              </span>
              <span>
                <i /> 可分享报告卡
              </span>
              <span>
                <i /> 本地可离线
              </span>
            </div>
          </form>
        </div>

        <div className="hero-visual">
          <span className="floating-tag" style={{ top: -18, left: 26 }}>
            <b>0.8s</b> 钩子识别
          </span>
          <span className="floating-tag" style={{ top: 214, right: -18 }}>
            <b>5</b> 段结构
          </span>
          <span className="floating-tag" style={{ bottom: 30, left: -24 }}>
            <b>10</b> 变体 · ¥4.34
          </span>
          <div className="hero-report">
            <div className="report-top">
              <div>
                <div className="report-title">爆款基因报告</div>
                <div className="report-sub">GLOW LAB · 抖音 · 15s</div>
              </div>
              <div className="score-ring" style={{ '--p': 92 } as CSSProperties}>
                <div>
                  <span>92</span>
                  <small>爆款指数</small>
                </div>
              </div>
            </div>
            <div className="report-metrics">
              <div>
                <b>78%</b>
                <span>3 秒留存</span>
              </div>
              <div>
                <b>5</b>
                <span>结构段</span>
              </div>
              <div>
                <b>14</b>
                <span>词锚点</span>
              </div>
            </div>
            <div className="mini-timeline">
              <div className="mini-timeline-head">
                <span>节奏曲线</span>
                <span>96 BPM</span>
              </div>
              <div className="mini-bars">
                {barHeights.map((height, index) => (
                  <i
                    key={index}
                    className={index < 3 ? 'hot' : ''}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mini-caption">
                <span>钩子</span>
                <span>痛点</span>
                <span>解释</span>
                <span>证明</span>
                <span>行动</span>
              </div>
            </div>
            <div className="report-hook">
              <span>HOOK · 前 2.4 秒</span>
              <p>「别再交智商税了。」</p>
            </div>
            <div className="tag-row" style={{ marginTop: 14 }}>
              <span className="tag acid">反常识否定</span>
              <span className="tag">结果前置</span>
              <span className="tag">可迁移</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <div className="container">
      <div className="stats-strip">
        <div>
          <b>0 元</b>
          <span>拆解一条爆款 / 不调用生成模型</span>
        </div>
        <div>
          <b>90 秒</b>
          <span>从链接到可分享的基因报告</span>
        </div>
        <div>
          <b>10 条</b>
          <span>一条命令生成 A/B 测试变体</span>
        </div>
        <div>
          <b>100%</b>
          <span>输出可编辑工程，不只是 MP4</span>
        </div>
      </div>
    </div>
  );
}

function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">01 / CAPABILITIES</span>
            <h2 className="h2">
              三层能力，
              <br />
              一条链路。
            </h2>
          </div>
          <p>
            拆解负责拉新，复刻负责转化，变体负责规模化。三层共用同一份基因 JSON，
            不是三个割裂的工具。
          </p>
        </div>
        <div className="cap-grid reveal">
          <article className="cap-card">
            <span className="cap-num">01 / DECONSTRUCT</span>
            <h3>拆解</h3>
            <p>
              贴链接或上传视频，输出钩子、镜头节奏、字幕风格、BGM 卡点、情绪曲线与转化话术，
              生成一张可分享的报告卡。
            </p>
            <div className="cap-visual">
              <div className="mini-report">
                <div className="mini-report-row">
                  <span>前 3 秒留存</span>
                  <b>78%</b>
                </div>
                <div className="mini-report-row">
                  <span>钩子类型</span>
                  <b>反常识</b>
                </div>
                <div className="mini-bars-row">
                  {[38, 54, 46, 70, 88, 76, 60, 48].map((height, index) => (
                    <i key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="mini-report-row">
                  <span>词级锚点</span>
                  <b>14 个</b>
                </div>
              </div>
              <span className="cap-free">
                <Check style={{ width: 11, height: 11 }} /> 免费 · 可离线 · 边际成本 ≈ 0
              </span>
            </div>
          </article>

          <article className="cap-card">
            <span className="cap-num">02 / REPLICATE</span>
            <h3>复刻</h3>
            <p>
              保留结构，替换产品、脚本、配音和授权数字人。以词为锚点重排时间线，
              输出可编辑工程文件，而不是一条黑盒视频。
            </p>
            <div className="cap-visual">
              <div className="mini-report" style={{ padding: 10 }}>
                {['钩子', '痛点', '解释', '证明', '行动'].map((name, index) => (
                  <div className="mini-tl-row" key={name}>
                    <span>{name}</span>
                    <div className="mini-tl-track">
                      <i style={{ left: `${index * 18}%`, width: `${16 + (index % 2) * 5}%` }} />
                    </div>
                  </div>
                ))}
                <div className="mini-report-row" style={{ marginTop: 6 }}>
                  <span>商品一致性锁定</span>
                  <b>4 镜</b>
                </div>
              </div>
              <span className="cap-free" style={{ color: 'var(--warm)' }}>
                <Lock style={{ width: 11, height: 11 }} /> 需要模型与算力 · 云端转化入口
              </span>
            </div>
          </article>

          <article className="cap-card">
            <span className="cap-num">03 / VARIANTS</span>
            <h3>批量变体</h3>
            <p>
              一条命令生成 10 个版本，逐条标注成本与耗时。只重做改动的镜头，
              镜头级并行渲染，用于广告 A/B 测试。
            </p>
            <div className="cap-visual">
              <div className="mini-variant-grid">
                {['别再交智商税', '熬夜到 3 点', '300 块和 30 块', '卡粉不是粉底', '7 天只改一件', '早八 3 分钟'].map(
                  (hook, index) => (
                    <div className="mini-variant" key={hook}>
                      <b>{hook}</b>
                      <span>¥0.{32 + index * 3}</span>
                    </div>
                  ),
                )}
              </div>
              <span className="cap-free">
                <Coin style={{ width: 11, height: 11 }} /> 10 条预估 ¥4.34 · 3 分 12 秒
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="section" id="cases">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">02 / CASES</span>
            <h2 className="h2">
              三条片子，
              <br />
              三种爆法。
            </h2>
          </div>
          <p>
            每个案例都包含参考片关键帧、完整基因报告、一条复刻成片和 10 条变体。
            参考片关键帧为自制模拟，不使用未授权原片。
          </p>
        </div>
        <div className="cases-grid reveal">
          {cases.map((study) => (
            <a className="case-card" href={`#/case/${study.id}`} key={study.id}>
              <div className="case-media">
                <video
                  src={asset(study.video)}
                  poster={asset(study.cover)}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
                <span className="case-badge">{study.platform} · {study.category}</span>
                <span className="case-score">
                  <b>{study.score}</b> / 100
                </span>
                <span className="case-play">
                  <i /> 看复刻成片
                </span>
              </div>
              <div className="case-body">
                <span className="mono">{study.brand} · {study.duration}s</span>
                <h3>{study.title}</h3>
                <p className="hint">{study.hook.line}</p>
                <div className="case-foot">
                  <span>
                    播放 <b>{study.stats.views}</b>
                  </span>
                  <span>
                    变体 <b>10</b>
                  </span>
                  <span>
                    成本 <b>¥{study.replica.cost.toFixed(2)}</b>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotBlackBox() {
  return (
    <section className="section">
      <div className="container split">
        <div className="split-copy reveal">
          <span className="section-index">03 / NOT A BLACK BOX</span>
          <h2 className="h2">
            不是黑盒生成，
            <br />
            是<em className="acid" style={{ fontStyle: 'normal' }}>可编辑</em>的工程。
          </h2>
          <p>
            很多工具给你一条视频，改一个字就要重生成。ViralForge 给你一份 VFML：
            以词为锚点，镜头、字幕、口播、卡点共享同一套时间语义。改一句台词，
            整条片子跟着重排。
          </p>
          <ul className="feature-list">
            <li>
              <Check /> 改文案，自动重排镜头与字幕，不用手动拖时间轴
            </li>
            <li>
              <Check /> 商品参考图约束每个镜头，同一件商品不会「长得不一样」
            </li>
            <li>
              <Check /> 镜头级 dirty 标记，只重生成被改动的部分
            </li>
            <li>
              <Check /> 导出 project.json + 素材 + 字幕 + 分镜表，团队可复用
            </li>
          </ul>
          <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
            <a className="btn btn-sm" href="#/studio">
              打开工作台 <ArrowUpRight />
            </a>
            <a className="btn btn-ghost btn-sm" href="#/report/glow">
              看一份真实报告
            </a>
          </div>
        </div>
        <div className="reveal">
          <div className="code-window">
            <div className="code-head">
              <i />
              <i />
              <i />
              <span>glow-7d.project.json</span>
            </div>
            <pre className="code-body">
{`{
  `}<span className="k">"version"</span>{`: `}<span className="s">"0.1"</span>{`,
  `}<span className="k">"meta"</span>{`: {
    `}<span className="k">"title"</span>{`: `}<span className="s">"熬夜脸，还有救"</span>{`,
    `}<span className="k">"ratio"</span>{`: `}<span className="s">"9:16"</span>{`, `}<span className="k">"duration"</span>{`: `}<span className="n">15</span>{`
  },
  `}<span className="k">"words"</span>{`: [
    { `}<span className="k">"text"</span>{`: `}<span className="s">"别再"</span>{`, `}<span className="k">"start"</span>{`: `}<span className="n">0.2</span>{`, `}<span className="k">"end"</span>{`: `}<span className="n">0.6</span>{` },
    { `}<span className="k">"text"</span>{`: `}<span className="s">"交智商税了"</span>{`, `}<span className="k">"start"</span>{`: `}<span className="n">0.6</span>{`, `}<span className="k">"end"</span>{`: `}<span className="n">1.1</span>{` }
  ],
  `}<span className="k">"shots"</span>{`: [{
    `}<span className="k">"id"</span>{`: `}<span className="s">"s1"</span>{`,
    `}<span className="k">"wordRange"</span>{`: [`}<span className="n">0</span>{`, `}<span className="n">3</span>{`],
    `}<span className="k">"productRef"</span>{`: `}<span className="s">"serum"</span>{`,
    `}<span className="k">"dirty"</span>{`: `}<span className="n">false</span>{`
  }],
  `}<span className="k">"render"</span>{`: { `}<span className="k">"engine"</span>{`: `}<span className="s">"ffmpeg"</span>{`, `}<span className="k">"parallelism"</span>{`: `}<span className="n">4</span>{` }
}`}
            </pre>
          </div>
          <div className="tag-row" style={{ marginTop: 14 }}>
            <span className="tag acid">词锚点</span>
            <span className="tag">商品参考图</span>
            <span className="tag">选择性重生成</span>
            <span className="tag">FFmpeg 渲染</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className="section" id="architecture">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">04 / ARCHITECTURE</span>
            <h2 className="h2">免费拆解，付费复刻。</h2>
          </div>
          <p>
            拆解不调用生成模型，几乎零成本，负责拉新与传播；复刻和批量变体消耗模型与算力，
            由 WearAI 云端承接。
          </p>
        </div>
        <div className="arch reveal">
          <div className="arch-main">
            <div className="arch-step">
              <span className="n">01</span>
              <div>
                <h4>输入</h4>
                <p>爆款视频链接 / 本地视频 + 商品图、卖点、素材。</p>
                <div className="arch-tags">
                  <span>抖音</span>
                  <span>小红书</span>
                  <span>TikTok</span>
                  <span>YouTube Shorts</span>
                  <span>本地文件</span>
                </div>
              </div>
            </div>
            <div className="arch-step">
              <span className="n">02</span>
              <div>
                <h4>拆解 · 多模态视频理解</h4>
                <p>镜头切分 → 词级对齐 → 节拍检测 → 多模态逐镜标注，输出结构化爆款基因 JSON。</p>
                <div className="arch-tags">
                  <span>OpenCV / PySceneDetect</span>
                  <span>WhisperX</span>
                  <span>librosa</span>
                  <span>多模态标注</span>
                </div>
              </div>
            </div>
            <div className="arch-step">
              <span className="n">03</span>
              <div>
                <h4>改写 · 保留结构，替换内容</h4>
                <p>换商品、脚本、配音、授权数字人；一次生成 10 个变体，商品参考图约束每个镜头。</p>
                <div className="arch-tags">
                  <span>VFML</span>
                  <span>词锚点</span>
                  <span>商品一致性</span>
                  <span>选择性重生成</span>
                </div>
              </div>
            </div>
            <div className="arch-step">
              <span className="n">04</span>
              <div>
                <h4>生成 · 渲染 · 输出</h4>
                <p>可插拔模型 + FFmpeg 并行渲染，自动加 AI 标识，输出工程文件、MP4 与成本账单。</p>
                <div className="arch-tags">
                  <span>Seedance</span>
                  <span>可灵</span>
                  <span>Wan2.2</span>
                  <span>Flux</span>
                  <span>FFmpeg</span>
                </div>
              </div>
            </div>
          </div>
          <aside className="arch-side">
            <span className="mono">WEARAI CLOUD</span>
            <h4>云端承接付费</h4>
            <ul>
              <li>8 大品类视频配方库</li>
              <li>33 个托管模型</li>
              <li>商品 / 角色一致性</li>
              <li>大批量、多语言变体</li>
              <li>模板库与一键生成</li>
            </ul>
            <div className="arch-note">
              开源保留拆解与合成能力；云端保留模板数据、模型与一致性模型。
              这是「开源拉新 + 云端变现」的边界。
            </div>
          </aside>
        </div>
        <div className="tag-row" style={{ marginTop: 18 }}>
          <span className="tag acid">拆解边际成本 ≈ 0</span>
          <span className="tag">复刻按镜头计费</span>
          <span className="tag">批量按条报价</span>
          <span className="tag">AI 生成标识内建</span>
        </div>
      </div>
    </section>
  );
}

function OpenSource() {
  return (
    <section className="section" id="opensource">
      <div className="container os">
        <div className="reveal">
          <span className="section-index">05 / OPEN SOURCE</span>
          <h2 className="h2">
            装进你的 Agent，
            <br />
            一条命令开始。
          </h2>
          <p className="lead" style={{ marginTop: 18, maxWidth: 520 }}>
            Skill、MCP、CLI 三种入口，Claude Code、Codex、Cursor、OpenClaw 都能直接调用。
            拆解引擎与报告格式开源，模型与模板留在云端。
          </p>
          <div className="os-list">
            <div className="os-item">
              <b>Skill</b>
              <span>装进 Agent，自然语言拆解</span>
            </div>
            <div className="os-item">
              <b>MCP</b>
              <span>4 个 tool，接入任意客户端</span>
            </div>
            <div className="os-item">
              <b>CLI</b>
              <span>analyze / report / render</span>
            </div>
            <div className="os-item">
              <b>VFML</b>
              <span>可编辑、可 diff 的视频工程</span>
            </div>
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="btn" href="#/docs">
              阅读架构与快速开始 <ArrowUpRight />
            </a>
            <a className="btn btn-ghost" href="#/studio">
              先试一次拆解
            </a>
          </div>
        </div>
        <div className="reveal">
          <div className="terminal">
            <div>
              <span className="p">$</span> cd viralforge && npm install
            </div>
            <div className="c"># Skill 在 skills/viralforge，MCP 在 mcp/server.mjs</div>
            <div>
              <span className="p">$</span> node cli/viralforge.mjs analyze ./viral.mp4 --out dna.json
            </div>
            <div className="c">✓ 镜头切分 · 5 shots · 96 BPM</div>
            <div className="c">✓ 结构 / 能量 / 节奏 · dna.json</div>
            <div style={{ marginTop: 10 }}>
              <span className="p">$</span> node cli/viralforge.mjs report dna.json
            </div>
            <div className="c">→ 报告卡 · 逐镜表 · 可迁移公式</div>
            <div style={{ marginTop: 10 }}>
              <span className="p">$</span> npm run render -- --case glow
            </div>
            <div className="c">→ glow.mp4 · 15s · 720P · AI labeled</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginTop: 16,
              padding: '14px 16px',
              border: '1px solid var(--line)',
              borderRadius: 12,
            }}
          >
            <SparkMark style={{ width: 22, height: 22, color: 'var(--acid)', flex: 'none' }} />
            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', lineHeight: 1.7 }}>
              GitHub 演示使用美妆、鞋包、家居等通用品类；WearAI 的品类深度与一致性模型只作为云端能力，
              不作为开源宣传点。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="section" style={{ paddingBottom: 80 }}>
      <div className="container">
        <div
          className="reveal"
          style={{
            border: '1px solid var(--line)',
            borderRadius: 24,
            padding: 'clamp(28px, 5vw, 64px)',
            background:
              'radial-gradient(600px 300px at 80% 0%, rgba(201,255,61,0.12), transparent 70%), linear-gradient(160deg, #111310, #090a09)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) auto',
            gap: 30,
            alignItems: 'center',
          }}
        >
          <div>
            <span className="eyebrow">START WITH ONE LINK</span>
            <h2 className="h2" style={{ margin: '16px 0 12px' }}>
              下一条爆款，
              <br />
              从拆解开始。
            </h2>
            <p className="hint" style={{ maxWidth: 520 }}>
              不用注册，不用上传素材。先贴一条链接，看看它为什么爆。
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="btn btn-lg" href="#/studio">
              <Scan /> 免费拆一条
            </a>
            <a className="btn btn-ghost btn-lg" href="#/case/glow">
              <Download /> 看成片
            </a>
          </div>
        </div>
        <div className="tag-row" style={{ marginTop: 22, justifyContent: 'center' }}>
          <span className="tag">
            <Cloud style={{ width: 10, height: 10 }} /> 云端：WearAI 模板库 · 模型托管
          </span>
          <span className="tag">
            <Grid style={{ width: 10, height: 10 }} /> 开源：Skill · MCP · CLI
          </span>
          <span className="tag">
            <Layers style={{ width: 10, height: 10 }} /> 三层能力：拆解 / 复刻 / 变体
          </span>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Capabilities />
      <Cases />
      <NotBlackBox />
      <Architecture />
      <OpenSource />
      <Closing />
    </Layout>
  );
}
