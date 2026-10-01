'use client';

// Sonido corto sintetizado (sin archivo de audio externo) para confirmar
// que se agrego un producto al carrito.
export function reproducirSonidoAgregado() {
  if (typeof window === 'undefined') return;

  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    const ahora = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ahora);
    osc.frequency.exponentialRampToValueAtTime(950, ahora + 0.1);

    gain.gain.setValueAtTime(0.0001, ahora);
    gain.gain.exponentialRampToValueAtTime(0.18, ahora + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ahora + 0.22);

    osc.start(ahora);
    osc.stop(ahora + 0.22);
    osc.onended = () => ctx.close();
  } catch {
    // Audio no disponible (ej. autoplay bloqueado) -> fallo silencioso
  }
}
