import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Hexagon,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Check,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success';

export function MeshlineLogin() {
  const [email, setEmail] = useState('operator@hanover-mesh.net');
  const [password, setPassword] = useState('mesh•node•pass');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    if (!email.trim() || !password) {
      setError('Enter your work email and password to continue.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('That email address looks incomplete.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError(null);
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 1200);
  };

  const fieldClass =
    'w-full rounded-lg border border-[#d7e1ec] bg-white px-3.5 py-2.5 font-mono text-sm text-[#0a1526] placeholder:text-[#5b6d80]/70 outline-none transition-all duration-150 focus:border-[#0b5cff] focus:ring-2 focus:ring-[#0b5cff]/20';

  return (
    <section className="relative z-10 flex w-full min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-[26rem] rounded-2xl border border-white/80 bg-white/90 p-8 shadow-[0_20px_50px_rgba(10,21,38,0.1)] backdrop-blur-xl sm:p-10"
      >
        {/* Corner blueprint accents */}
        <span
          className="absolute -left-px -top-px h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-[#0b5cff]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-px -right-px h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-[#0b5cff]"
          aria-hidden="true"
        />

        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b5cff] shadow-md shadow-[#0b5cff]/30">
            <Hexagon className="h-4 w-4 text-white" strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[#0a1526]">
            Meshline&nbsp;IoT
          </span>
        </div>

        <h2 className="mt-8 text-2xl font-bold tracking-tight text-[#0a1526]">
          Sign in to console
        </h2>
        <p className="mt-1.5 text-xs text-[#5b6d80]">
          Operator access for the Hanover-3 production mesh.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-[#0a1526]">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
              aria-invalid={Boolean(error)}
              className={fieldClass}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between">
              <label htmlFor="password" className="block text-xs font-semibold text-[#0a1526]">
                Password
              </label>
              <a
                href="#reset"
                onClick={(e) => e.preventDefault()}
                className="text-xs font-medium text-[#0b5cff] underline-offset-2 hover:underline"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                aria-invalid={Boolean(error)}
                className={`${fieldClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-[#5b6d80] hover:text-[#0b5cff] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 rounded-lg border border-red-500/25 bg-red-50 px-3 py-2 text-xs text-red-600"
            >
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </motion.p>
          )}

          <label className="flex cursor-pointer items-center gap-2 text-xs text-[#5b6d80]">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-[#d7e1ec] text-[#0b5cff] accent-[#0b5cff]"
            />
            <span>Keep this workstation signed in for 12 hours</span>
          </label>

          <button
            type="submit"
            disabled={status !== 'idle'}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0b5cff] text-sm font-semibold text-white shadow-md shadow-[#0b5cff]/25 hover:bg-[#083fb0] transition-colors disabled:opacity-75 cursor-pointer"
          >
            {status === 'submitting' && (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Verifying credentials...</span>
              </>
            )}
            {status === 'success' && (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Opening console...</span>
              </>
            )}
            {status === 'idle' && <span>Sign in to Node</span>}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#d7e1ec]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6d80]">
            or
          </span>
          <span className="h-px flex-1 bg-[#d7e1ec]" />
        </div>

        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#d7e1ec] bg-white text-sm font-medium text-[#0a1526] hover:border-[#0b5cff] hover:bg-blue-50/50 transition-all cursor-pointer shadow-sm"
        >
          <KeyRound className="h-4 w-4 text-[#0b5cff]" aria-hidden="true" />
          <span>Continue with Mesh SSO</span>
        </button>

        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#5b6d80]">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00976b]" aria-hidden="true" />
          <span>Mutual TLS session with Hanover gateway certificates.</span>
        </p>
      </motion.div>
    </section>
  );
}
