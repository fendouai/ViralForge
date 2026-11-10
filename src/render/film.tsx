import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getCase, type CaseStudy } from '../data/cases';
import { ProductArt } from '../components/ProductArt';
import './film.css';

type Kind = 'hook' | 'problem' | 'product' | 'split' | 'mood' | 'cta';

type SceneContent = {
  kind: Kind;
  lines: string[];
  sub?: string;
  caption: string;
  stats?: string[];
  labels?: [string, string];
};

const CONTENT: Record<string, SceneContent[]> = {
  glow: [
    { kind: 'hook', lines: ['熬夜脸，', '还有救。'], sub: 'GLOW LAB · 5% 烟酰胺', caption: '别再交智商税了。' },
    { kind: 'problem', lines: ['暗沉', '卡粉', '没光'], sub: '不是粉底的错', caption: '你的脸，根本不缺营养。' },
    { kind: 'product', lines: ['5% 烟酰胺'], sub: '微囊包裹 · 慢慢释放', caption: '不是换脸，是换光。', stats: ['5%', '微囊', '7 天'] },
    { kind: 'split', lines: ['第 1 天', '第 7 天'], caption: '7 天，把光还给你。', labels: ['第 1 天', '第 7 天'] },
    { kind: 'cta', lines: ['先领小样，', '再决定。'], sub: 'GLOW LAB', caption: '点击下方，先拆一条。' },
  ],
  tote: [
    { kind: 'hook', lines: ['装得下 14 寸，', '还不像上班。'], sub: 'AER · 通勤托特', caption: '直到我背了这只。' },
    { kind: 'problem', lines: ['通勤', '出差', '带娃'], sub: '一只包，三个场景', caption: '一只包，顶三只。' },
    { kind: 'product', lines: ['一整块', '植鞣皮'], sub: '越用越软 · 越背越像你', caption: '13 个分区，电脑有独立层。', stats: ['14 寸', '13 分区', '植鞣皮'] },
    { kind: 'split', lines: ['装下全部', '还不鼓'], caption: '通勤、出差、带娃，都装得下。', labels: ['装下', '还不鼓'] },
    { kind: 'cta', lines: ['一只包，', '顶三只。'], sub: 'AER', caption: '三个颜色，通勤直接背。' },
  ],
  lamp: [
    { kind: 'hook', lines: ['30 块，', '改了出租屋。'], sub: 'MORI · 香薰氛围灯', caption: '房东的破出租屋，被我 30 块改了。' },
    { kind: 'split', lines: ['关灯', '开灯'], caption: '只开了一盏灯。', labels: ['关灯', '开灯'] },
    { kind: 'product', lines: ['三档暖光'], sub: '无极调光 · 香薰 · 定时', caption: '不是换房，是换光。', stats: ['三档', '无极', '定时'] },
    { kind: 'mood', lines: ['睡前 10 分钟，', '房间先安静。'], sub: 'SLEEP MODE · 2700K', caption: '关灯那一刻，班味散了。' },
    { kind: 'cta', lines: ['30 块，', '先买氛围。'], sub: 'MORI', caption: '点击下方，先拆一条。' },
  ],
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

function linesProgress(local: number, index: number) {
  return ease(clamp((local - 0.06 - index * 0.07) / 0.34));
}

function Scene({ study, content, local, index }: { study: CaseStudy; content: SceneContent; local: number; index: number }) {
  const captionIn = ease(clamp((local - 0.05) / 0.2));
  const productIn = ease(clamp((local - 0.12) / 0.4));
  const drift = 1 + local * 0.035;

  return (
    <div className={`scene kind-${content.kind}`}>
      <div
        className="scene-art"
        style={{
          opacity: content.kind === 'problem' ? 0.2 : 1,
          transform: `scale(${drift})`,
        }}
      >
        <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
      </div>

      <div className="scene-index">0{index + 1} / 05</div>

      {(content.kind === 'hook' || content.kind === 'cta') && (
        <div className="scene-hook">
          <span className="film-kicker">{content.sub}</span>
          {content.lines.map((line, lineIndex) => {
            const progress = linesProgress(local, lineIndex);
            return (
              <div
                className="big-line"
                key={line}
                style={{
                  opacity: progress,
                  transform: `translateY(${(1 - progress) * 54}px)`,
                }}
              >
                {line}
              </div>
            );
          })}
          <div className="film-rule" style={{ transform: `scaleX(${ease(clamp((local - 0.2) / 0.4))})` }} />
        </div>
      )}

      {content.kind === 'problem' && (
        <div className="scene-problem">
          <span className="film-kicker">{content.sub}</span>
          {content.lines.map((line, lineIndex) => {
            const progress = linesProgress(local, lineIndex);
            return (
              <div className="problem-line" key={line}>
                <span
                  style={{
                    opacity: progress,
                    transform: `translateX(${(1 - progress) * -40}px)`,
                    backgroundImage: 'linear-gradient(var(--accent), var(--accent))',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${ease(clamp((local - 0.28 - lineIndex * 0.1) / 0.3)) * 100}% 7px`,
                    backgroundPosition: '0 56%',
                  }}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {content.kind === 'product' && (
        <div className="scene-product">
          <div className="product-ring" style={{ transform: `scale(${0.9 + productIn * 0.1})`, opacity: productIn }} />
          <div className="product-ring ring-2" style={{ transform: `scale(${0.96 + productIn * 0.06})`, opacity: productIn * 0.6 }} />
          <div className="product-copy" style={{ opacity: productIn }}>
            <span className="film-kicker">{content.sub}</span>
            {content.lines.map((line, lineIndex) => (
              <div className="big-line small" key={line} style={{ opacity: linesProgress(local, lineIndex) }}>
                {line}
              </div>
            ))}
          </div>
          <div className="product-stats" style={{ opacity: productIn }}>
            {content.stats?.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>
      )}

      {content.kind === 'split' && (
        <div className="scene-split">
          <span className="film-kicker">{content.lines[0]} / {content.lines[1]}</span>
          <div className="split-panels">
            <div className="split-panel before" style={{ opacity: ease(clamp(local / 0.25)) }}>
              <div className="split-art">
                <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
              </div>
              <span className="split-label">{content.labels?.[0]}</span>
              <span className="split-num">01</span>
              <span className="split-foot">BEFORE · 原片</span>
            </div>
            <div
              className="split-panel after"
              style={{
                opacity: ease(clamp((local - 0.22) / 0.28)),
                transform: `translateY(${(1 - ease(clamp((local - 0.22) / 0.28))) * 30}px)`,
              }}
            >
              <div className="split-art">
                <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
              </div>
              <span className="split-label">{content.labels?.[1]}</span>
              <span className="split-num">07</span>
              <span className="split-foot">AFTER · 复刻</span>
            </div>
          </div>
        </div>
      )}

      {content.kind === 'mood' && (
        <div className="scene-mood" style={{ opacity: productIn }}>
          <span className="film-kicker">{content.sub}</span>
          {content.lines.map((line, lineIndex) => (
            <div
              className="big-line"
              key={line}
              style={{
                opacity: linesProgress(local, lineIndex),
                transform: `translateY(${(1 - linesProgress(local, lineIndex)) * 36}px)`,
              }}
            >
              {line}
            </div>
          ))}
          <div className="mood-glow" style={{ opacity: productIn * 0.8 }} />
        </div>
      )}

      <div className="film-caption" style={{ opacity: captionIn, transform: `translateY(${(1 - captionIn) * 18}px)` }}>
        <i />
        <span>{content.caption}</span>
        <b>AI 生成</b>
      </div>
    </div>
  );
}

function Film() {
  const params = new URLSearchParams(window.location.search);
  const study = getCase(params.get('case') ?? 'glow');
  const scenes = CONTENT[study.id];
  const [time, setTime] = useState(0);

  useEffect(() => {
    (window as unknown as { __setTime: (value: number) => void }).__setTime = setTime;
    (window as unknown as { __filmReady: boolean }).__filmReady = true;
  }, []);

  const index = Math.max(
    0,
    study.structure.findIndex((segment) => time >= segment.start && time < segment.end),
  );
  const segment = study.structure[index];
  const content = scenes[index];
  const local = clamp((time - segment.start) / Math.max(0.01, segment.end - segment.start));
  const progress = clamp(time / study.duration);

  return (
    <div
      id="film"
      className={`film film-${study.id}`}
      style={{
        ['--accent' as string]: study.palette.accent,
        ['--paper' as string]: study.palette.paper,
        ['--soft' as string]: study.palette.soft,
        ['--film-ink' as string]: study.palette.ink,
      }}
    >
      <div className="film-bg" />
      <div className="film-grid" />
      <div className="film-vignette" />
      <div className="film-grain" />

      <header className="film-top">
        <span>VIRALFORGE / REPLICA</span>
        <span>{study.brand} · {study.duration}s</span>
      </header>
      <div className="film-progress">
        <i style={{ width: `${progress * 100}%` }} />
      </div>

      <Scene study={study} content={content} local={local} index={index} />

      <footer className="film-bottom">
        <span>9:16 · 720P · 30FPS</span>
        <span>{study.category}</span>
      </footer>
    </div>
  );
}

const mount = document.getElementById('root');
if (mount) createRoot(mount).render(<Film />);

export default Film;
