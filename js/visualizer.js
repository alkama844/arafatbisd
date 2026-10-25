/**
 * ELECTRICAL OSCILLOSCOPE & SIGNAL VISUALIZER
 * Generates an authentic technical waveform simulation (230V / 50Hz AC).
 * Automatically throttles when scrolled off-screen to save CPU and battery.
 */

class ElectricalOscilloscope {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.animationFrameId = null;
    this.offset = 0;
    this.isVisible = true;

    // Check prefers-reduced-motion
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Observe visibility to optimize performance
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationFrameId && !this.prefersReducedMotion) {
            this.loop();
          }
        });
      }, { threshold: 0.1 });

      observer.observe(this.canvas);
    }

    if (!this.prefersReducedMotion) {
      this.loop();
    } else {
      this.draw(0); // static single frame
    }
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  loop() {
    if (!this.isVisible || this.prefersReducedMotion) {
      this.animationFrameId = null;
      return;
    }

    this.offset += 0.04;
    this.draw(this.offset);
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  draw(time) {
    const { ctx, width, height } = this;
    if (!ctx || !width || !height) return;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Oscilloscope Grid / Graticule
    const gridSize = 24;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.06)';
    }

    ctx.beginPath();
    for (let x = 0; x < width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Center baseline
    const centerY = height / 2;
    ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.18)' : 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // 2. Draw Simulated 230V 50Hz AC Pure Sine Wave with Harmonic
    const amplitude = height * 0.32;
    const frequency = 0.024;
    const beamColor = isLight ? '#0284c7' : '#00f0ff';
    const glowColor = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(0, 240, 255, 0.5)';

    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = isLight ? 4 : 10;
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = beamColor;

    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      // Primary 50Hz fundamental + subtle 3rd harmonic
      const y1 = Math.sin((x * frequency) + time) * amplitude;
      const y3 = Math.sin(((x * frequency * 3) + time * 2)) * (amplitude * 0.06);
      const y = centerY + y1 + y3;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.restore();

    // 3. Draw Secondary 3-Phase Reference Wave (Phase B: 120deg offset)
    const phaseBColor = isLight ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = phaseBColor;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const y = centerY + Math.sin((x * frequency) + time + (2 * Math.PI / 3)) * (amplitude * 0.7);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ElectricalOscilloscope('oscilloscope-canvas');
});
