import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
  Code2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { showcaseThemes, type MeshDensity } from '@login-hub/shared-data';

interface ThemeCarouselDockProps {
  currentThemeId: string;
  onSelectTheme: (id: string) => void;
  density: MeshDensity;
  onChangeDensity: (d: MeshDensity) => void;
  animate: boolean;
  onToggleAnimate: () => void;
}

export const ThemeCarouselDock: React.FC<ThemeCarouselDockProps> = ({
  currentThemeId,
  onSelectTheme,
  density,
  onChangeDensity,
  animate,
  onToggleAnimate
}) => {
  const currentIndex = showcaseThemes.findIndex((t) => t.id === currentThemeId);
  const activeTheme = showcaseThemes[currentIndex >= 0 ? currentIndex : 0];

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + showcaseThemes.length) % showcaseThemes.length;
    onSelectTheme(showcaseThemes[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % showcaseThemes.length;
    onSelectTheme(showcaseThemes[nextIdx].id);
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <div className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-3.5 shadow-2xl shadow-black/80 pointer-events-auto border border-line/90 relative max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-white/5 transition-colors cursor-pointer"
          title="上一个风格 (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Theme Title Badge */}
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-signal" />
          <span className="font-semibold text-ink max-w-[120px] sm:max-w-[180px] truncate">
            {activeTheme.name}
          </span>
          <span className="text-[10px] font-mono text-muted/70 hidden md:inline">
            {String(currentIndex + 1).padStart(2, '0')}/{String(showcaseThemes.length).padStart(2, '0')}
          </span>
        </div>

        {/* Dots Pagination (点点点切换器) */}
        <div className="flex items-center gap-1.5 px-1 py-0.5">
          {showcaseThemes.map((theme, idx) => {
            const isActive = theme.id === currentThemeId;

            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className="group relative py-1 focus:outline-none cursor-pointer"
                title={`${theme.name} (${theme.status === 'active' ? '可交互' : '研发中'})`}
              >
                {/* Visual Dot */}
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6 bg-signal shadow-[0_0_10px_#3ae0c6]'
                      : 'w-2 bg-line hover:bg-muted/80'
                  }`}
                />

                {/* Floating Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
                  <div className="glass-panel px-2.5 py-1 rounded-lg text-[10px] font-medium text-ink whitespace-nowrap shadow-xl border border-line flex items-center gap-1.5">
                    <span>{theme.name}</span>
                    {theme.status !== 'active' && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-white/10 text-muted uppercase font-mono">
                        Soon
                      </span>
                    )}
                  </div>
                  <div className="w-1.5 h-1.5 bg-line rotate-45 -mt-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-white/5 transition-colors cursor-pointer"
          title="下一个风格 (Right Arrow)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-line/80 hidden sm:block" />

        {/* Density Selector (Active for IoT mesh) */}
        {currentThemeId === 'iot-mesh' && (
          <div className="hidden sm:flex items-center gap-1 text-xs">
            <Layers className="w-3.5 h-3.5 text-muted mr-0.5" />
            {(['sparse', 'standard', 'dense'] as MeshDensity[]).map((d) => (
              <button
                key={d}
                onClick={() => onChangeDensity(d)}
                className={`px-2 py-0.5 rounded-full text-[10px] capitalize transition-all font-medium cursor-pointer ${
                  density === d
                    ? 'bg-signal text-base font-bold shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {d === 'sparse' ? '疏' : d === 'standard' ? '标' : '密'}
              </button>
            ))}
          </div>
        )}

        {/* Animation Toggle */}
        <button
          onClick={onToggleAnimate}
          title={animate ? '暂停动效' : '开启动效'}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            animate ? 'text-signal hover:bg-signal/10' : 'text-muted hover:text-ink'
          }`}
        >
          {animate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <div className="h-4 w-px bg-line/80" />

        {/* Cross Link to Vue 3 Edition */}
        <a
          href="http://localhost:5174"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium px-2 py-1 rounded-full hover:bg-emerald-500/10 transition-colors group"
          title="切换至 Vue 3 版本 (端口 5174)"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Vue 3</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
};
