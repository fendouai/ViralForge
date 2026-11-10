import { useId, type CSSProperties } from 'react';

type Props = {
  kind: 'glow' | 'tote' | 'lamp';
  className?: string;
  accent?: string;
};

export function ProductArt({ kind, className, accent }: Props) {
  const uid = useId().replace(/:/g, '');
  if (kind === 'glow') {
    return (
      <svg className={className} viewBox="0 0 240 360" role="img" aria-label="精华瓶产品示意">
        <defs>
          <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F7F4E8" stopOpacity="0.96" />
            <stop offset="0.55" stopColor="#D9D6C4" stopOpacity="0.9" />
            <stop offset="1" stopColor="#8F9A7A" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`${uid}-liquid`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={accent ?? '#C9FF3D'} stopOpacity="0.55" />
            <stop offset="1" stopColor="#6C7A4F" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`${uid}-cap`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2B2E26" />
            <stop offset="0.5" stopColor="#55594B" />
            <stop offset="1" stopColor="#1B1D18" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="338" rx="82" ry="12" fill="#0A0C08" opacity="0.22" />
        <rect x="94" y="34" width="52" height="28" rx="9" fill={`url(#${uid}-cap)`} />
        <rect x="102" y="60" width="36" height="42" rx="7" fill="#22251E" />
        <rect x="68" y="96" width="104" height="234" rx="26" fill={`url(#${uid}-glass)`} stroke="#F9F7EC" strokeOpacity="0.55" />
        <rect x="76" y="176" width="88" height="146" rx="18" fill={`url(#${uid}-liquid)`} />
        <rect x="76" y="176" width="88" height="8" fill="#F6F3E4" opacity="0.5" />
        <rect x="82" y="196" width="76" height="92" rx="4" fill="#F5F1E2" />
        <text x="120" y="221" textAnchor="middle" fontFamily="PingFang SC, sans-serif" fontSize="11" letterSpacing="3" fill="#1A1C15">GLOW LAB</text>
        <text x="120" y="245" textAnchor="middle" fontFamily="Helvetica Neue, sans-serif" fontSize="20" fontWeight="700" fill="#1A1C15">5%</text>
        <text x="120" y="262" textAnchor="middle" fontFamily="PingFang SC, sans-serif" fontSize="9" letterSpacing="1" fill="#3C4034">烟酰胺精华</text>
        <rect x="92" y="272" width="56" height="1" fill="#1A1C15" opacity="0.35" />
        <text x="120" y="285" textAnchor="middle" fontFamily="Helvetica Neue, sans-serif" fontSize="7" letterSpacing="2" fill="#3C4034">30 ML</text>
        <rect x="86" y="112" width="10" height="190" rx="5" fill="#FFFFFF" opacity="0.5" />
        <rect x="104" y="38" width="6" height="20" rx="3" fill="#FFFFFF" opacity="0.25" />
      </svg>
    );
  }

  if (kind === 'tote') {
    return (
      <svg className={className} viewBox="0 0 320 300" role="img" aria-label="托特包产品示意">
        <defs>
          <linearGradient id={`${uid}-leather`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3A2B21" />
            <stop offset="0.45" stopColor="#6B4A33" />
            <stop offset="0.75" stopColor="#4A3226" />
            <stop offset="1" stopColor="#2C1F18" />
          </linearGradient>
          <linearGradient id={`${uid}-edge`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#A97B52" />
            <stop offset="1" stopColor="#5C3B28" />
          </linearGradient>
        </defs>
        <ellipse cx="160" cy="278" rx="112" ry="14" fill="#000" opacity="0.18" />
        <path d="M104 92 C104 30 216 30 216 92" fill="none" stroke="#4A3226" strokeWidth="13" strokeLinecap="round" />
        <path d="M104 92 C104 34 216 34 216 92" fill="none" stroke={accent ?? '#FF5A2B'} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M62 88 L258 88 L282 252 C284 266 273 276 259 276 L61 276 C47 276 36 266 38 252 Z" fill={`url(#${uid}-leather)`} />
        <path d="M62 88 L258 88 L262 112 L58 112 Z" fill={`url(#${uid}-edge)`} opacity="0.9" />
        <path d="M72 116 L248 116" stroke="#D8B98C" strokeWidth="1.4" strokeDasharray="7 6" opacity="0.55" />
        <path d="M50 244 L270 244" stroke="#D8B98C" strokeWidth="1.2" strokeDasharray="7 6" opacity="0.35" />
        <rect x="132" y="160" width="56" height="34" rx="5" fill="#E9DFC9" opacity="0.92" />
        <text x="160" y="181" textAnchor="middle" fontFamily="Helvetica Neue, sans-serif" fontSize="14" fontWeight="700" letterSpacing="3" fill="#241A13">AER</text>
        <rect x="250" y="150" width="5" height="54" rx="2.5" fill="#C9A16F" opacity="0.8" />
        <path d="M76 132 C86 196 82 234 76 258" stroke="#fff" strokeOpacity="0.08" strokeWidth="16" fill="none" />
        <circle cx="160" cy="98" r="3" fill="#E9C58F" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 300 320" role="img" aria-label="氛围灯产品示意">
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={accent ?? '#FFB347'} stopOpacity="0.55" />
          <stop offset="0.55" stopColor={accent ?? '#FFB347'} stopOpacity="0.18" />
          <stop offset="1" stopColor={accent ?? '#FFB347'} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-dome`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF3DC" />
          <stop offset="0.5" stopColor="#FFD79A" />
          <stop offset="1" stopColor="#C98B3E" />
        </linearGradient>
        <linearGradient id={`${uid}-stem`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7A4E27" />
          <stop offset="0.5" stopColor="#C08A4E" />
          <stop offset="1" stopColor="#6B421F" />
        </linearGradient>
      </defs>
      <circle cx="150" cy="150" r="145" fill={`url(#${uid}-glow)`} />
      <ellipse cx="150" cy="286" rx="82" ry="12" fill="#000" opacity="0.18" />
      <ellipse cx="150" cy="276" rx="52" ry="10" fill="#5B3A1D" />
      <path d="M132 186 L126 262 L174 262 L168 186 Z" fill={`url(#${uid}-stem)`} />
      <path d="M60 172 C60 96 240 96 240 172 L240 180 C240 188 232 194 222 194 L78 194 C68 194 60 188 60 180 Z" fill={`url(#${uid}-dome)`} />
      <path d="M60 174 C60 100 240 100 240 174" fill="none" stroke="#FFF8E8" strokeWidth="3" opacity="0.65" />
      <ellipse cx="150" cy="193" rx="81" ry="10" fill="#FFE3B0" opacity="0.9" />
      <rect x="128" y="262" width="44" height="7" rx="3.5" fill="#3B2714" />
      <circle cx="150" cy="272" r="6" fill="#E9B45F" />
      <circle cx="150" cy="272" r="2.4" fill="#5A3B1B" />
      <path d="M98 120 C112 108 130 102 148 101" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function SparkMark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 1.5 19.6 11.2 29.5 14 20.8 19.2 18.2 29.5 14.8 20.4 4.5 18.2 13.4 13.7Z" fill="currentColor" />
    </svg>
  );
}
