// lenis.js - Konfigurasi yang diperbaiki
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  // Tambahkan opsi ini untuk mengatasi masalah fixed element
  lerp: 0.1, // Smooth interpolation
  wheelMultiplier: 1,
  touchMultiplier: 2,
  // Jangan gunakan transform pada body/html
  wrapper: window,
  content: document.documentElement,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

export default lenis;