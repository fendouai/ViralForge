import { useEffect, useMemo, useRef, useState } from 'react';
import { Layout } from '../components/Layout';
import { ProductArt } from '../components/ProductArt';
import { ReportSheet, ReplicaSummary } from '../components/ReportSheet';
import { VideoFrame } from '../components/Visuals';
import {
  Arrow,
  Check,
  Download,
  Grid,
  Layers,
  LinkIcon,
  Lock,
  Play,
  Scan,
} from '../components/Icons';
import { cases, getCase, totalVariantCost, type CaseStudy } from '../data/cases';
import { navigate, useRoute } from '../lib/router';
import { copyText, download, money } from '../lib/utils';

type Phase = 'idle' | 'analyzing' | 'report' | 'replica' | 'variants';

type LogItem = { t: string; text: string };

const analysisLogs = (study: CaseStudy): LogItem[] => [
  { t: '00:00.2', text: '解析链接 · 识别平台 / 时长 / 分辨率' },
  { t: '00:01.0', text: `抽帧 180 帧 · 镜头切分 ${study.shots.length} 个镜头` },
  { t: '00:02.4', text: `WhisperX · ${study.words.length} 词 · 词级时间戳对齐` },
  { t: '00:03.6', text: `节拍检测 · ${study.bpm} BPM · 12 个节拍锚点` },
  { t: '00:04.4', text: '多模态逐镜标注 · 钩子 / 情绪 / 话术' },
  { t: '00:05.2', text: '生成爆款基因 · 报告卡已就绪' },
];

const DIMENSIONS = ['钩子', '人群', '卖点', '场景', '平台比例'];

function buildProject(study: CaseStudy, caption: string, dirty: boolean) {
  return {
    version: '0.1',
    generator: 'viralforge 0.1.0 · demo',
    meta: {
      id: `${study.id}-replica`,
      title: study.replica.title,
      ratio: '9:16',
      resolution: '720x1280',
      duration: study.duration,
      aiDisclosure: true,
      source: study.demoUrl,
    },
    productRefs: [{ id: study.id, brand: study.brand, lock: ['logo', 'color', 'shape'] }],
    words: study.words,
    shots: study.shots.map((shot, index) => ({
      id: shot.id,
      wordRange: [shot.wordStart, shot.wordEnd],
      visual: shot.label,
      productLock: shot.productLock,
      caption: index === 2 ? caption : shot.caption,
      transition: index === 0 ? 'flash' : 'cut',
      dirty: index === 2 ? dirty : false,
    })),
    audio: { bgm: `bed-${study.id}`, beatAnchors: [0.5, 1.0, 1.5, 2.0], vo: 'voice-demo' },
    render: { engine: 'ffmpeg', fps: 30, parallelism: 4 },
  };
}

function Console({
  logs,
  running,
  progress,
  title = 'DECONSTRUCT',
}: {
  logs: LogItem[];
  running: boolean;
  progress: number;
  title?: string;
}) {
  return (
    <div className="console">
      <div className="console-head">
        <span>{title} · LOG</span>
        <i>{running ? 'RUNNING' : logs.length ? 'COMPLETE' : 'STANDBY'}</i>
      </div>
      {logs.length === 0 && (
        <div className="empty-hint">
          等待输入。拆解会依次执行：下载 → 抽帧 → 镜头切分 → 词级对齐 → 节拍检测 → 多模态标注。
        </div>
      )}
      {logs.map((log, index) => (
        <div className="log ok" key={`${log.t}-${index}`}>
          <span className="t">{log.t}</span>
          <span>{log.text}</span>
        </div>
      ))}
      <div className="progress-track">
        <i style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function TimelineEditor({
  study,
  caption,
  dirty,
  onCaption,
  onApply,
}: {
  study: CaseStudy;
  caption: string;
  dirty: boolean;
  onCaption: (value: string) => void;
  onApply: () => void;
}) {
  const shots = study.shots;
  return (
    <div className="timeline">
      <div className="timeline-head">
        <span>VFML · {study.replica.title}</span>
        <span>{study.duration}s · {shots.length} shots</span>
      </div>
      <div className="timeline-rows">
        <div className="tl-row">
          <span className="label">VIDEO</span>
          <div className="tl-track">
            {shots.map((shot) => (
              <div
                className="tl-clip"
                key={shot.id}
                style={{
                  left: `${(shot.start / study.duration) * 100}%`,
                  width: `${((shot.end - shot.start) / study.duration) * 100}%`,
                }}
              >
                {shot.label}
              </div>
            ))}
          </div>
        </div>
        <div className="tl-row">
          <span className="label">CAPTION</span>
          <div className="tl-track">
            {shots.map((shot, index) => (
              <div
                className={`tl-clip ${index === 2 && dirty ? 'dirty' : ''}`}
                key={shot.id}
                style={{
                  left: `${(shot.start / study.duration) * 100}%`,
                  width: `${((shot.end - shot.start) / study.duration) * 100}%`,
                }}
              >
                {index === 2 ? caption : shot.caption}
              </div>
            ))}
          </div>
        </div>
        <div className="tl-row">
          <span className="label">VOICE</span>
          <div className="tl-track">
            <div
              className="tl-clip"
              style={{
                left: '0%',
                width: '100%',
                background: 'rgba(158,203,255,0.12)',
                borderColor: 'rgba(158,203,255,0.3)',
              }}
            >
              voice-demo · 授权数字人 / 无真人换脸
            </div>
          </div>
        </div>
        <div className="tl-row">
          <span className="label">BGM</span>
          <div className="tl-track">
            <div
              className="tl-clip"
              style={{
                left: '0%',
                width: '100%',
                background: 'rgba(255,179,71,0.12)',
                borderColor: 'rgba(255,179,71,0.3)',
              }}
            >
              bed-{study.id} · 98 BPM · 12 anchors
            </div>
          </div>
        </div>
      </div>
      <div className="tl-ruler">
        <span>0s</span>
        <span>{(study.duration / 3).toFixed(1)}s</span>
        <span>{((study.duration / 3) * 2).toFixed(1)}s</span>
        <span>{study.duration}s</span>
      </div>
      <div className="sheet-section" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="sheet-label">
          <span>编辑第 3 镜字幕 · 词锚点重排</span>
          <span style={{ color: dirty ? 'var(--warm)' : 'var(--muted)' }}>
            {dirty ? 'DIRTY · 仅重生成 1 镜' : 'CLEAN'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={caption}
            onChange={(event) => onCaption(event.target.value)}
            aria-label="第三镜字幕"
            style={{
              flex: 1,
              background: '#0b0c0b',
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: '9px 10px',
              fontSize: 12,
            }}
          />
          <button className="btn btn-sm" type="button" onClick={onApply} disabled={!caption.trim()}>
            应用
          </button>
        </div>
        <p className="hint" style={{ marginTop: 8 }}>
          改一句文案，镜头、字幕、口播共享的词锚点会一起重排；只重渲染被改动的镜头。
        </p>
      </div>
    </div>
  );
}

function VariantCover({ study, index, hook }: { study: CaseStudy; index: number; hook: string }) {
  return (
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
      <div className="vhook" style={{ color: study.palette.paper }}>
        {hook}
      </div>
    </div>
  );
}

function StudioBody() {
  const route = useRoute();
  const initial = getCase(route.query.get('case') ?? undefined);
  const autoRun = route.query.get('run') === '1';
  const startStep = Math.min(3, Math.max(1, Number(route.query.get('step') ?? '1') || 1));
  const [caseId, setCaseId] = useState(initial.id);
  const [url, setUrl] = useState(route.query.get('url') ?? initial.demoUrl);
  const [phase, setPhase] = useState<Phase>(
    autoRun ? 'analyzing' : startStep >= 3 ? 'variants' : startStep === 2 ? 'replica' : 'idle',
  );
  const [step, setStep] = useState(startStep);
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [progress, setProgress] = useState(0);
  const [replicaBuilt, setReplicaBuilt] = useState(startStep >= 2);
  const [caption, setCaption] = useState('');
  const [dirty, setDirty] = useState(false);
  const [generatingVariants, setGeneratingVariants] = useState(false);
  const [revealed, setRevealed] = useState(startStep >= 3 ? 10 : 0);
  const [dimensions, setDimensions] = useState<string[]>(['钩子', '人群', '场景']);
  const [toast, setToast] = useState('');
  const timers = useRef<number[]>([]);
  const study = useMemo(() => getCase(caseId), [caseId]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => {
    setCaption(study.shots[2].caption);
  }, [study]);

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(''), 3400);
    return () => window.clearTimeout(id);
  }, [toast]);

  const runAnalysis = () => {
    clearTimers();
    setPhase('analyzing');
    setStep(1);
    setLogs([]);
    setProgress(0);
    setReplicaBuilt(false);
    setRevealed(0);
    analysisLogs(study).forEach((log, index) => {
      const id = window.setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        setProgress(((index + 1) / analysisLogs(study).length) * 100);
      }, 620 * (index + 1));
      timers.current.push(id);
    });
    const done = window.setTimeout(() => {
      setPhase('report');
      setProgress(100);
      setToast('爆款基因报告已生成，可分享或直接复刻。');
    }, 620 * analysisLogs(study).length + 420);
    timers.current.push(done);
  };

  const started = useRef(false);
  useEffect(() => {
    if (autoRun && !started.current) {
      started.current = true;
      runAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRun]);

  const switchCase = (id: string) => {
    clearTimers();
    setCaseId(id);
    setUrl(getCase(id).demoUrl);
    setPhase('idle');
    setStep(1);
    setLogs([]);
    setProgress(0);
    setReplicaBuilt(false);
    setRevealed(0);
    setDirty(false);
    navigate(`/studio?case=${id}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const share = async () => {
    const link = `${window.location.origin}${window.location.pathname}#/report/${study.id}`;
    try {
      await copyText(link);
      setToast('报告链接已复制，可直接发给同事。');
    } catch {
      setToast(`报告链接：${link}`);
    }
  };

  const downloadDna = () => {
    download(`viralforge-${study.id}-dna.json`, JSON.stringify({ case: study.id, dna: study }, null, 2));
    setToast('dna.json 已下载。');
  };

  const downloadProject = () => {
    download(
      `viralforge-${study.id}-project.json`,
      JSON.stringify(buildProject(study, caption, dirty), null, 2),
    );
    setToast('VFML 工程已导出：project.json。');
  };

  const downloadVariants = () => {
    const header = '序号,钩子,角度,人群,成本(CNY)\n';
    const rows = study.variants
      .map((variant, index) => `${index + 1},"${variant.hook}",${variant.angle},${variant.audience},${variant.cost}`)
      .join('\n');
    download(`viralforge-${study.id}-variants.csv`, `${header}${rows}`, 'text/csv');
    setToast('10 条变体清单已导出（CSV）。');
  };

  const buildReplica = () => {
    setReplicaBuilt(false);
    setToast('正在生成可编辑工程 · 保留结构 / 替换内容');
    const id = window.setTimeout(() => {
      setReplicaBuilt(true);
      setToast(`复刻工程已生成：${study.shots.length} 个镜头，商品参考图已锁定。`);
    }, 1300);
    timers.current.push(id);
  };

  const generateVariants = () => {
    setGeneratingVariants(true);
    setRevealed(0);
    const timersList: number[] = [];
    study.variants.forEach((_, index) => {
      const id = window.setTimeout(() => {
        setRevealed(index + 1);
      }, 120 * (index + 1));
      timersList.push(id);
    });
    const done = window.setTimeout(() => {
      setGeneratingVariants(false);
      setToast('10 条变体脚本与封面已生成，渲染任务可导出。');
    }, 120 * study.variants.length + 300);
    timers.current.push(...timersList, done);
  };

  const goStep = (next: number) => {
    if (next === 2 && phase !== 'report' && !replicaBuilt) return;
    if (next === 3 && !replicaBuilt) return;
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (next === 2) setPhase('replica');
    if (next === 3) setPhase('variants');
  };

  const replicaCost = study.replica.cost + (dirty ? 0.18 : 0);
  return (
    <div className="studio">
      <div className="container">
        <div className="studio-head">
          <div>
            <span className="eyebrow">STUDIO · {study.platform}</span>
            <h1>拆解、复刻、批量变体。</h1>
            <p>
              当前案例：{study.brand} · {study.product} · {study.duration}s
            </p>
          </div>
          <div className="case-switch" role="tablist" aria-label="切换案例">
            {cases.map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={item.id === caseId}
                className={item.id === caseId ? 'active' : ''}
                key={item.id}
                onClick={() => switchCase(item.id)}
              >
                {item.category.split(' · ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="stepper">
          {[
            { n: 1, title: '拆解', sub: 'DECONSTRUCT · 免费' },
            { n: 2, title: '复刻', sub: 'REPLICATE · 可编辑' },
            { n: 3, title: '批量变体', sub: 'VARIANTS · 10 条' },
          ].map((item) => {
            const disabled = (item.n === 2 && phase !== 'report' && !replicaBuilt) || (item.n === 3 && !replicaBuilt);
            return (
              <button
                type="button"
                className={`step-item ${step === item.n ? 'active' : ''} ${step > item.n ? 'done' : ''}`}
                key={item.n}
                onClick={() => goStep(item.n)}
                disabled={disabled}
              >
                <span className="n">{step > item.n ? <Check style={{ width: 11, height: 11 }} /> : String(item.n).padStart(2, '0')}</span>
                <span>
                  <b>{item.title}</b>
                  <span>{item.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        {step === 1 && (
          <div className="studio-grid">
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="panel panel-pad">
                <span className="mono" style={{ color: 'var(--acid)' }}>
                  01 / INPUT
                </span>
                <h2 className="h3" style={{ margin: '10px 0 6px' }}>
                  贴一条爆款，先拆了它。
                </h2>
                <p className="hint" style={{ marginBottom: 16 }}>
                  演示环境会把链接映射到 3 个预置案例；本地 CLI 对任意视频做真实的镜头切分、词级对齐与节拍检测。
                </p>
                <div className="urlbar" style={{ maxWidth: '100%' }}>
                  <LinkIcon />
                  <input
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    aria-label="爆款视频链接"
                    placeholder="粘贴链接，或选择下面的案例"
                  />
                  <button
                    className="btn"
                    type="button"
                    onClick={runAnalysis}
                    disabled={phase === 'analyzing'}
                  >
                    {phase === 'analyzing' ? '拆解中…' : '开始拆解'} <Scan />
                  </button>
                </div>
                <div className="samples" style={{ marginTop: 12 }}>
                  <span>案例</span>
                  {cases.map((item) => (
                    <button
                      className="chip"
                      type="button"
                      key={item.id}
                      onClick={() => switchCase(item.id)}
                    >
                      {item.category.split(' · ')[0]} · {item.product}
                    </button>
                  ))}
                </div>
                <div className="tag-row" style={{ marginTop: 16 }}>
                  <span className="tag acid">免费</span>
                  <span className="tag">无需登录</span>
                  <span className="tag">报告可分享</span>
                  <span className="tag">dna.json 可下载</span>
                </div>
              </div>

              <Console logs={logs} running={phase === 'analyzing'} progress={progress} />

              {phase === 'report' && (
                <div className="panel panel-pad">
                  <div className="sheet-label">
                    <span>分析结论</span>
                    <span>{study.shots.length} 镜 · {study.words.length} 词锚点</span>
                  </div>
                  <div className="insight-list">
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
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              {phase === 'report' || logs.length > 0 ? (
                <>
                  <ReportSheet
                    study={study}
                    onReplicate={() => goStep(2)}
                    onShare={share}
                    onDownload={downloadDna}
                  />
                  <div className="panel panel-pad">
                    <div className="sheet-label">
                      <span>下一步</span>
                      <span>NEXT</span>
                    </div>
                    <p className="hint" style={{ marginBottom: 12 }}>
                      结构已经拿到。保留钩子与节奏，换掉产品、脚本与人物，生成可编辑的新视频。
                    </p>
                    <button className="btn" type="button" onClick={() => goStep(2)} style={{ width: '100%' }}>
                      <Layers /> 用这条基因复刻
                    </button>
                  </div>
                </>
              ) : (
                <div className="panel panel-pad" style={{ minHeight: 420, display: 'grid', placeItems: 'center' }}>
                  <div style={{ textAlign: 'center', maxWidth: 280 }}>
                    <div style={{ width: 64, margin: '0 auto 18px' }}>
                      <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
                    </div>
                    <h3 className="h3">等待拆解</h3>
                    <p className="hint" style={{ marginTop: 8 }}>
                      点「开始拆解」，约 5 秒后生成钩子、结构、逐镜与可迁移公式。
                    </p>
                    <div className="tag-row" style={{ justifyContent: 'center', marginTop: 14 }}>
                      <span className="tag">DEMO</span>
                      <span className="tag acid">{study.platform}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="studio-grid">
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="panel panel-pad">
                <span className="mono" style={{ color: 'var(--acid)' }}>
                  02 / REPLICATE
                </span>
                <h2 className="h3" style={{ margin: '10px 0 6px' }}>
                  保留结构，换掉内容。
                </h2>
                <p className="hint" style={{ marginBottom: 18 }}>
                  商品参考图会约束每个镜头；文案以词为锚点，改一句不会把时间轴弄乱。
                </p>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="product">产品</label>
                    <input id="product" defaultValue={study.product} />
                  </div>
                  <div className="field">
                    <label htmlFor="persona">口播人设</label>
                    <input id="persona" defaultValue="25–32 岁通勤女性，语速快" />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="points">卖点（逗号分隔）</label>
                  <input id="points" defaultValue={study.replica.sellingPoints.join('、')} />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="ratio">比例</label>
                    <select id="ratio" defaultValue="9:16">
                      <option>9:16</option>
                      <option>1:1</option>
                      <option>16:9</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="duration">时长</label>
                    <select id="duration" defaultValue={`${study.duration}s`}>
                      <option>{study.duration}s</option>
                      <option>15s</option>
                      <option>30s</option>
                    </select>
                  </div>
                </div>
                <div className="tag-row" style={{ marginBottom: 16 }}>
                  <span className="tag acid">
                    <Lock style={{ width: 9, height: 9 }} /> 商品参考图约束
                  </span>
                  <span className="tag">授权数字人</span>
                  <span className="tag">AI 标识</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn" type="button" onClick={buildReplica}>
                    {replicaBuilt ? '重新生成工程' : '生成复刻工程'} <Arrow />
                  </button>
                  {replicaBuilt && (
                    <>
                      <button className="btn btn-ghost" type="button" onClick={downloadProject}>
                        <Download /> 导出 VFML
                      </button>
                      <button className="btn btn-ghost" type="button" onClick={() => goStep(3)}>
                        <Grid /> 去批量变体
                      </button>
                    </>
                  )}
                </div>
                <div className="cost-bar">
                  <div>
                    <span>复刻成本</span>
                    <b>{money(replicaCost)}</b>
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
                    <span>重生成</span>
                    <b>{dirty ? '1 镜' : '0 镜'}</b>
                  </div>
                </div>
              </div>

              {replicaBuilt && (
                <TimelineEditor
                  study={study}
                  caption={caption}
                  dirty={dirty}
                  onCaption={setCaption}
                  onApply={() => {
                    setDirty(true);
                    setToast('第 3 镜已标记 DIRTY，只重生成这一镜（+¥0.18）。');
                  }}
                />
              )}
            </div>

            <div style={{ display: 'grid', gap: 16 }}>
              {replicaBuilt ? (
                <VideoFrame study={study} controls />
              ) : (
                <div className="panel panel-pad" style={{ minHeight: 420, display: 'grid', placeItems: 'center' }}>
                  <div style={{ textAlign: 'center', maxWidth: 260 }}>
                    <div style={{ width: 82, margin: '0 auto 16px' }}>
                      <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
                    </div>
                    <h3 className="h3">工程预览</h3>
                    <p className="hint" style={{ marginTop: 8 }}>
                      生成后会在这里看到成片与 VFML 时间轴。成片为预渲染演示资产，已标识 AI 生成。
                    </p>
                  </div>
                </div>
              )}
              <ReplicaSummary study={study} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div className="panel panel-pad">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <span className="mono" style={{ color: 'var(--acid)' }}>
                    03 / VARIANTS
                  </span>
                  <h2 className="h3" style={{ margin: '10px 0 4px' }}>
                    一条命令，10 个版本。
                  </h2>
                  <p className="hint">换钩子、换人群、换场景，逐条标成本，用于广告 A/B 测试。</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <button className="btn" type="button" onClick={generateVariants} disabled={generatingVariants}>
                    {generatingVariants ? '生成中…' : '生成 10 个变体'} <Grid />
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={downloadVariants}>
                    <Download /> 导出清单
                  </button>
                </div>
              </div>
              <div className="variant-controls" style={{ marginTop: 16, marginBottom: 0 }}>
                <span className="mono" style={{ color: 'var(--muted)' }}>
                  变体维度
                </span>
                {DIMENSIONS.map((dimension) => {
                  const active = dimensions.includes(dimension);
                  return (
                    <button
                      className="chip"
                      type="button"
                      key={dimension}
                      onClick={() =>
                        setDimensions((prev) =>
                          prev.includes(dimension)
                            ? prev.filter((item) => item !== dimension)
                            : [...prev, dimension],
                        )
                      }
                      style={
                        active
                          ? { borderColor: 'var(--acid)', color: 'var(--acid)', background: 'rgba(201,255,61,.06)' }
                          : undefined
                      }
                    >
                      {active ? <Check style={{ width: 10, height: 10 }} /> : null}
                      {dimension}
                    </button>
                  );
                })}
                <span className="mono" style={{ marginLeft: 'auto', color: 'var(--muted)' }}>
                  10 条 · {money(totalVariantCost(study))} · 预计 3 分 12 秒
                </span>
              </div>
            </div>

            <div className="panel panel-pad">
              {revealed === 0 && !generatingVariants ? (
                <div style={{ padding: '46px 0', textAlign: 'center' }}>
                  <div style={{ width: 56, margin: '0 auto 14px' }}>
                    <ProductArt kind={study.id as 'glow' | 'tote' | 'lamp'} accent={study.palette.accent} />
                  </div>
                  <h3 className="h3">10 条变体待生成</h3>
                  <p className="hint" style={{ maxWidth: 460, margin: '8px auto 18px' }}>
                    每条变体保留原片结构，只替换钩子、人群与场景。生成后显示单条成本与总成本。
                  </p>
                  <button className="btn" type="button" onClick={generateVariants}>
                    <Play /> 生成变体
                  </button>
                </div>
              ) : (
                <>
                  <div className="variant-grid">
                    {study.variants.slice(0, revealed).map((variant, index) => (
                      <div
                        className="variant-card"
                        key={variant.id}
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <VariantCover study={study} index={index} hook={variant.hook} />
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
                  {generatingVariants && revealed < study.variants.length && (
                    <p className="hint" style={{ marginTop: 14 }}>
                      正在生成 {revealed}/{study.variants.length} 条…
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="panel panel-pad">
              <div className="sheet-label">
                <span>成本账单</span>
                <span>COST LEDGER</span>
              </div>
              <div className="cost-bar" style={{ marginTop: 0 }}>
                <div>
                  <span>拆解</span>
                  <b>¥0.00</b>
                </div>
                <div>
                  <span>复刻（{dirty ? '含 1 镜重生成' : `${study.shots.length} 镜`}）</span>
                  <b>{money(replicaCost)}</b>
                </div>
                <div>
                  <span>10 条变体</span>
                  <b>{money(totalVariantCost(study))}</b>
                </div>
                <div>
                  <span>总计 / 预计耗时</span>
                  <b>{money(replicaCost + totalVariantCost(study))} · 3m12s</b>
                </div>
              </div>
              <p className="hint" style={{ marginTop: 12 }}>
                成本口径：按镜头生成次数 × 模型单价估算；演示环境不产生真实模型费用。
                视频渲染需接入模型或 WearAI 云端 worker；当前 demo 生成脚本、封面与成本预估。
              </p>
            </div>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}

export function StudioPage() {
  return (
    <Layout>
      <StudioBody />
    </Layout>
  );
}
