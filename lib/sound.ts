'use client';

// Sonido corto sintetizado (sin archivo de audio externo) para confirmar
// que se agrego un producto al carrito.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) audioCtx = new AudioContextClass();
  return audioCtx;
}

function tocarBlip(ctx: AudioContext) {
  const ahora = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ahora);
  osc.frequency.exponentialRampToValueAtTime(950, ahora + 0.1);

  gain.gain.setValueAtTime(0.0001, ahora);
  gain.gain.exponentialRampToValueAtTime(0.25, ahora + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ahora + 0.22);

  osc.start(ahora);
  osc.stop(ahora + 0.22);
}

export function reproducirSonidoAgregado() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => tocarBlip(ctx)).catch(() => {});
    } else {
      tocarBlip(ctx);
    }
  } catch {
    // Audio no disponible -> fallo silencioso
  }
}
