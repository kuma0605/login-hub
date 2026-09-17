import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { DeviceMeshBackground } from './components/DeviceMeshBackground';
import { MeshlineBackground } from './components/MeshlineBackground';
import { CircuitField } from './components/CircuitField';
import { IotMeshLogin } from './views/IotMeshLogin';
import { MeshlineLogin } from './views/MeshlineLogin';
import { NodegridLogin } from './views/NodegridLogin';
import { showcaseThemes } from '@login-hub/shared-data';

export function App() {
  const [themeId, setThemeId] = useState<string>('iot-mesh');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentTheme = showcaseThemes.find((t) => t.id === themeId) || showcaseThemes[0];

  const copySnippet = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="relative min-h-screen w-full bg-base text-ink overflow-x-hidden flex flex-col justify-center selection:bg-signal selection:text-base">
      {/* Dynamic Backgrounds */}
      {themeId === 'iot-mesh' ? (
        <DeviceMeshBackground density="standard" animate={true} />
      ) : themeId === 'meshline-iot' ? (
        <MeshlineBackground />
      ) : (
        <CircuitField density={1} />
      )}

      {/* Main Login Screens */}
      {themeId === 'iot-mesh' && <IotMeshLogin />}
      {themeId === 'meshline-iot' && <MeshlineLogin />}
      {themeId === 'nodegrid-neon' && <NodegridLogin />}

      {/* Reusable Component Names & One-Click Copy Badge */}
      <aside className="fixed top-5 right-5 z-50 flex items-center" aria-label="组件代码复制">
        <div className="glass-pill px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-mono border border-line/80 shadow-2xl backdrop-blur-xl">
          <span className="text-[10px] text-muted uppercase tracking-wider hidden sm:inline pl-1">
            复用组件:
          </span>

          {/* Background Component */}
          <button
            onClick={() => copySnippet(`<${currentTheme.components.background} />`, 'bg')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-signal border border-line/60 hover:border-signal/50 transition-all cursor-pointer group"
            title={`点击复制背景组件代码 <${currentTheme.components.background} />`}
          >
            <span className="text-[10px] text-muted group-hover:text-muted/80">背景</span>
            <span className="font-semibold">&lt;{currentTheme.components.background} /&gt;</span>
            {copiedKey === 'bg' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted group-hover:text-signal opacity-70 group-hover:opacity-100 shrink-0" />
            )}
          </button>

          {/* Login Card Component */}
          <button
            onClick={() => copySnippet(`<${currentTheme.components.login} />`, 'login')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-ink border border-line/60 hover:border-signal/50 transition-all cursor-pointer group"
            title={`点击复制界面组件代码 <${currentTheme.components.login} />`}
          >
            <span className="text-[10px] text-muted group-hover:text-muted/80">界面</span>
            <span className="font-semibold">&lt;{currentTheme.components.login} /&gt;</span>
            {copiedKey === 'login' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted group-hover:text-signal opacity-70 group-hover:opacity-100 shrink-0" />
            )}
          </button>
        </div>
      </aside>

      {/* Extreme Minimalist Dots (纯净点点点) */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <div className="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-auto shadow-xl shadow-black/60 border border-line/70">
          {showcaseThemes.map((theme) => {
            const isActive = theme.id === themeId;
            return (
              <button
                key={theme.id}
                onClick={() => setThemeId(theme.id)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-6 bg-signal shadow-[0_0_8px_#3ae0c6]'
                    : 'w-2 bg-line hover:bg-muted'
                }`}
                title={theme.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
