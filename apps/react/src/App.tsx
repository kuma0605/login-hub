import React, { useState } from 'react';
import { DeviceMeshBackground } from './components/DeviceMeshBackground';
import { GalleryHeader } from './components/GalleryHeader';
import { IotMeshLogin } from './views/IotMeshLogin';
import { type MeshDensity, showcaseThemes } from '@login-hub/shared-data';
import { Construction } from 'lucide-react';

export function App() {
  const [themeId, setThemeId] = useState<string>('iot-mesh');
  const [density, setDensity] = useState<MeshDensity>('standard');
  const [animate, setAnimate] = useState<boolean>(true);

  const currentTheme = showcaseThemes.find((t) => t.id === themeId) || showcaseThemes[0];

  return (
    <div className="relative min-h-screen w-full bg-base text-ink overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic Background */}
      {themeId === 'iot-mesh' ? (
        <DeviceMeshBackground density={density} animate={animate} />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-base via-surface to-base opacity-80" />
      )}

      {/* Top Floating Gallery Controller */}
      <GalleryHeader
        currentThemeId={themeId}
        onSelectTheme={setThemeId}
        density={density}
        onChangeDensity={setDensity}
        animate={animate}
        onToggleAnimate={() => setAnimate((prev) => !prev)}
      />

      {/* Main Content Area */}
      {themeId === 'iot-mesh' ? (
        <IotMeshLogin />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-6 z-10">
          <div className="glass-panel p-8 rounded-3xl max-w-md text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-signal/15 border border-signal/40 flex items-center justify-center mx-auto text-signal">
              <Construction className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-ink">{currentTheme.name}</h2>
            <p className="text-sm text-muted">{currentTheme.description}</p>
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-line text-xs font-mono text-muted">
              Coming in Next Release • Readily Extensible
            </div>
            <button
              onClick={() => setThemeId('iot-mesh')}
              className="block w-full mt-4 py-2.5 px-4 rounded-xl bg-signal text-base font-semibold text-xs transition-opacity hover:opacity-90"
            >
              Back to IoT Mesh Console
            </button>
          </div>
        </div>
      )}

      {/* Subtle Footer watermark */}
      <footer className="relative z-10 w-full py-4 px-6 text-center text-xs text-muted/60 font-mono">
        Login Hub Monorepo Showcase • React Edition
      </footer>
    </div>
  );
}

export default App;
