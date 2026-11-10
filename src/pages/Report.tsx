import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { ProductArt } from '../components/ProductArt';
import { Radar, ScoreRing, ShotTable, StructureTimeline } from '../components/Visuals';
import { Arrow, Copy, Download, Layers, Share } from '../components/Icons';
import { getCase, totalVariantCost } from '../data/cases';
import { copyText, download, money } from '../lib/utils';

function ShotThumb({ study, index }: { study: ReturnType<typeof getCase>; index: number }) {
  const tones = ['#1b2a33', '#2c2418', '#241d16', '#16201a', '#1d1b24'];
  return (
    <div
      className="shot-thumb"
      style={{
        background: `radial-gradient(90% 80% at 30% 20%, ${study.palette.accent}22, transparent 65%), ${tones[index % tones.length]}`,
      }}
    >
      <div style={{ width: '44%', opacity: 0.9 }}>
        <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
      </div>
      <span className="cap">{study.shots[index]?.caption}</span>
    </div>
  );
}

export function ReportPage({ id }: { id: string }) {
  const study = getCase(id);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const share = async () => {
    const link = window.location.href;
    try {
      await copyText(link);
      setToast('报告链接已复制。');
    } catch {
      setToast(link);
    }
  };

  const saveDna = () => {
    download(`viralforge-${study.id}-dna.json`, JSON.stringify({ case: study.id, dna: study }, null, 2));
    setToast('dna.json 已下载。');
  };

  const copyDna = async () => {
    try {
      await copyText(JSON.stringify({ case: study.id, dna: study }, null, 2));
      setToast('DNA JSON 已复制到剪贴板。');
    } catch {
      saveDna();
    }
  };

  return (
    <Layout>
      <div className="container report-page">
        <div className="breadcrumbs">
          <a href="#/">首页</a> <span>/</span> <a href={`#/case/${study.id}`}>案例</a> <span>/</span>
          <span>爆款基因报告</span>
        </div>

        <div className="report-hero">
          <div>
            <span className="eyebrow">VIRAL DNA REPORT · {study.platform}</span>
            <h1>{study.title}</h1>
            <p className="lead">
              {study.subtitle}。{study.hook.why}
            </p>
            <div className="report-hero-meta">
              <span>
                品牌 <b>{study.brand}</b>
              </span>
              <span>
                品类 <b>{study.category}</b>
              </span>
              <span>
                时长 <b>{study.duration}s</b>
              </span>
              <span>
                生成 <b>2026-11-10 22:48</b>
              </span>
              <span>
                报告 <b>v0.1</b>
              </span>
            </div>
          </div>
          <div className="score-panel">
            <ScoreRing value={study.score} />
            <p>综合钩子、节奏、情绪、清晰与转化五维评分</p>
            <div className="tag-row" style={{ justifyContent: 'center', marginTop: 12 }}>
              <span className="tag acid">可迁移</span>
              <span className="tag">免费拆解</span>
            </div>
          </div>
        </div>

        <div className="report-body">
          <div className="report-main">
            <section>
              <div className="block-title">
                <h2>前 3 秒，它做对了什么</h2>
                <span>HOOK</span>
              </div>
              <div className="quote-block">「{study.hook.line}」</div>
              <div className="hook-grid" style={{ marginTop: 20 }}>
                <div>
                  <b>{study.hook.retention3s}%</b>
                  <span>3 秒留存</span>
                </div>
                <div>
                  <b>{study.hook.seconds}s</b>
                  <span>钩子长度</span>
                </div>
                <div>
                  <b>{study.structure.length}</b>
                  <span>结构段</span>
                </div>
              </div>
            </section>

            <section>
              <div className="block-title">
                <h2>为什么爆</h2>
                <span>WHY IT WORKS</span>
              </div>
              <div className="insight-list">
                {study.insights.map((insight, index) => (
                  <div className="insight" key={insight.title}>
                    <span className="n">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h4>{insight.title}</h4>
                      <p>{insight.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="block-title">
                <h2>结构节奏</h2>
                <span>{study.duration}s · {study.structure.length} 段</span>
              </div>
              <StructureTimeline segments={study.structure} duration={study.duration} />
              <div className="tag-row" style={{ marginTop: 14 }}>
                {study.structure.map((segment) => (
                  <span className="tag" key={segment.name}>
                    {segment.name} · {segment.end - segment.start}s
                  </span>
                ))}
              </div>
            </section>

            <section>
              <div className="block-title">
                <h2>逐镜拆解</h2>
                <span>{study.shots.length} 镜 · 词级锚点</span>
              </div>
              <div className="shot-cards">
                {study.shots.slice(0, 6).map((shot, index) => (
                  <div className="shot-card" key={shot.id}>
                    <ShotThumb study={study} index={index} />
                    <div className="meta">
                      <span>{shot.start.toFixed(1)}–{shot.end.toFixed(1)}s</span>
                      <span>{shot.camera}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <ShotTable shots={study.shots} />
              </div>
            </section>

            <section>
              <div className="formula-card">
                <span className="mono" style={{ color: 'var(--acid)' }}>
                  可迁移公式 · COPY THIS
                </span>
                <p>{study.formula}</p>
              </div>
            </section>

            <section style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn" href={`#/studio?case=${study.id}&step=2`}>
                <Layers /> 用这条基因复刻
              </a>
              <a className="btn btn-ghost" href={`#/case/${study.id}`}>
                看复刻成片 <Arrow />
              </a>
              <button className="btn btn-ghost" type="button" onClick={saveDna}>
                <Download /> 下载 dna.json
              </button>
            </section>
          </div>

          <aside className="report-side">
            <div className="side-card">
              <span className="mono">GENE RADAR</span>
              <h3>五维基因</h3>
              <Radar data={study.radar} />
            </div>

            <div className="formula-card">
              <span className="mono" style={{ color: 'var(--acid)' }}>
                REPLICA OFFER
              </span>
              <h3 style={{ margin: '8px 0 4px', fontSize: 16 }}>同款结构，换你的产品</h3>
              <p style={{ margin: '0 0 12px' }}>
                保留钩子与节奏，替换产品、脚本、配音；输出可编辑工程与成片。
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)' }}>
                <span>复刻成本</span>
                <b style={{ color: 'var(--acid)' }}>{money(study.replica.cost)}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
                <span>10 条变体</span>
                <b style={{ color: 'var(--acid)' }}>{money(totalVariantCost(study))}</b>
              </div>
              <a className="btn btn-sm" href={`#/studio?case=${study.id}&step=2`} style={{ width: '100%', marginTop: 14 }}>
                进入复刻
              </a>
            </div>

            <div className="side-card">
              <span className="mono">SHARE</span>
              <h3>这张报告卡，值得发给同事</h3>
              <div className="report-actions">
                <button className="btn btn-ghost btn-sm" type="button" onClick={share}>
                  <Share /> 复制分享链接
                </button>
                <button className="btn btn-ghost btn-sm" type="button" onClick={copyDna}>
                  <Copy /> 复制 DNA JSON
                </button>
              </div>
            </div>

            <div className="side-card">
              <span className="mono">COMPLIANCE</span>
              <p className="hint" style={{ margin: '8px 0 0' }}>
                参考片关键帧为自制模拟；成片使用授权数字人，画面与元数据均已标识 AI 生成。
              </p>
            </div>
          </aside>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </Layout>
  );
}
