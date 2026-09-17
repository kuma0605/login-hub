<script setup lang="ts">
import { ref } from 'vue';
import {
  Hexagon,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Check,
  KeyRound,
  ShieldCheck
} from 'lucide-vue-next';

type Status = 'idle' | 'submitting' | 'success';

const email = ref('operator@hanover-mesh.net');
const password = ref('mesh•node•pass');
const showPassword = ref(false);
const remember = ref(true);
const status = ref<Status>('idle');
const error = ref<string | null>(null);

const handleSubmit = () => {
  if (status.value === 'submitting') return;

  if (!email.value.trim() || !password.value) {
    error.value = 'Enter your work email and password to continue.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    error.value = 'That email address looks incomplete.';
    return;
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.';
    return;
  }

  error.value = null;
  status.value = 'submitting';
  setTimeout(() => {
    status.value = 'success';
  }, 1200);
};

const fieldClass =
  'w-full rounded-lg border border-[#d7e1ec] bg-white px-3.5 py-2.5 font-mono text-sm text-[#0a1526] placeholder:text-[#5b6d80]/70 outline-none transition-all duration-150 focus:border-[#0b5cff] focus:ring-2 focus:ring-[#0b5cff]/20';
</script>

<template>
  <section class="relative z-10 flex w-full min-h-screen items-center justify-center px-4 py-12">
    <div className="relative w-full max-w-[26rem] rounded-2xl border border-white/80 bg-white/90 p-8 shadow-[0_20px_50px_rgba(10,21,38,0.1)] backdrop-blur-xl sm:p-10">
      <!-- Corner blueprint accents -->
      <span
        class="absolute -left-px -top-px h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-[#0b5cff]"
        aria-hidden="true"
      />
      <span
        class="absolute -bottom-px -right-px h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-[#0b5cff]"
        aria-hidden="true"
      />

      <div class="flex items-center gap-2.5">
        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b5cff] shadow-md shadow-[#0b5cff]/30">
          <Hexagon class="h-4 w-4 text-white" stroke-width="2.2" aria-hidden="true" />
        </span>
        <span class="text-[15px] font-semibold tracking-tight text-[#0a1526]">
          Meshline&nbsp;IoT
        </span>
      </div>

      <h2 class="mt-8 text-2xl font-bold tracking-tight text-[#0a1526]">
        Sign in to console
      </h2>
      <p class="mt-1.5 text-xs text-[#5b6d80]">
        Operator access for the Hanover-3 production mesh.
      </p>

      <form @submit.prevent="handleSubmit" novalidate class="mt-7 space-y-4">
        <div>
          <label for="email" class="mb-1.5 block text-xs font-semibold text-[#0a1526]">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            v-model="email"
            placeholder="you@company.com"
            :aria-invalid="Boolean(error)"
            :class="fieldClass"
          />
        </div>

        <div>
          <div class="mb-1.5 flex items-baseline justify-between">
            <label for="password" class="block text-xs font-semibold text-[#0a1526]">
              Password
            </label>
            <a
              href="#reset"
              @click.prevent
              class="text-xs font-medium text-[#0b5cff] underline-offset-2 hover:underline"
            >
              Forgot?
            </a>
          </div>
          <div class="relative">
            <input
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              v-model="password"
              placeholder="••••••••"
              :aria-invalid="Boolean(error)"
              :class="`${fieldClass} pr-11`"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              class="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-[#5b6d80] hover:text-[#0b5cff] transition-colors"
            >
              <EyeOff v-if="showPassword" class="h-4 w-4" aria-hidden="true" />
              <Eye v-else class="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p
          v-if="error"
          role="alert"
          class="flex items-start gap-2 rounded-lg border border-red-500/25 bg-red-50 px-3 py-2 text-xs text-red-600"
        >
          <AlertCircle class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{{ error }}</span>
        </p>

        <label class="flex cursor-pointer items-center gap-2 text-xs text-[#5b6d80]">
          <input
            type="checkbox"
            v-model="remember"
            class="h-4 w-4 rounded border-[#d7e1ec] text-[#0b5cff] accent-[#0b5cff]"
          />
          <span>Keep this workstation signed in for 12 hours</span>
        </label>

        <button
          type="submit"
          :disabled="status !== 'idle'"
          class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0b5cff] text-sm font-semibold text-white shadow-md shadow-[#0b5cff]/25 hover:bg-[#083fb0] transition-colors disabled:opacity-75 cursor-pointer"
        >
          <template v-if="status === 'submitting'">
            <Loader2 class="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Verifying credentials...</span>
          </template>
          <template v-else-if="status === 'success'">
            <Check class="h-4 w-4" aria-hidden="true" />
            <span>Opening console...</span>
          </template>
          <template v-else>
            <span>Sign in to Node</span>
          </template>
        </button>
      </form>

      <div class="my-5 flex items-center gap-3">
        <span class="h-px flex-1 bg-[#d7e1ec]" />
        <span class="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6d80]">
          or
        </span>
        <span class="h-px flex-1 bg-[#d7e1ec]" />
      </div>

      <button
        type="button"
        class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#d7e1ec] bg-white text-sm font-medium text-[#0a1526] hover:border-[#0b5cff] hover:bg-blue-50/50 transition-all cursor-pointer shadow-sm"
      >
        <KeyRound class="h-4 w-4 text-[#0b5cff]" aria-hidden="true" />
        <span>Continue with Mesh SSO</span>
      </button>

      <p class="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#5b6d80]">
        <ShieldCheck class="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00976b]" aria-hidden="true" />
        <span>Mutual TLS session with Hanover gateway certificates.</span>
      </p>
    </div>
  </section>
</template>
