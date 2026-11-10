import type { CaseStudy } from '../data/cases';
import { totalVariantCost } from '../data/cases';
import { Arrow, Download, Layers, Share } from './Icons';
import { ScoreRing, ShotTable, StructureTimeline } from './Visuals';
import { money } from '../lib/utils';

export function ReportSheet({
  study,
  onReplicate,
  onShare,
  onDownload,
}: {
  study: CaseStudy;
  onReplicate?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}) {
  return (
    <div className="report-sheet">
      <div className="report-sheet-head">
        <div>
          <span className="mono" style={{ color: 'var(--acid)' }}>
            VIRAL DNA · {study.platform}
          </span>
          <h2>{study.title}</h2>
          <p>
            {study.category} · {study.duration}s · {study.hook.type}
          </p>
        </div>
        <ScoreRing value={study.score} />
      </div>

      <div className="metric-grid">
        <div>
          <b>{study.stats.views}</b>
          <span>播放</span>
        </div>
        <div>
          <b>{study.stats.likes}</b>
          <span>点赞</span>
        </div>
        <div>
          <b>{study.stats.shares}</b>
          <span>分享</span>
        </div>
        <div>
          <b>{study.stats.completion}</b>
          <span>完播率</span>
        </div>
      </div>

      <div className="sheet-section">
        <div className="sheet-label">
          <span>01 · 前 3 秒钩子</span>
          <span>留存 {study.hook.retention3s}%</span>
        </div>
        <div className="hook-quote">「{study.hook.line}」</div>
        <p className="hint" style={{ marginTop: 10 }}>
          {study.hook.why}
        </p>
        <div className="tag-row" style={{ marginTop: 10 }}>
          <span className="tag acid">{study.hook.type}</span>
          <span className="tag">前 {study.hook.seconds}s</span>
          <span className="tag">可迁移</span>
        </div>
      </div>

      <div className="sheet-section">
        <div className="sheet-label">
          <span>02 · 结构节奏</span>
          <span>{study.structure.length} 段 · {study.duration}s</span>
        </div>
        <StructureTimeline segments={study.structure} duration={study.duration} />
      </div>

      <div className="sheet-section">
        <div className="sheet-label">
          <span>03 · 逐镜拆解</span>
          <span>{study.shots.length} 个镜头</span>
        </div>
        <ShotTable shots={study.shots} />
      </div>

      <div className="sheet-section">
        <div className="sheet-label">
          <span>04 · 可迁移公式</span>
          <span>COPY THIS</span>
        </div>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8, color: 'rgba(242,239,230,0.82)' }}>
          {study.formula}
        </p>
      </div>

      <div className="sheet-actions">
        {onReplicate && (
          <button className="btn btn-sm" type="button" onClick={onReplicate}>
            <Layers /> 用这条基因复刻
          </button>
        )}
        {onShare && (
          <button className="btn btn-ghost btn-sm" type="button" onClick={onShare}>
            <Share /> 分享报告卡
          </button>
        )}
        {onDownload && (
          <button className="btn btn-ghost btn-sm" type="button" onClick={onDownload}>
            <Download /> dna.json
          </button>
        )}
        <span className="mono" style={{ marginLeft: 'auto', alignSelf: 'center', color: 'var(--muted)' }}>
          10 变体预估 {money(totalVariantCost(study))}
        </span>
      </div>
    </div>
  );
}

export function ReplicaSummary({ study }: { study: CaseStudy }) {
  return (
    <div className="panel panel-pad">
      <span className="mono" style={{ color: 'var(--acid)' }}>
        REPLICA PLAN
      </span>
      <h3 className="h3" style={{ marginTop: 10 }}>
        {study.replica.title}
      </h3>
      <p className="hint" style={{ marginTop: 6 }}>
        {study.replica.persona}
      </p>
      <div className="tag-row" style={{ marginTop: 14 }}>
        {study.replica.sellingPoints.map((point) => (
          <span className="tag" key={point}>
            {point}
          </span>
        ))}
      </div>
      <div className="cost-bar">
        <div>
          <span>复刻成本</span>
          <b>{money(study.replica.cost)}</b>
        </div>
        <div>
          <span>渲染耗时</span>
          <b>{study.replica.renderTime}</b>
        </div>
        <div>
          <span>镜头</span>
          <b>{study.shots.length}</b>
        </div>
        <div>
          <span>商品锁定</span>
          <b>{study.shots.filter((shot) => shot.productLock).length}</b>
        </div>
      </div>
      <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
        {study.replica.script.map((line) => (
          <div
            key={line.time}
            style={{
              display: 'grid',
              gridTemplateColumns: '78px 1fr',
              gap: 10,
              fontSize: 12,
              lineHeight: 1.6,
              paddingBottom: 8,
              borderBottom: '1px solid var(--line)',
            }}
          >
            <span className="mono" style={{ color: 'var(--muted)' }}>
              {line.time}
            </span>
            <span style={{ color: 'rgba(242,239,230,0.82)' }}>{line.line}</span>
          </div>
        ))}
      </div>
      <a className="link-arrow" href={`#/case/${study.id}`} style={{ marginTop: 18 }}>
        查看完整案例 <Arrow />
      </a>
    </div>
  );
}
