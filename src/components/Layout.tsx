import type { ReactNode } from 'react';
import { SparkMark } from './ProductArt';
import { ArrowUpRight, GitHub } from './Icons';
import { scrollToSection } from '../lib/router';

export function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#/" aria-label="ViralForge 首页">
          <SparkMark />
          VIRALFORGE
          <small>爆款工坊</small>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <button type="button" onClick={() => scrollToSection('capabilities')}>
            三层能力
          </button>
          <button type="button" onClick={() => scrollToSection('cases')}>
            发布案例
          </button>
          <button type="button" onClick={() => scrollToSection('architecture')}>
            架构
          </button>
          <a href="#/docs">开源</a>
        </nav>
        <div className="nav-actions">
          <a className="mono nav-doc" href="#/docs" style={{ color: 'var(--muted)' }}>
            DOCS
          </a>
          <a className="btn btn-sm" href="#/studio">
            打开工作台 <ArrowUpRight />
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>
              <SparkMark />
              VIRALFORGE
            </div>
            <p>
              贴一个爆款链接，拆出它的基因，用你的产品复刻，再批量出变体。
              开源拆解，云端复刻。
            </p>
            <div className="tag-row" style={{ marginTop: 16 }}>
              <span className="tag acid">Skill + MCP + CLI</span>
              <span className="tag">Apache-2.0</span>
              <span className="tag">v0.1 MVP</span>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <span>PRODUCT</span>
              <a href="#/studio">拆解工作台</a>
              <a href="#/case/glow">案例 · 美妆</a>
              <a href="#/case/tote">案例 · 鞋包</a>
              <a href="#/case/lamp">案例 · 家居</a>
            </div>
            <div className="footer-col">
              <span>OPEN SOURCE</span>
              <a href="#/docs">快速开始</a>
              <a href="#/docs">VFML 规范</a>
              <a href="#/docs">Skill / CLI / MCP</a>
              <a href="#/docs">架构与边界</a>
            </div>
            <div className="footer-col">
              <span>COMPANY</span>
              <a href="#/docs">关于 WearAI</a>
              <a href="#/docs">合规说明</a>
              <a href="#/docs">隐私</a>
              <a href="#/docs">联系</a>
            </div>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 VIRALFORGE · WEARAI CLOUD</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <GitHub style={{ width: 12, height: 12 }} /> 本地开源仓库 · 成片已标识 AI 生成
          </span>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
