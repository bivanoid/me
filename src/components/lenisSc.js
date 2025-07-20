import Lenis from '@studio-freight/lenis';

const lenisSc = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

export default lenisSc;