import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DeviceMeshBackground } from '../components/DeviceMeshBackground';
import { FloatingDock } from '../components/FloatingDock';
import { IotMeshLogin } from './IotMeshLogin';
import { type MeshDensity, showcaseThemes } from '@login-hub/shared-data';
import { Construction, ArrowLeft } from 'lucide-react';

export const ImmersiveLoginView: React.FC = () => {
  const { id = 'iot-mesh' } = useParams<{ id: string }>();
  const [density, setDensity] = useState<MeshDensity>('standard');
  const [animate, setAnimate] = useState<boolean>(true);

  const theme = showcaseThemes.find((t) => t.id === id);

  return (
    <div className="relative min-h-screen w-full bg-base text-ink overflow-x-hidden flex flex-col justify-between">
      {/* Dynamic Background Layer */}
      {id === 'iot-mesh' ? (
        <DeviceMeshBackground density={density} animate={animate} />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-base via-surface to-base opacity-90" />
      )}

      {/* Main Content Area */}
      {id === 'iot-mesh' ? (
        <IotMeshLogin />
      ) : (
        <div className="min-h-screen flex items-center justify-center p-6 z-10">
          <div className="glass-panel p-8 rounded-3xl max-w-md text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-signal/15 border border-signal/40 flex items-center justify-center mx-auto text-signal">
              <Construction className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-ink">{theme?.name || '未知模板'}</h2>
            <p className="text-sm text-muted">{theme?.description || '该模板正在研发中，敬请期待。'}</p>
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-line text-xs font-mono text-muted">
              Coming in Next Release • 敬请期待
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 w-full mt-4 py-2.5 px-4 rounded-xl bg-signal text-base font-semibold text-xs transition-opacity hover:opacity-90"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回画廊大厅</span>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Floating Control Dock */}
      <FloatingDock
        currentThemeId={id}
        density={density}
        onChangeDensity={setDensity}
        animate={animate}
        onToggleAnimate={() => setAnimate((prev) => !prev)}
      />
    </div>
  );
};
