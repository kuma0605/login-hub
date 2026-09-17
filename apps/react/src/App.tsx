import React, { useState } from 'react';
import { DeviceMeshBackground } from './components/DeviceMeshBackground';
import { MeshlineBackground } from './components/MeshlineBackground';
import { CircuitField } from './components/CircuitField';
import { IotMeshLogin } from './views/IotMeshLogin';
import { MeshlineLogin } from './views/MeshlineLogin';
import { NodegridLogin } from './views/NodegridLogin';
import { showcaseThemes } from '@login-hub/shared-data';

export function App() {
  const [themeId, setThemeId] = useState<string>('iot-mesh');

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
