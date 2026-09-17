import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ExternalLink,
  Code2,
  Layers,
  ArrowRight,
  RadioTower,
  CheckCircle2,
  Clock
} from 'lucide-react';
import {
  showcaseThemes,
  showcaseCategories,
  type ShowcaseCategory
} from '@login-hub/shared-data';

export const GalleryHome: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>('全部风格');

  const filteredThemes = showcaseThemes.filter((t) => {
    if (activeCategory === '全部风格') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="min-h-screen w-full bg-base text-ink relative selection:bg-signal selection:text-base">
      {/* Subtle background glow orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-signal/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-base/80 border-b border-line/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-signal/15 border border-signal/40 flex items-center justify-center shadow-[0_0_12px_rgba(58,224,198,0.25)]">
              <RadioTower className="w-4 h-4 text-signal" />
            </div>
            <div className="flex items-center gap-2 font-bold tracking-tight text-ink text-lg">
              <span>Login Hub</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-signal/10 border border-signal/30 text-signal">
                React
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-ink hover:text-emerald-400 hover:border-emerald-500/40 transition-all flex items-center gap-2 group"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Vue 3 画廊 (5174)</span>
              <ExternalLink className="w-3 h-3 text-muted group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="https://github.com/kuma0605/login-hub"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full glass-pill text-muted hover:text-ink transition-colors"
              title="GitHub 仓库"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-6 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-line text-xs text-muted shadow-lg shadow-black/20">
          <Sparkles className="w-3.5 h-3.5 text-signal" />
          <span className="font-mono text-signal font-medium">Showcase Collection</span>
          <span className="text-line">•</span>
          <span>高质量登录界面与动效背景</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight max-w-3xl mx-auto leading-[1.15]">
          沉浸式、高品质的{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal via-cyan-300 to-emerald-400">
            现代登录体验合集
          </span>
        </h1>

        <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
          收录工业级 IoT 拓扑、赛博朋克霓虹、3D 粒子力场与极简毛玻璃等多样化风格。React 与 Vue 3 双生态高保真对齐，独立解耦，开箱即用。
        </p>

        {/* Categories Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {showcaseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-signal text-base font-semibold shadow-[0_0_16px_rgba(58,224,198,0.3)]'
                  : 'glass-pill text-muted hover:text-ink hover:border-signal/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => {
            const isActive = theme.status === 'active';

            return (
              <div
                key={theme.id}
                className="glass-panel rounded-3xl p-6 border border-line flex flex-col justify-between hover:border-signal/40 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Visual Thumbnail Area */}
                <div className="w-full h-44 rounded-2xl bg-base/80 border border-line/60 relative overflow-hidden mb-5 flex items-center justify-center group-hover:border-signal/30 transition-colors">
                  {theme.id === 'iot-mesh' ? (
                    // IoT Mini Preview
                    <div className="relative w-full h-full p-4 flex flex-col justify-between">
                      <div className="flex items-center justify-between z-10">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span>LIVE TOPOLOGY</span>
                        </div>
                        <span className="text-[10px] font-mono text-muted">160x100 SVG</span>
                      </div>

                      {/* Mini SVG Grid representation */}
                      <div className="absolute inset-0 opacity-40 flex items-center justify-center pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 160 100">
                          <line x1="24" y1="26" x2="52" y2="48" stroke="#3ae0c6" strokeWidth="0.5" />
                          <line x1="84" y1="32" x2="52" y2="48" stroke="#3ae0c6" strokeWidth="0.5" />
                          <line x1="30" y1="74" x2="52" y2="48" stroke="#3ae0c6" strokeWidth="0.5" />
                          <line x1="92" y1="70" x2="52" y2="48" stroke="#3ae0c6" strokeWidth="0.5" />
                          <circle cx="52" cy="48" r="4" fill="#3ae0c6" opacity="0.8" />
                          <circle cx="24" cy="26" r="2.5" fill="#1a6f66" />
                          <circle cx="84" cy="32" r="2.5" fill="#1a6f66" />
                          <circle cx="30" cy="74" r="2.5" fill="#1a6f66" />
                          <circle cx="92" cy="70" r="2.5" fill="#1a6f66" />
                        </svg>
                      </div>

                      <div className="z-10 flex items-center justify-between text-[11px] text-muted font-mono">
                        <span>4 Gateways</span>
                        <span>18 Nodes</span>
                      </div>
                    </div>
                  ) : theme.id === 'meshline-iot' ? (
                    <div className="relative w-full h-full p-4 flex flex-col justify-between bg-[#eef3f8]">
                      <div className="flex items-center justify-between z-10">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-[10px] text-blue-600 font-mono font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                          <span>BLUEPRINT GRID</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">SVG RADAR</span>
                      </div>
                      <div className="absolute inset-0 opacity-60 flex items-center justify-center pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 160 100">
                          <circle cx="80" cy="50" r="28" fill="none" stroke="#0b5cff" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                          <circle cx="80" cy="50" r="14" fill="none" stroke="#0b5cff" strokeWidth="0.8" opacity="0.8" />
                          <circle cx="80" cy="50" r="3" fill="#0b5cff" />
                          <circle cx="45" cy="35" r="2" fill="#0b5cff" />
                          <circle cx="115" cy="65" r="2" fill="#0b5cff" />
                        </svg>
                      </div>
                      <div className="z-10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>Hanover-3</span>
                        <span>12,486 MESH</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full p-4 flex flex-col justify-between bg-[#12304a]">
                      <div className="flex items-center justify-between z-10">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span>CIRCUIT FIELD</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-200/60">CANVAS 90°</span>
                      </div>
                      <div className="absolute inset-0 opacity-70 flex items-center justify-center pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 160 100">
                          <path d="M 20,50 L 60,50 L 60,25 L 110,25 L 110,75 L 140,75" fill="none" stroke="#67e8f9" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="140" cy="75" r="3" fill="#a5f3fc" />
                          <circle cx="60" cy="50" r="2" fill="#67e8f9" />
                          <circle cx="110" cy="25" r="2" fill="#67e8f9" />
                        </svg>
                      </div>
                      <div className="z-10 flex items-center justify-between text-[11px] text-cyan-200/70 font-mono">
                        <span>4 Gateways</span>
                        <span>8,048 Devices</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Area */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono text-signal uppercase tracking-wider">
                        {theme.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-line text-muted">
                          React
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-line text-muted">
                          Vue 3
                        </span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-ink group-hover:text-signal transition-colors">
                      {theme.name}
                    </h2>

                    <p className="text-xs text-muted leading-relaxed line-clamp-2 mt-1">
                      {theme.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {theme.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-surface/80 border border-line/60 text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-line/60">
                    {isActive ? (
                      <Link
                        to={`/view/${theme.id}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-signal/15 border border-signal/40 text-signal hover:bg-signal hover:text-base font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <span>进入全屏体验</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <div className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-line/40 text-muted text-xs font-medium text-center flex items-center justify-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-muted" />
                        <span>正在研发中 • 敬请期待</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line/60 py-8 px-6 text-center text-xs text-muted space-y-2">
        <p>Login Hub • 高质量登录界面与动效背景精选合集 (React & Vue 3 Showcase Monorepo)</p>
        <p className="font-mono text-[11px] text-muted/60">MIT License • Built with Vite, Tailwind CSS, and Framer Motion</p>
      </footer>
    </div>
  );
};
