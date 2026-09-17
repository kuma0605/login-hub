import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Play,
  Pause,
  ExternalLink,
  Code2,
  ChevronUp
} from 'lucide-react';
import { showcaseThemes, type MeshDensity } from '@login-hub/shared-data';

interface FloatingDockProps {
  currentThemeId: string;
  density: MeshDensity;
  onChangeDensity: (d: MeshDensity) => void;
  animate: boolean;
  onToggleAnimate: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  currentThemeId,
  density,
  onChangeDensity,
  animate,
  onToggleAnimate
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const activeTheme = showcaseThemes.find((t) => t.id === currentThemeId) || showcaseThemes[0];

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <div className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl shadow-black/60 pointer-events-auto border border-line/90 relative max-w-2xl">
        {/* Return to Gallery */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-muted hover:text-ink font-medium px-2 py-1 rounded-full hover:bg-white/5 transition-colors group"
          title="返回画廊大厅"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">画廊</span>
        </Link>

        <div className="h-4 w-px bg-line/80" />

        {/* Theme Quick Switcher */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-ink hover:text-signal transition-colors group"
          >
            <Sparkles className="w-3.5 h-3.5 text-signal group-hover:rotate-12 transition-transform" />
            <span className="max-w-[130px] sm:max-w-[180px] truncate">{activeTheme.name}</span>
            <ChevronUp className={`w-3.5 h-3.5 text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 glass-panel rounded-2xl p-2 z-50 shadow-2xl border border-line animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-muted tracking-wider">
                  快速切换模板
                </div>
                <div className="space-y-1">
                  {showcaseThemes.map((theme) => {
                    const isActive = theme.id === currentThemeId;
                    const isAvailable = theme.status === 'active';

                    return (
                      <button
                        key={theme.id}
                        disabled={!isAvailable}
                        onClick={() => {
                          navigate(`/view/${theme.id}`);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs ${
                          isActive
                            ? 'bg-signal/15 border border-signal/40 text-signal font-semibold'
                            : isAvailable
                            ? 'hover:bg-white/5 text-ink'
                            : 'opacity-40 cursor-not-allowed text-muted'
                        }`}
                      >
                        <span className="truncate">{theme.name}</span>
                        {!isAvailable && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-muted uppercase font-mono">
                            Soon
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-4 w-px bg-line/80" />

        {/* Density Selector */}
        <div className="hidden sm:flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-muted mr-0.5" />
          {(['sparse', 'standard', 'dense'] as MeshDensity[]).map((d) => (
            <button
              key={d}
              onClick={() => onChangeDensity(d)}
              className={`px-2 py-0.5 rounded-full text-[10px] capitalize transition-all font-medium ${
                density === d
                  ? 'bg-signal text-base font-bold shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Animation Toggle */}
        <button
          onClick={onToggleAnimate}
          title={animate ? '暂停动效' : '开启动效'}
          className={`p-1.5 rounded-full transition-colors ${
            animate ? 'text-signal hover:bg-signal/10' : 'text-muted hover:text-ink'
          }`}
        >
          {animate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <div className="h-4 w-px bg-line/80" />

        {/* Cross Link to Vue 3 with same route */}
        <a
          href={`http://localhost:5174/view/${currentThemeId}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium px-2 py-1 rounded-full hover:bg-emerald-500/10 transition-colors group"
          title="在 Vue 3 (5174) 中打开同款页面"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Vue 3 版</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};
