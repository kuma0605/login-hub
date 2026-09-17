import React from 'react';
import {
  Sparkles,
  Layers,
  Play,
  Pause,
  ExternalLink,
  Code2,
  ChevronDown
} from 'lucide-react';
import { showcaseThemes, type MeshDensity } from '@login-hub/shared-data';

interface GalleryHeaderProps {
  currentThemeId: string;
  onSelectTheme: (id: string) => void;
  density: MeshDensity;
  onChangeDensity: (d: MeshDensity) => void;
  animate: boolean;
  onToggleAnimate: () => void;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  currentThemeId,
  onSelectTheme,
  density,
  onChangeDensity,
  animate,
  onToggleAnimate
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const activeTheme = showcaseThemes.find((t) => t.id === currentThemeId) || showcaseThemes[0];

  return (
    <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
      {/* Left: Brand & Theme Selector */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="glass-pill px-3.5 py-2 rounded-full flex items-center gap-2.5 text-xs text-ink shadow-lg shadow-black/40">
          <div className="w-2.5 h-2.5 rounded-full bg-signal shadow-[0_0_8px_#3ae0c6]" />
          <span className="font-semibold tracking-wider uppercase text-[11px] text-muted">
            Login Hub
          </span>
          <span className="text-line">/</span>
          <span className="font-mono text-cyan-300 font-medium">React</span>
        </div>

        {/* Theme Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="glass-pill px-3.5 py-2 rounded-full flex items-center gap-2 text-xs text-ink hover:border-signal/50 transition-colors shadow-lg shadow-black/40 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-signal group-hover:scale-110 transition-transform" />
            <span className="font-medium">{activeTheme.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 mt-2 w-72 glass-panel rounded-2xl p-2 z-50 shadow-2xl border border-line animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 text-[10px] font-mono uppercase text-muted tracking-wider">
                  Select Showcase Theme
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
                          onSelectTheme(theme.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start justify-between ${
                          isActive
                            ? 'bg-signal/15 border border-signal/40 text-signal'
                            : isAvailable
                            ? 'hover:bg-white/5 text-ink'
                            : 'opacity-40 cursor-not-allowed text-muted'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            {theme.name}
                            {!isAvailable && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-muted uppercase tracking-wider font-mono">
                                Soon
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-muted line-clamp-1 mt-0.5 font-normal">
                            {theme.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Background Controls & Vue Cross-Link */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Density Selector */}
        <div className="glass-pill px-2.5 py-1.5 rounded-full flex items-center gap-1 text-xs shadow-lg shadow-black/40">
          <Layers className="w-3.5 h-3.5 text-muted ml-1" />
          {(['sparse', 'standard', 'dense'] as MeshDensity[]).map((d) => (
            <button
              key={d}
              onClick={() => onChangeDensity(d)}
              className={`px-2 py-0.5 rounded-full text-[11px] capitalize transition-all font-medium ${
                density === d
                  ? 'bg-signal text-base font-semibold shadow-sm'
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
          title={animate ? 'Pause Animation' : 'Resume Animation'}
          className={`glass-pill p-2 rounded-full flex items-center justify-center transition-all shadow-lg shadow-black/40 ${
            animate
              ? 'text-signal hover:border-signal/50'
              : 'text-muted hover:text-ink border-line'
          }`}
        >
          {animate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Cross-Link to Vue App */}
        <a
          href="http://localhost:5174"
          target="_blank"
          rel="noreferrer"
          className="glass-pill px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-ink hover:text-emerald-400 hover:border-emerald-500/40 transition-all shadow-lg shadow-black/40 group"
          title="Open Vue 3 Showcase on Port 5174"
        >
          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vue 3 Edition</span>
          <ExternalLink className="w-3 h-3 text-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </header>
  );
};
