import { useEffect } from 'react';
import { useReveal, useRoute } from './lib/router';
import { HomePage } from './pages/Home';
import { StudioPage } from './pages/Studio';
import { ReportPage } from './pages/Report';
import { CasePage } from './pages/Case';
import { DocsPage } from './pages/Docs';
import { Layout } from './components/Layout';

function NotFound() {
  return (
    <Layout>
      <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
        <span className="eyebrow">404 · NOT FOUND</span>
        <h1 className="h1" style={{ marginTop: 20 }}>
          这条链接，
          <br />
          拆不出东西。
        </h1>
        <p className="lead" style={{ margin: '18px auto 28px', maxWidth: 480 }}>
          页面不存在，或者已经被合并进别的案例。回首页重新贴一条链接。
        </p>
        <a className="btn" href="#/">
          回首页
        </a>
      </div>
    </Layout>
  );
}

function Router() {
  const route = useRoute();
  const [first, second] = route.segments;
  useReveal();

  useEffect(() => {
    const titles: Record<string, string> = {
      '': 'ViralForge · 贴个链接，把爆款拆开',
      studio: '工作台 · ViralForge',
      report: '爆款基因报告 · ViralForge',
      case: '发布案例 · ViralForge',
      docs: '开源文档 · ViralForge',
    };
    document.title = titles[first ?? ''] ?? 'ViralForge';
  }, [first]);

  if (!first) return <HomePage />;
  if (first === 'studio') return <StudioPage />;
  if (first === 'report' && second) return <ReportPage id={second} />;
  if (first === 'case' && second) return <CasePage id={second} />;
  if (first === 'docs') return <DocsPage />;
  return <NotFound />;
}

export default function App() {
  return <Router />;
}
