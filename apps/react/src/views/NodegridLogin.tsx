import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  Fingerprint,
  Loader2,
  CheckCircle2,
  Activity,
  RadioTower
} from 'lucide-react';
import { nodegridGateways, nodegridStatusTone } from '@login-hub/shared-data';

export function NodegridLogin() {
  const [operator, setOperator] = useState('a.vance@nodegrid.io');
  const [key, setKey] = useState('access•token•48');
  const [showKey, setShowKey] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'verifying' | 'granted'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Live Sparkline series
  const [throughput, setThroughput] = useState<number[]>([
    45, 52, 48, 55, 60, 58, 62, 65, 59, 63, 68, 72, 70, 74, 69, 73, 76, 75, 78, 82,
    79, 85, 81, 86, 84, 88, 85, 89, 92, 87, 91, 93, 89, 94, 90, 93, 95, 92, 96, 94
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setThroughput((prev) => {
        const last = prev[prev.length - 1];
        const drift = (Math.random() - 0.48) * 12;
        const next = Math.min(98, Math.max(30, last + drift));
        return [...prev.slice(1), next];
      });
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === 'verifying') return;
    if (!operator.includes('@')) {
      setError('Operator ID must be a valid credentialed address.');
      return;
    }
    if (key.length < 6) {
      setError('Access key must be at least 6 characters.');
      return;
    }
    setError(null);
    setPhase('verifying');
    setTimeout(() => setPhase('granted'), 1400);
  };

  const latestThroughput = throughput[throughput.length - 1];
  const w = 280;
  const h = 50;
  const pts = throughput.map((v, i) => {
    const x = (i / (throughput.length - 1)) * w;
    const y = h - (v / 100) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const linePath = `M ${pts.join(' L ')}`;
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center z-10 text-[#e8f7ff] font-mono px-4 py-12">
      {/* Main Grid: Left Telemetry & Right Login Card */}
      <main className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center justify-center gap-10 px-4 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center lg:gap-16">
        {/* Left Telemetry Column */}
        <div className="w-full space-y-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#67e8f9]/90 font-semibold">
              Live mesh telemetry
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white tracking-tight">
              8,048 devices reporting across 4 gateways
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {/* Sparkline Throughput Module */}
            <section className="hud-corner relative border border-[#67e8f9]/30 bg-[#1f4866]/45 p-4 backdrop-blur-md">
              <header className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                <span className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#67e8f9]" />
                  Mesh Throughput
                </span>
                <span className="text-[10px] text-[#99f6e4] font-mono">LIVE</span>
              </header>

              <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full overflow-visible">
                <path d={areaPath} fill="rgba(103,232,249,0.15)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#67e8f9"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <circle
                  cx={w}
                  cy={h - (latestThroughput / 100) * h}
                  r="3"
                  fill="#a5f3fc"
                  className="animate-pulse"
                />
              </svg>

              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold text-[#67e8f9] tabular-nums">
                  {(latestThroughput * 12.4).toFixed(0)}{' '}
                  <span className="text-[11px] font-normal text-[#a9cadd]">msg/s</span>
                </span>
                <span className="text-[10px] text-[#a9cadd]">P95 42ms • Zero loss</span>
              </div>
            </section>

            {/* Gateways Status Module */}
            <section className="hud-corner relative border border-[#67e8f9]/30 bg-[#1f4866]/45 p-4 backdrop-blur-md">
              <header className="mb-2.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                <span className="flex items-center gap-2">
                  <RadioTower className="w-3.5 h-3.5 text-[#67e8f9]" />
                  Active Gateways
                </span>
                <span className="text-[10px] text-[#a9cadd]">4 NODES</span>
              </header>

              <ul className="divide-y divide-[#67e8f9]/15">
                {nodegridGateways.map((g) => {
                  const tone = nodegridStatusTone[g.status];
                  return (
                    <li key={g.id} className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot} animate-pulse`} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-white">{g.label}</p>
                        <p className="text-[10px] text-[#a9cadd]">
                          {g.id} · {g.region}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/90 tabular-nums">{g.devices.toLocaleString()}</p>
                        <p className={`text-[9px] font-bold tracking-wider ${tone.text}`}>{tone.label}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>

        {/* Right Login Card */}
        <div className="flex w-full justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="hud-corner relative w-full max-w-[440px] overflow-hidden border border-[#67e8f9]/30 bg-[rgba(31,72,102,0.65)] shadow-[0_0_40px_rgba(2,14,26,0.8)] backdrop-blur-xl"
          >
            {/* Scanning Sweep line */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="h-16 w-full bg-[linear-gradient(to_bottom,transparent,rgba(165,243,252,0.1),transparent)] animate-pulse" />
            </div>

            <div className="relative px-7 pb-7 pt-8 sm:px-9 sm:pb-9">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#a9cadd]">
                  SEC // TIER-3
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-[#99f6e4] font-semibold">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#99f6e4]" />
                  LINK SECURE
                </span>
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-white">
                Operator Access
              </h1>
              <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-[#a9cadd]">
                Authenticate to reach the device mesh control plane. Sessions are keyed to hardware tokens.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div>
                  <label className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-[#a9cadd]">
                    Operator ID
                  </label>
                  <div className="flex items-center gap-2.5 border border-[#67e8f9]/30 bg-[#102c44]/70 px-3 py-2.5 transition-colors focus-within:border-[#67e8f9]">
                    <User className="w-4 h-4 text-[#67e8f9]/80" />
                    <input
                      type="email"
                      required
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                      placeholder="a.vance@nodegrid.io"
                      className="w-full bg-transparent text-xs text-white placeholder-[#a9cadd]/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-[#a9cadd]">
                      Access Key
                    </label>
                    <a
                      href="#recover"
                      onClick={(e) => e.preventDefault()}
                      className="text-[11px] text-[#7dd3fc] hover:text-[#67e8f9]"
                    >
                      Key recovery
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 border border-[#67e8f9]/30 bg-[#102c44]/70 px-3 py-2.5 transition-colors focus-within:border-[#67e8f9]">
                    <KeyRound className="w-4 h-4 text-[#67e8f9]/80" />
                    <input
                      type={showKey ? 'text' : 'password'}
                      required
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-transparent text-xs text-white placeholder-[#a9cadd]/60 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="text-[#a9cadd] hover:text-[#67e8f9] transition-colors"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs text-[#a9cadd]">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-3.5 w-3.5 border border-[#67e8f9]/30 bg-[#1a4160] text-[#67e8f9] accent-[#67e8f9]"
                    />
                    <span>Trust this terminal</span>
                  </label>
                  <span className="text-[10px] text-[#99f6e4]">YubiKey Ready</span>
                </div>

                {error && (
                  <p className="flex items-start gap-2 border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={phase !== 'idle'}
                  className="group relative flex w-full items-center justify-center gap-2 border border-[#67e8f9]/60 bg-[#67e8f9]/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#67e8f9] shadow-[0_0_20px_rgba(103,232,249,0.3)] hover:bg-[#67e8f9]/30 hover:text-white transition-all cursor-pointer disabled:opacity-60"
                >
                  {phase === 'verifying' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {phase === 'granted' && <CheckCircle2 className="w-4 h-4 text-[#99f6e4]" />}
                  {phase === 'idle' && <Fingerprint className="w-4 h-4" />}
                  {phase === 'idle' && 'Authenticate Session'}
                  {phase === 'verifying' && 'Verifying token…'}
                  {phase === 'granted' && <span className="text-[#99f6e4]">Access granted</span>}
                </button>
              </form>

              <p className="mt-5 border-t border-[#67e8f9]/20 pt-4 text-[9px] text-[#a9cadd]/80 leading-relaxed">
                NODEGRID CONTROL · BUILD 4.18.2 · AES-256 / TLS 1.3 · MUTUAL CERTIFICATE BOUND
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
