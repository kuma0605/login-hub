import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Cpu,
  CheckCircle2,
  Loader2,
  RadioTower,
  Camera,
  Layers
} from 'lucide-react';
import { securityCapabilities } from '@login-hub/shared-data';

export function SmartSecurityLogin() {
  const [operatorId, setOperatorId] = useState('admin@edge-security.net');
  const [passkey, setPasskey] = useState('edge•node•pass');
  const [showPassword, setShowPassword] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'verifying' | 'granted'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === 'verifying') return;

    if (!operatorId.trim() || !passkey) {
      setError('请输入操作员工号及动态口令。');
      return;
    }
    if (!operatorId.includes('@')) {
      setError('操作员账号格式不正确。');
      return;
    }

    setError(null);
    setPhase('verifying');
    setTimeout(() => {
      setPhase('granted');
      setTimeout(() => {
        setPhase('idle');
      }, 3500);
    }, 1200);
  };

  const capIcons = [Camera, RadioTower, Cpu, Layers];

  return (
    <section className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-16 font-sans text-[#151b38]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left: Edge Computing & Perimeter Sensing Telemetry */}
        <div className="flex flex-col justify-center space-y-6 lg:col-span-7">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dde3f5] bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[#4f6ae8] shadow-sm backdrop-blur-md w-fit">
            <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-ping" />
            <span className="tracking-wide">边缘算力 · 设备直连</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#151b38] sm:text-4xl lg:text-5xl leading-[1.18]">
              一台主机，
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f6ae8] via-[#6366f1] to-[#38bdf8]">
                接管现场所有感知设备
              </span>
            </h1>
            <p className="max-w-xl text-sm md:text-base leading-relaxed text-[#646d99]">
              摄像机、道闸、立柱与门禁统一接入同一个边缘核心。识别、判定与放行全部在现场毫秒级完成，不依赖云端往返，断网也能稳定续跑。
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 max-w-lg">
            <div className="rounded-2xl border border-[#dde3f5] bg-white/80 p-3.5 shadow-sm backdrop-blur-md">
              <div className="text-xs text-[#8b93b8]">单机接入</div>
              <div className="mt-1 text-xl font-bold text-[#151b38]">
                16 <span className="text-xs font-normal text-[#646d99]">路</span>
              </div>
              <div className="text-[10px] text-[#4f6ae8]">视频与道闸并发</div>
            </div>
            <div className="rounded-2xl border border-[#dde3f5] bg-white/80 p-3.5 shadow-sm backdrop-blur-md">
              <div className="text-xs text-[#8b93b8]">端到端时延</div>
              <div className="mt-1 text-xl font-bold text-[#151b38]">
                &lt; 300 <span className="text-xs font-normal text-[#646d99]">ms</span>
              </div>
              <div className="text-[10px] text-emerald-600">本地硬件判定</div>
            </div>
            <div className="rounded-2xl border border-[#dde3f5] bg-white/80 p-3.5 shadow-sm backdrop-blur-md">
              <div className="text-xs text-[#8b93b8]">断网续跑</div>
              <div className="mt-1 text-xl font-bold text-[#151b38]">
                72 <span className="text-xs font-normal text-[#646d99]">小时</span>
              </div>
              <div className="text-[10px] text-[#4f6ae8]">恢复后离线补传</div>
            </div>
          </div>

          {/* Visual Illustration & Capability Pillars */}
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-[#dde3f5] bg-white/60 p-4 backdrop-blur-md max-w-xl">
            <div className="relative w-40 shrink-0 overflow-hidden rounded-xl bg-[#eff2fb]/70 p-2 flex items-center justify-center">
              <img
                src="/smart-security-network.jpg"
                alt="智能安防边缘设备等距网络示意图"
                className="w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5 w-full">
              {securityCapabilities.map((item, idx) => {
                const Icon = capIcons[idx % capIcons.length];
                return (
                  <div key={item.id} className="rounded-xl border border-[#dde3f5]/80 bg-white/80 p-2.5 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#151b38]">
                      <Icon className="w-3.5 h-3.5 text-[#4f6ae8] shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-[#8b93b8] truncate">{item.device}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Security Console Login Card */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative w-full max-w-md rounded-3xl border border-white/90 bg-white/90 p-7 sm:p-9 shadow-[0_20px_50px_rgba(21,27,56,0.12)] backdrop-blur-2xl">
            {/* Top Security Tier */}
            <div className="flex items-center justify-between border-b border-[#dde3f5] pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4f6ae8]/15 text-[#4f6ae8]">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#151b38] font-mono">
                  Smart Security
                </span>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600 border border-emerald-200">
                GATEWAY SECURE
              </span>
            </div>

            {/* Title */}
            <div className="mt-5 space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-[#151b38]">
                操作员登录
              </h2>
              <p className="text-xs text-[#646d99]">
                边缘主机中控系统 · 现场双向证书身份验证
              </p>
            </div>

            {/* Alert Feedback */}
            {phase === 'granted' && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>令牌校验通过，正在进入边缘感知监控中心...</span>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-600">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#151b38]">
                  操作员工号 / 账号
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b93b8]" />
                  <input
                    type="email"
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                    placeholder="operator@edge-security.net"
                    className="w-full rounded-xl border border-[#dde3f5] bg-[#f8faff] py-2.5 pl-10 pr-3.5 text-xs text-[#151b38] placeholder:text-[#8b93b8]/60 focus:border-[#4f6ae8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4f6ae8]/15 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#151b38]">
                    访问口令 / 令牌
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#4f6ae8] hover:underline">
                    重置口令
                  </a>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8b93b8]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-[#dde3f5] bg-[#f8faff] py-2.5 pl-10 pr-10 text-xs text-[#151b38] placeholder:text-[#8b93b8]/60 focus:border-[#4f6ae8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4f6ae8]/15 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8b93b8] hover:text-[#4f6ae8] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#646d99] pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-3.5 w-3.5 rounded border-[#dde3f5] text-[#4f6ae8] focus:ring-[#4f6ae8]"
                  />
                  <span>信任此现场主机 (12小时)</span>
                </label>
                <span className="text-[11px] font-mono text-[#8b93b8]">硬件令牌就绪</span>
              </div>

              <button
                type="submit"
                disabled={phase !== 'idle'}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4f6ae8] to-[#3a51cc] py-3 text-xs font-semibold text-white shadow-lg shadow-[#4f6ae8]/25 hover:shadow-xl hover:shadow-[#4f6ae8]/35 transition-all cursor-pointer disabled:opacity-60"
              >
                {phase === 'verifying' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>验证边缘证书中...</span>
                  </>
                ) : phase === 'granted' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>认证成功</span>
                  </>
                ) : (
                  <>
                    <span>登录边缘控制台</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer security badges */}
            <div className="mt-6 border-t border-[#dde3f5] pt-4 text-center">
              <p className="text-[10px] text-[#8b93b8] font-mono">
                EDGE NODE SECURE · TLS 1.3 · 国密 SM4 硬件加固
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartSecurityLogin;
