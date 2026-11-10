export type Shot = {
  id: string;
  start: number;
  end: number;
  wordStart: number;
  wordEnd: number;
  label: string;
  caption: string;
  camera: string;
  productLock: boolean;
};

export type StructureSegment = {
  name: string;
  start: number;
  end: number;
  purpose: string;
};

export type Insight = {
  title: string;
  body: string;
};

export type Variant = {
  id: string;
  hook: string;
  angle: string;
  audience: string;
  cost: number;
  tag: string;
};

export type CaseStudy = {
  id: string;
  brand: string;
  product: string;
  category: string;
  platform: string;
  title: string;
  subtitle: string;
  duration: number;
  bpm: number;
  score: number;
  video: string;
  cover: string;
  palette: {
    accent: string;
    paper: string;
    ink: string;
    soft: string;
  };
  stats: {
    views: string;
    likes: string;
    shares: string;
    completion: string;
  };
  hook: {
    line: string;
    type: string;
    seconds: number;
    retention3s: number;
    why: string;
  };
  structure: StructureSegment[];
  shots: Shot[];
  words: string[];
  radar: { label: string; value: number }[];
  formula: string;
  insights: Insight[];
  transcript: string;
  replica: {
    title: string;
    persona: string;
    sellingPoints: string[];
    script: { time: string; line: string }[];
    cost: number;
    renderTime: string;
  };
  variants: Variant[];
  refFrames: { label: string; caption: string; tone: string }[];
  demoUrl: string;
};

export const cases: CaseStudy[] = [
  {
    id: 'glow',
    brand: 'GLOW LAB',
    product: '5% 烟酰胺精华',
    category: '美妆 · 护肤',
    platform: '抖音',
    title: '熬夜脸，还有救',
    subtitle: '一条 15 秒的「反常识 + 前后对比」种草片',
    duration: 15,
    bpm: 96,
    score: 92,
    video: 'media/glow.mp4',
    cover: 'media/glow-cover.jpg',
    palette: { accent: '#C9FF3D', paper: '#EFEBDD', ink: '#12150F', soft: '#8B9678' },
    stats: { views: '312.4万', likes: '18.7万', shares: '2.4万', completion: '41.2%' },
    hook: {
      line: '别再交智商税了。',
      type: '反常识否定 + 结果前置',
      seconds: 2.4,
      retention3s: 78,
      why: '第一句先否定用户过去的购买行为，制造「我是不是买错了」的紧张感；紧接皮肤检测仪特写，把口头断言变成可视证据。',
    },
    structure: [
      { name: '钩子', start: 0, end: 2.4, purpose: '否定 + 证据，抢 3 秒' },
      { name: '痛点', start: 2.4, end: 5.2, purpose: '暗沉 / 卡粉 / 没光，三连击中' },
      { name: '解释', start: 5.2, end: 8.2, purpose: '单一成分 + 微囊包裹' },
      { name: '证明', start: 8.2, end: 11.6, purpose: '第 1 天 / 第 7 天对比' },
      { name: '行动', start: 11.6, end: 15, purpose: '先领小样，降低决策成本' },
    ],
    shots: [
      { id: 's1', start: 0, end: 1.2, wordStart: 0, wordEnd: 2, label: '检测仪怼脸', caption: '别再交智商税了。', camera: '微距 / 硬光', productLock: false },
      { id: 's2', start: 1.2, end: 2.4, wordStart: 2, wordEnd: 4, label: '数值特写', caption: '你的脸，根本不缺营养。', camera: '特写 / 推', productLock: false },
      { id: 's3', start: 2.4, end: 5.2, wordStart: 4, wordEnd: 10, label: '三个痛点', caption: '暗沉、卡粉、没光。', camera: '快切 / 手持', productLock: false },
      { id: 's4', start: 5.2, end: 8.2, wordStart: 10, wordEnd: 16, label: '产品入场', caption: '5% 烟酰胺，微囊包裹。', camera: '中景 / 环绕', productLock: true },
      { id: 's5', start: 8.2, end: 11.6, wordStart: 16, wordEnd: 22, label: '前后对比', caption: '第 1 天，和第 7 天。', camera: '分屏 / 固定', productLock: true },
      { id: 's6', start: 11.6, end: 15, wordStart: 22, wordEnd: 26, label: '行动号召', caption: '先领小样，再决定。', camera: '中景 / 光晕', productLock: true },
    ],
    words: ['别再', '交智商税了', '你的脸', '根本不缺营养', '暗沉', '卡粉', '没光', '5%', '烟酰胺', '微囊包裹', '第 1 天', '第 7 天', '先领小样', '再决定'],
    radar: [
      { label: '钩子', value: 95 },
      { label: '节奏', value: 88 },
      { label: '情绪', value: 84 },
      { label: '清晰', value: 91 },
      { label: '转化', value: 90 },
    ],
    formula: '反常识否定（别再…）→ 三个具体痛点 → 单一成分证据 → 7 天前后对比 → 低门槛行动（先领小样）。',
    insights: [
      { title: '前 0.8 秒先「否定」', body: '把「划走」变成「等一下」。否定句比疑问句更容易触发自我辩护，检测仪特写紧接着提供证据感。' },
      { title: '产品第 5 秒才出现', body: '前 5 秒用痛点占住注意力，产品只负责「解释」，不负责「留人」。这是种草片和品牌片最大的区别。' },
      { title: '字幕比口播早 0.2 秒', body: '观众先看到字、再听到声，制造「我先知道了」的优越感，完播率因此被抬高。' },
      { title: '结尾不喊「快买」', body: '「先领小样」把决策成本降到最低，评论区留资率比直接挂车高 1.7 倍。' },
    ],
    transcript: '别再交智商税了。你的脸根本不缺营养。暗沉、卡粉、没光。5% 烟酰胺，微囊包裹。第 1 天，和第 7 天。先领小样，再决定。',
    replica: {
      title: '熬夜脸，7 天有光',
      persona: '25–32 岁通勤女性，语速快，像朋友劝你别乱买',
      sellingPoints: ['5% 烟酰胺', '微囊缓释', '7 天光泽', '先领小样'],
      script: [
        { time: '0.0–2.4s', line: '别再往脸上堆瓶瓶罐罐了。' },
        { time: '2.4–5.2s', line: '熬夜、卡粉、没光，问题不在粉底。' },
        { time: '5.2–8.2s', line: '5% 烟酰胺，微囊包裹，慢慢释放。' },
        { time: '8.2–11.6s', line: '第 1 天，和第 7 天。' },
        { time: '11.6–15s', line: '先领小样，再决定。' },
      ],
      cost: 1.86,
      renderTime: '2 分 41 秒',
    },
    variants: [
      { id: 'g1', hook: '别再交智商税了', angle: '反常识否定', audience: '成分党', cost: 0.42, tag: '钩子' },
      { id: 'g2', hook: '熬夜到 3 点，第二天像睡了 8 小时', angle: '结果前置', audience: '熬夜党', cost: 0.51, tag: '场景' },
      { id: 'g3', hook: '皮肤科医生不会告诉你的 1 个成分', angle: '权威悬念', audience: '成分党', cost: 0.38, tag: '钩子' },
      { id: 'g4', hook: '300 块的精华，和 30 块的差在哪', angle: '价格对比', audience: '学生党', cost: 0.46, tag: '价格' },
      { id: 'g5', hook: '卡粉不是粉底的错', angle: '归因反转', audience: '干皮', cost: 0.33, tag: '痛点' },
      { id: 'g6', hook: '我把检测仪怼在脸上，结果…', angle: '实验测评', audience: '理性党', cost: 0.55, tag: '证据' },
      { id: 'g7', hook: '7 天，只改了这一件事', angle: '挑战记录', audience: '懒人', cost: 0.49, tag: '证明' },
      { id: 'g8', hook: '敏感肌先别买，看完再说', angle: '风险提示', audience: '敏感肌', cost: 0.36, tag: '信任' },
      { id: 'g9', hook: '男朋友以为我去做了项目', angle: '社交证明', audience: '约会人群', cost: 0.44, tag: '情绪' },
      { id: 'g10', hook: '早八人 3 分钟出门的秘密', angle: '场景效率', audience: '通勤族', cost: 0.40, tag: '场景' },
    ],
    refFrames: [
      { label: '00:00', caption: '检测仪怼脸，硬光', tone: 'cold' },
      { label: '00:05', caption: '产品白底中景', tone: 'light' },
      { label: '00:09', caption: '左右分屏对比', tone: 'warm' },
    ],
    demoUrl: 'https://www.douyin.com/video/demo-glow',
  },
  {
    id: 'tote',
    brand: 'AER',
    product: '通勤托特包',
    category: '鞋包 · 配饰',
    platform: '小红书',
    title: '装得下电脑，还不像去上班',
    subtitle: '一条 14 秒的「场景反差 + 细节证据」带货片',
    duration: 14,
    bpm: 112,
    score: 89,
    video: 'media/tote.mp4',
    cover: 'media/tote-cover.jpg',
    palette: { accent: '#FF5A2B', paper: '#F1EEE6', ink: '#101010', soft: '#9B9488' },
    stats: { views: '186.2万', likes: '12.1万', shares: '1.8万', completion: '38.6%' },
    hook: {
      line: '能装下 14 寸电脑的包，都长得像去开会。',
      type: '身份反差 + 具体数字',
      seconds: 2.6,
      retention3s: 74,
      why: '把「大容量」和「不好看」的刻板印象摆到台面上，再用「不像去上班」给出反差承诺；14 寸是打工人秒懂的硬指标。',
    },
    structure: [
      { name: '钩子', start: 0, end: 2.6, purpose: '刻板印象 + 反差承诺' },
      { name: '场景', start: 2.6, end: 5.4, purpose: '通勤 / 出差 / 带娃' },
      { name: '细节', start: 5.4, end: 8.4, purpose: '材质、分区、电脑层' },
      { name: '证明', start: 8.4, end: 11.4, purpose: '装下全部，还不鼓' },
      { name: '行动', start: 11.4, end: 14, purpose: '三色，通勤直接背' },
    ],
    shots: [
      { id: 't1', start: 0, end: 1.3, wordStart: 0, wordEnd: 4, label: '电脑塞进包', caption: '能装下 14 寸电脑的包，都像去开会。', camera: '俯拍 / 快切', productLock: true },
      { id: 't2', start: 1.3, end: 2.6, wordStart: 4, wordEnd: 7, label: '上身转身', caption: '直到我背了这只。', camera: '全身 / 跟拍', productLock: true },
      { id: 't3', start: 2.6, end: 5.4, wordStart: 7, wordEnd: 13, label: '三个场景', caption: '通勤、出差、带娃。', camera: '三连切 / 手持', productLock: true },
      { id: 't4', start: 5.4, end: 8.4, wordStart: 13, wordEnd: 19, label: '材质细节', caption: '一整块植鞣皮，越用越软。', camera: '微距 / 侧光', productLock: true },
      { id: 't5', start: 8.4, end: 11.4, wordStart: 19, wordEnd: 24, label: '分区展示', caption: '13 个分区，电脑还有独立层。', camera: '俯拍 / 手部', productLock: true },
      { id: 't6', start: 11.4, end: 14, wordStart: 24, wordEnd: 28, label: '三色收尾', caption: '三个颜色，通勤直接背。', camera: '中景 / 平推', productLock: true },
    ],
    words: ['能装下', '14 寸电脑', '都像去开会', '直到我背了这只', '通勤', '出差', '带娃', '一整块植鞣皮', '越用越软', '13 个分区', '独立电脑层', '三个颜色', '直接背'],
    radar: [
      { label: '钩子', value: 90 },
      { label: '节奏', value: 85 },
      { label: '情绪', value: 79 },
      { label: '清晰', value: 93 },
      { label: '转化', value: 86 },
    ],
    formula: '身份反差（不像上班）→ 三个具体场景 → 材质/分区细节 → 一包三用 → 颜色收尾。',
    insights: [
      { title: '用「14 寸」代替「大容量」', body: '具体数字比形容词可信。打工人不需要想象，只需要确认自己的电脑装得下。' },
      { title: '先承认刻板印象，再打破它', body: '「都像去开会」替用户说出偏见，后面的反差才成立；直接说「好看又能装」会显得像广告。' },
      { title: '细节镜头负责溢价', body: '植鞣皮、走线、五金，三个微距镜头把「100 多块的包」讲出了「轻奢」的质感。' },
      { title: '场景三连切，扩大人群', body: '通勤、出差、带娃，三个场景对应三类人，评论区自然分成三派吵架，互动率被拉高。' },
    ],
    transcript: '能装下 14 寸电脑的包，都长得像去开会。直到我背了这只。通勤、出差、带娃。一整块植鞣皮，越用越软。13 个分区，电脑还有独立层。三个颜色，通勤直接背。',
    replica: {
      title: '一只包，顶三只',
      persona: '28–35 岁都市通勤者，克制、不喊卖',
      sellingPoints: ['14 寸电脑层', '13 个分区', '植鞣皮', '三种背法'],
      script: [
        { time: '0.0–2.6s', line: '能装下 14 寸电脑的包，都像去开会。' },
        { time: '2.6–5.4s', line: '直到我背了这只。通勤、出差、带娃。' },
        { time: '5.4–8.4s', line: '一整块植鞣皮，越用越软。' },
        { time: '8.4–11.4s', line: '13 个分区，电脑还有独立层。' },
        { time: '11.4–14s', line: '三个颜色，通勤直接背。' },
      ],
      cost: 1.72,
      renderTime: '2 分 28 秒',
    },
    variants: [
      { id: 't1', hook: '装得下 14 寸电脑，还不像去上班', angle: '身份反差', audience: '通勤族', cost: 0.44, tag: '钩子' },
      { id: 't2', hook: '通勤包，我只留这一只', angle: '极简选择', audience: '极简党', cost: 0.35, tag: '人群' },
      { id: 't3', hook: '13 个分区，找钥匙不用翻', angle: '细节痛点', audience: '收纳控', cost: 0.39, tag: '细节' },
      { id: 't4', hook: '出差 3 天，一只包够了', angle: '场景效率', audience: '差旅党', cost: 0.47, tag: '场景' },
      { id: 't5', hook: '当妈以后，包反而变小了', angle: '身份反转', audience: '宝妈', cost: 0.43, tag: '情绪' },
      { id: 't6', hook: '植鞣皮，越用越像你的', angle: '材质故事', audience: '质感党', cost: 0.52, tag: '材质' },
      { id: 't7', hook: '小个子背大包，居然不压身高', angle: '身材顾虑', audience: '小个子', cost: 0.38, tag: '痛点' },
      { id: 't8', hook: '面试背它，HR 以为我很贵', angle: '社交证明', audience: '职场新人', cost: 0.46, tag: '情绪' },
      { id: 't9', hook: '下雨天，电脑还在包里', angle: '风险场景', audience: '雨天通勤', cost: 0.41, tag: '场景' },
      { id: 't10', hook: '一只包，三种背法', angle: '一物多用', audience: '实用党', cost: 0.36, tag: '卖点' },
    ],
    refFrames: [
      { label: '00:00', caption: '电脑塞进包，俯拍', tone: 'cold' },
      { label: '00:06', caption: '皮质微距，侧光', tone: 'warm' },
      { label: '00:12', caption: '三色平推收尾', tone: 'light' },
    ],
    demoUrl: 'https://www.xiaohongshu.com/explore/demo-tote',
  },
  {
    id: 'lamp',
    brand: 'MORI',
    product: '香薰氛围灯',
    category: '家居 · 氛围',
    platform: '抖音',
    title: '30 块，把出租屋变成样板间',
    subtitle: '一条 13 秒的「价格锚点 + 氛围对比」种草片',
    duration: 13,
    bpm: 72,
    score: 94,
    video: 'media/lamp.mp4',
    cover: 'media/lamp-cover.jpg',
    palette: { accent: '#FFB347', paper: '#F4E8D6', ink: '#1A120B', soft: '#8C6239' },
    stats: { views: '428.9万', likes: '26.3万', shares: '3.9万', completion: '44.1%' },
    hook: {
      line: '房东的破出租屋，被我 30 块改了。',
      type: '价格反差 + 改造叙事',
      seconds: 2.2,
      retention3s: 81,
      why: '「房东的破出租屋」是强身份共鸣，「30 块」是价格钩子，「被我改了」是结果承诺。三个信息在 8 个字里完成。',
    },
    structure: [
      { name: '钩子', start: 0, end: 2.2, purpose: '身份 + 价格 + 结果' },
      { name: '对比', start: 2.2, end: 4.8, purpose: '关灯 / 开灯，一秒入戏' },
      { name: '细节', start: 4.8, end: 8.0, purpose: '三档光、香薰、定时' },
      { name: '场景', start: 8.0, end: 10.8, purpose: '睡前 10 分钟' },
      { name: '行动', start: 10.8, end: 13, purpose: '30 块，先买氛围' },
    ],
    shots: [
      { id: 'l1', start: 0, end: 1.1, wordStart: 0, wordEnd: 3, label: '关灯前的房间', caption: '房东的破出租屋，被我 30 块改了。', camera: '广角 / 冷光', productLock: false },
      { id: 'l2', start: 1.1, end: 2.2, wordStart: 3, wordEnd: 6, label: '开灯瞬间', caption: '只开了一盏灯。', camera: '特写 / 暖光', productLock: true },
      { id: 'l3', start: 2.2, end: 4.8, wordStart: 6, wordEnd: 11, label: '前后对比', caption: '关灯，和开灯。', camera: '分屏 / 固定', productLock: true },
      { id: 'l4', start: 4.8, end: 8.0, wordStart: 11, wordEnd: 17, label: '三档光', caption: '三档暖光，无极调光。', camera: '微距 / 手部', productLock: true },
      { id: 'l5', start: 8.0, end: 10.8, wordStart: 17, wordEnd: 22, label: '睡前场景', caption: '睡前 10 分钟，房间先安静。', camera: '中景 / 慢推', productLock: true },
      { id: 'l6', start: 10.8, end: 13, wordStart: 22, wordEnd: 26, label: '价格收尾', caption: '30 块，先买氛围。', camera: '静物 / 光晕', productLock: true },
    ],
    words: ['房东的', '破出租屋', '30 块改了', '只开了一盏灯', '关灯', '开灯', '三档暖光', '无极调光', '睡前 10 分钟', '房间先安静', '30 块', '先买氛围'],
    radar: [
      { label: '钩子', value: 97 },
      { label: '节奏', value: 90 },
      { label: '情绪', value: 93 },
      { label: '清晰', value: 88 },
      { label: '转化', value: 92 },
    ],
    formula: '价格反差（30 块）→ 关灯/开灯一秒对比 → 三个具体功能 → 睡前场景 → 低客单行动。',
    insights: [
      { title: '先给「改不起」的共鸣', body: '「房东的破出租屋」让租房党瞬间代入；不是卖灯，是卖「我也能把生活改一点」的希望。' },
      { title: '开关灯是天然的前后对比', body: '不需要滤镜，不需要布景，一个开关就是最强的视觉证据。这是家居品类独有的结构红利。' },
      { title: '价格在钩子里就给了', body: '30 块不是结尾的促销，而是开头的好奇心。价格越早出现，越像「分享」而不是「广告」。' },
      { title: '卖的是睡前 10 分钟', body: '功能只讲 3 秒，剩下讲情绪。用户记住的不是三档光，是「房间先安静下来」的那口气。' },
    ],
    transcript: '房东的破出租屋，被我 30 块改了。只开了一盏灯。关灯，和开灯。三档暖光，无极调光。睡前 10 分钟，房间先安静。30 块，先买氛围。',
    replica: {
      title: '出租屋的 30 块改造',
      persona: '24–30 岁独居租房党，松弛、像在分享生活',
      sellingPoints: ['三档暖光', '无极调光', '香薰', '定时'],
      script: [
        { time: '0.0–2.2s', line: '房东的破出租屋，被我 30 块改了。' },
        { time: '2.2–4.8s', line: '只开了一盏灯。关灯，和开灯。' },
        { time: '4.8–8.0s', line: '三档暖光，无极调光，还能定时。' },
        { time: '8.0–10.8s', line: '睡前 10 分钟，房间先安静。' },
        { time: '10.8–13s', line: '30 块，先买氛围。' },
      ],
      cost: 1.64,
      renderTime: '2 分 19 秒',
    },
    variants: [
      { id: 'l1', hook: '30 块，把出租屋改成样板间', angle: '价格反差', audience: '租房党', cost: 0.40, tag: '钩子' },
      { id: 'l2', hook: '不开大灯的第 7 天，电费少了', angle: '结果记录', audience: '独居', cost: 0.45, tag: '场景' },
      { id: 'l3', hook: '睡前 10 分钟，房间先安静', angle: '情绪场景', audience: '失眠党', cost: 0.37, tag: '情绪' },
      { id: 'l4', hook: '房东不让我刷墙，我买了它', angle: '限制反转', audience: '租房党', cost: 0.42, tag: '钩子' },
      { id: 'l5', hook: '独居女生，一定要有一盏暖光', angle: '身份召唤', audience: '独居女性', cost: 0.39, tag: '人群' },
      { id: 'l6', hook: '拍照不用滤镜，是灯的原因', angle: '结果证明', audience: '拍照党', cost: 0.48, tag: '证据' },
      { id: 'l7', hook: '三档光，三种情绪', angle: '功能可视化', audience: '氛围党', cost: 0.34, tag: '卖点' },
      { id: 'l8', hook: '合租也能拥有自己的角落', angle: '空间痛点', audience: '合租党', cost: 0.41, tag: '场景' },
      { id: 'l9', hook: '送朋友，她以为要 300', angle: '社交证明', audience: '送礼', cost: 0.46, tag: '价格' },
      { id: 'l10', hook: '关灯那一刻，班味散了', angle: '情绪释放', audience: '打工人', cost: 0.38, tag: '情绪' },
    ],
    refFrames: [
      { label: '00:00', caption: '冷光房间，广角', tone: 'cold' },
      { label: '00:02', caption: '开灯瞬间，暖光', tone: 'warm' },
      { label: '00:09', caption: '床头睡前场景', tone: 'warm' },
    ],
    demoUrl: 'https://www.douyin.com/video/demo-lamp',
  },
];

export const getCase = (id: string | undefined): CaseStudy =>
  cases.find((item) => item.id === id) ?? cases[0];

export const totalVariantCost = (item: CaseStudy): number =>
  item.variants.reduce((sum, variant) => sum + variant.cost, 0);
