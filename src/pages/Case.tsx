import { Layout } from '../components/Layout';
import { ProductArt } from '../components/ProductArt';
import { VideoFrame, RefStill, StructureTimeline, Radar } from '../components/Visuals';
import { Arrow, ArrowUpRight, Coin, Grid, Layers, Lock } from '../components/Icons';
import { cases, getCase, totalVariantCost } from '../data/cases';
import { money } from '../lib/utils';
import { scrollToSection } from '../lib/router';

export function CasePage({ id }: { id: string }) {
  const study = getCase(id);
  const others = cases.filter((item) => item.id !== study.id);

  return (
    <Layout>
      <div className="container case-page">
        <div className="breadcrumbs">
          <a href="#/">首页</a> <span>/</span> <a href="#/" onClick={(event) => { event.preventDefault(); scrollToSection('cases'); }}>案例</a> <span>/</span>
          <span>{study.brand}</span>
        </div>

        <div className="case-hero">
          <div>
            <span className="eyebrow">{study.category} · {study.platform}</span>
            <h1 className="h1" style={{ marginTop: 16 }}>
              {study.title}
            </h1>
            <p className="lead" style={{ marginTop: 16 }}>
              {study.subtitle}。参考片钩子：「{study.hook.line}」，
              复刻时保留结构与节奏，只替换产品、脚本与人物。
            </p>
            <div className="case-facts">
              <div>
                <b>{study.stats.views}</b>
                <span>原片播放</span>
              </div>
              <div>
                <b>{study.score}</b>
                <span>爆款指数</span>
              </div>
              <div>
                <b>{money(study.replica.cost)}</b>
                <span>复刻成本</span>
              </div>
              <div>
                <b>{study.replica.renderTime}</b>
                <span>渲染耗时</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 26, flexWrap: 'wrap' }}>
              <a className="btn" href={`#/studio?case=${study.id}&step=2`}>
                <Layers /> 复刻这条结构
              </a>
              <a className="btn btn-ghost" href={`#/report/${study.id}`}>
                看基因报告 <Arrow />
              </a>
            </div>
          </div>
          <div className="case-video-wrap">
            <VideoFrame study={study} controls />
            <div className="tag-row" style={{ justifyContent: 'center', marginTop: 12 }}>
              <span className="tag acid">复刻成片</span>
              <span className="tag">9:16</span>
              <span className="tag">已标识 AI 生成</span>
            </div>
          </div>
        </div>

        <section className="case-section">
          <div className="block-title">
            <h2>参考片关键帧</h2>
            <span>自制模拟 · 非原片</span>
          </div>
          <div className="ref-strip">
            {study.refFrames.map((frame) => (
              <div className="ref-card" key={frame.label}>
                <RefStill study={study} frame={frame} />
                <div className="ref-meta">
                  <span>{frame.label}</span>
                  <span>REFERENCE</span>
                </div>
              </div>
            ))}
          </div>
          <p className="hint" style={{ marginTop: 12 }}>
            为避免版权与肖像问题，演示使用自制模拟关键帧还原原片的构图与节奏；真实拆解只做结构分析，不二次分发原片。
          </p>
        </section>

        <section className="case-section">
          <div className="block-title">
            <h2>为什么这条能爆</h2>
            <span>WHY IT WORKS</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 32 }} className="case-why">
            <div>
              <div className="quote-block">「{study.hook.line}」</div>
              <p className="hint" style={{ marginTop: 14, maxWidth: 620 }}>{study.hook.why}</p>
              <div className="insight-list" style={{ marginTop: 22 }}>
                {study.insights.slice(0, 3).map((insight, index) => (
                  <div className="insight" key={insight.title}>
                    <span className="n">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h4>{insight.title}</h4>
                      <p>{insight.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="formula-card" style={{ marginTop: 20 }}>
                <span className="mono" style={{ color: 'var(--acid)' }}>可迁移公式</span>
                <p>{study.formula}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="side-card">
                <span className="mono">STRUCTURE · {study.duration}s</span>
                <div style={{ marginTop: 12 }}>
                  <StructureTimeline segments={study.structure} duration={study.duration} />
                </div>
              </div>
              <div className="side-card">
                <span className="mono">GENE RADAR</span>
                <Radar data={study.radar} />
              </div>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="block-title">
            <h2>复刻：保留结构，换掉内容</h2>
            <span>REPLICA</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 28 }} className="case-replica">
            <div className="panel panel-pad">
              <div className="sheet-label">
                <span>新版脚本 · 词锚点</span>
                <span>{study.replica.title}</span>
              </div>
              {study.replica.script.map((line) => (
                <div
                  key={line.time}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '78px 1fr',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: '1px solid var(--line)',
                    fontSize: 13,
                  }}
                >
                  <span className="mono" style={{ color: 'var(--muted)' }}>{line.time}</span>
                  <span style={{ color: 'rgba(242,239,230,0.86)' }}>{line.line}</span>
                </div>
              ))}
              <div className="tag-row" style={{ marginTop: 16 }}>
                <span className="tag acid"><Lock style={{ width: 9, height: 9 }} /> 商品锁定 4 镜</span>
                <span className="tag">授权数字人</span>
                <span className="tag">AI 标识</span>
                <span className="tag">可编辑工程</span>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <div className="side-card">
                <span className="mono">COST</span>
                <div className="cost-bar" style={{ gridTemplateColumns: '1fr 1fr', marginTop: 10 }}>
                  <div>
                    <span>复刻</span>
                    <b>{money(study.replica.cost)}</b>
                  </div>
                  <div>
                    <span>10 变体</span>
                    <b>{money(totalVariantCost(study))}</b>
                  </div>
                </div>
                <div style={{ marginTop: 12 }} className="hint">
                  拆解 ¥0 · 复刻按镜头计费 · 变体按条计费
                </div>
              </div>
              <div className="side-card">
                <span className="mono">OUTPUT</span>
                <div style={{ display: 'grid', gap: 8, marginTop: 8, fontSize: 12 }}>
                  <span>✓ project.json（VFML）</span>
                  <span>✓ 字幕 .srt / 分镜表</span>
                  <span>✓ 720×1280 MP4</span>
                  <span>✓ 每条成本账单</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="block-title">
            <h2>10 条变体</h2>
            <span>{money(totalVariantCost(study))} · 预计 3 分 12 秒</span>
          </div>
          <div className="variant-grid">
            {study.variants.map((variant, index) => (
              <div className="variant-card" key={variant.id}>
                <div
                  className="variant-cover"
                  style={{
                    background: `radial-gradient(120% 80% at 20% 10%, ${study.palette.accent}33, transparent 60%), linear-gradient(160deg, ${study.palette.ink}, #0a0b09)`,
                  }}
                >
                  <span className="vtag">{study.brand} · V{String(index + 1).padStart(2, '0')}</span>
                  <div className="vart">
                    <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
                  </div>
                  <div className="vhook" style={{ color: study.palette.paper }}>{variant.hook}</div>
                </div>
                <div className="variant-info">
                  <b>{variant.angle} · {variant.audience}</b>
                  <span>
                    <span>{variant.tag}</span>
                    <em>{money(variant.cost)}</em>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <a className="btn btn-sm" href={`#/studio?case=${study.id}&step=3`}>
              <Grid /> 在工作台生成变体
            </a>
            <a className="btn btn-ghost btn-sm" href={`#/report/${study.id}`}>
              查看完整基因 <ArrowUpRight />
            </a>
          </div>
        </section>

        <section className="case-section" style={{ borderBottom: 0 }}>
          <div className="block-title">
            <h2>下一个案例</h2>
            <span>KEEP EXPLORING</span>
          </div>
          <div className="cases-grid">
            {others.map((item) => (
              <a className="case-card" href={`#/case/${item.id}`} key={item.id}>
                <div className="case-media" style={{ aspectRatio: '16 / 10' }}>
                  <video
                    src={`${import.meta.env.BASE_URL}${item.video}`}
                    poster={`${import.meta.env.BASE_URL}${item.cover}`}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                  <span className="case-badge">{item.category}</span>
                </div>
                <div className="case-body">
                  <span className="mono">{item.brand}</span>
                  <h3>{item.title}</h3>
                  <div className="case-foot">
                    <span>爆款指数 <b>{item.score}</b></span>
                    <span>
                      <Coin style={{ display: 'inline', width: 10, height: 10 }} /> {money(item.replica.cost)}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
