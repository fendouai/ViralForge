import type { CSSProperties } from 'react';
import type { CaseStudy, Shot, StructureSegment } from '../data/cases';
import { ProductArt } from './ProductArt';
import { asset, cx } from '../lib/utils';

export function ScoreRing({ value, label = '爆款指数' }: { value: number; label?: string }) {
  return (
    <div className="score-ring" style={{ '--p': value } as CSSProperties} aria-label={`${label} ${value} 分`}>
      <div>
        <span>{value}</span>
        <small>{label}</small>
      </div>
    </div>
  );
}

export function Radar({ data }: { data: { label: string; value: number }[] }) {
  const cx0 = 110;
  const cy0 = 108;
  const radius = 72;
  const angle = (index: number) => (Math.PI * 2 * index) / data.length - Math.PI / 2;
  const point = (index: number, ratio: number) => {
    const a = angle(index);
    return [cx0 + Math.cos(a) * radius * ratio, cy0 + Math.sin(a) * radius * ratio] as const;
  };
  const polygon = data
    .map((item, index) => point(index, item.value / 100).join(','))
    .join(' ');
  return (
    <svg className="radar" viewBox="0 0 220 220" role="img" aria-label="爆款基因雷达图">
      {[0.25, 0.5, 0.75, 1].map((ratio) => (
        <polygon
          key={ratio}
          points={data.map((_, index) => point(index, ratio).join(',')).join(' ')}
          fill="none"
          stroke="rgba(242,239,230,0.12)"
          strokeWidth="1"
        />
      ))}
      {data.map((_, index) => {
        const [x, y] = point(index, 1);
        return <line key={index} x1={cx0} y1={cy0} x2={x} y2={y} stroke="rgba(242,239,230,0.1)" />;
      })}
      <polygon points={polygon} fill="rgba(201,255,61,0.16)" stroke="#C9FF3D" strokeWidth="1.6" />
      {data.map((item, index) => {
        const [x, y] = point(index, item.value / 100);
        const [lx, ly] = point(index, 1.24);
        return (
          <g key={item.label}>
            <circle cx={x} cy={y} r="2.6" fill="#C9FF3D" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="PingFang SC, sans-serif"
              fontSize="9"
              fill="rgba(242,239,230,0.62)"
            >
              {item.label} {item.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function StructureTimeline({
  segments,
  duration,
  compact = false,
}: {
  segments: StructureSegment[];
  duration: number;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mini-timeline-viz">
        {segments.map((segment) => (
          <div className="mini-tl-row" key={segment.name}>
            <span>{segment.name}</span>
            <div className="mini-tl-track">
              <i
                style={{
                  left: `${(segment.start / duration) * 100}%`,
                  width: `${((segment.end - segment.start) / duration) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="structure-bars">
      {segments.map((segment) => (
        <div className="structure-row" key={segment.name}>
          <span className="name">{segment.name}</span>
          <div className="track">
            <i
              className={segment.name === '钩子' ? 'hot' : ''}
              style={{
                left: `${(segment.start / duration) * 100}%`,
                width: `${((segment.end - segment.start) / duration) * 100}%`,
              }}
            />
          </div>
          <span className="purpose">{(segment.end - segment.start).toFixed(1)}s</span>
        </div>
      ))}
    </div>
  );
}

export function ShotTable({ shots }: { shots: Shot[] }) {
  return (
    <div className="shot-table">
      {shots.map((shot, index) => (
        <div className="shot-row" key={shot.id}>
          <span className="idx">{String(index + 1).padStart(2, '0')}</span>
          <span className="cap">{shot.caption}</span>
          <span className="time">
            {shot.start.toFixed(1)}–{shot.end.toFixed(1)}s
          </span>
        </div>
      ))}
    </div>
  );
}

export function VideoFrame({
  study,
  controls = false,
  className,
  autoPlay = true,
}: {
  study: CaseStudy;
  controls?: boolean;
  className?: string;
  autoPlay?: boolean;
}) {
  return (
    <div className={cx('video-frame', className)}>
      <video
        src={asset(study.video)}
        poster={asset(study.cover)}
        muted
        loop
        playsInline
        autoPlay={autoPlay}
        controls={controls}
        preload="metadata"
        aria-label={`${study.title} 复刻成片`}
      />
      <span className="ai-badge">AI 生成 · 授权素材</span>
      <span className="video-meta">{study.duration}s · 9:16 · 720P</span>
    </div>
  );
}

const toneBackground: Record<string, string> = {
  cold: 'linear-gradient(165deg, #1b2a33 0%, #0d1418 55%, #06090b 100%)',
  warm: 'linear-gradient(165deg, #3a2a1a 0%, #1d130c 55%, #080604 100%)',
  light: 'linear-gradient(165deg, #d9d4c6 0%, #a8a393 55%, #6c6a60 100%)',
};

export function RefStill({
  study,
  frame,
  compact = false,
}: {
  study: CaseStudy;
  frame: { label: string; caption: string; tone: string };
  compact?: boolean;
}) {
  return (
    <div
      className="ref-still"
      style={{ background: toneBackground[frame.tone] ?? toneBackground.cold }}
    >
      <span className="stamp">参考片 · 自制模拟 {frame.label}</span>
      <div style={{ width: compact ? '46%' : '58%', opacity: 0.92 }}>
        <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
      </div>
      <span className="caption">{frame.caption}</span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
