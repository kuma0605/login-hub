<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    density?: number;
  }>(),
  {
    density: 1
  }
);

type Pulse = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  trail: number;
  life: number;
  maxLife: number;
};

const SPACING = 46;
const DIRS: ReadonlyArray<[number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

const canvasRef = ref<HTMLCanvasElement | null>(null);

let raf = 0;
let resizeHandler: (() => void) | null = null;

const initCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;
  let pulses: Pulse[] = [];
  let nodes: { x: number; y: number; phase: number; bright: boolean }[] = [];

  const spacing = SPACING / Math.min(Math.max(props.density, 0.6), 1.6);
  const snap = (v: number) => Math.round(v / spacing) * spacing;

  const spawnPulse = (): Pulse => {
    const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
    return {
      x: snap(Math.random() * width),
      y: snap(Math.random() * height),
      dx: dir[0],
      dy: dir[1],
      speed: 0.9 + Math.random() * 1.6,
      trail: spacing * (2 + Math.random() * 3),
      life: 0,
      maxLife: 420 + Math.random() * 360
    };
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(width / spacing) + 1;
    rows = Math.ceil(height / spacing) + 1;

    nodes = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (Math.random() > 0.34) continue;
        nodes.push({
          x: c * spacing,
          y: r * spacing,
          phase: Math.random() * Math.PI * 2,
          bright: Math.random() > 0.82
        });
      }
    }
    const count = Math.max(8, Math.round((width * height) / 120000));
    pulses = Array.from({ length: count }, spawnPulse);
  };

  const drawLattice = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(153, 246, 255, 0.16)';
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const x = c * spacing + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let r = 0; r <= rows; r++) {
      const y = r * spacing + 0.5;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  };

  const step = (t: number) => {
    ctx.clearRect(0, 0, width, height);
    drawLattice();

    // drifting particle nodes
    for (const n of nodes) {
      const pulse = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(t / 900 + n.phase);
      const size = n.bright ? 1.9 : 1.1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
      ctx.fillStyle = n.bright
        ? `rgba(153, 246, 228, ${0.4 + pulse * 0.6})`
        : `rgba(125, 211, 252, ${0.28 + pulse * 0.4})`;
      ctx.fill();
    }

    if (!reduced) {
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.life += 1;
        const nx = p.x + p.dx * p.speed;
        const ny = p.y + p.dy * p.speed;

        // turn at intersections
        const crossedX = p.dx !== 0 && Math.floor(nx / spacing) !== Math.floor(p.x / spacing);
        const crossedY = p.dy !== 0 && Math.floor(ny / spacing) !== Math.floor(p.y / spacing);
        if ((crossedX || crossedY) && Math.random() > 0.72) {
          if (p.dx !== 0) {
            p.dx = 0;
            p.dy = Math.random() > 0.5 ? 1 : -1;
            p.x = snap(nx);
          } else {
            p.dy = 0;
            p.dx = Math.random() > 0.5 ? 1 : -1;
            p.y = snap(ny);
          }
        } else {
          p.x = nx;
          p.y = ny;
        }

        const out =
          p.x < -spacing || p.x > width + spacing || p.y < -spacing || p.y > height + spacing;
        if (out || p.life > p.maxLife) {
          pulses[i] = spawnPulse();
          continue;
        }

        const tailX = p.x - p.dx * p.trail;
        const tailY = p.y - p.dy * p.trail;
        const grad = ctx.createLinearGradient(tailX, tailY, p.x, p.y);
        grad.addColorStop(0, 'rgba(103, 232, 249, 0)');
        grad.addColorStop(1, 'rgba(165, 243, 252, 0.9)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(165, 243, 252, 0.95)';
        ctx.fill();
      }
    }

    raf = requestAnimationFrame(step);
  };

  resize();
  raf = requestAnimationFrame(step);
  resizeHandler = resize;
  window.addEventListener('resize', resizeHandler);
};

const cleanup = () => {
  if (raf) cancelAnimationFrame(raf);
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
};

onMounted(() => {
  initCanvas();
});

onUnmounted(() => {
  cleanup();
});

watch(() => props.density, () => {
  cleanup();
  initCanvas();
});
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <canvas ref="canvasRef" class="h-full w-full" />
    <div
      class="absolute inset-0"
      :style="{
        background:
          'radial-gradient(120% 90% at 22% 8%, rgba(40,95,134,0.4) 0%, rgba(18,48,74,0.45) 50%, rgba(12,34,54,0.68) 100%)'
      }"
    />
    <div class="hud-scanlines absolute inset-0 opacity-40" />
  </div>
</template>
