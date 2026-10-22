import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  colorRgb: string;
  pulsePhase: number;
  pulseSpeed: number;
  hasGlowHalo: boolean;
}

export function CosmicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Harmonized with cosmic nebula palette
    const particleColors = [
      "245, 158, 11", // Warm amber / solar gold
      "168, 85, 247", // Amethyst / violet
      "99, 102, 241", // Electric indigo
      "56, 189, 248", // Celestial cyan
      "243, 239, 230", // Pearl starlight
      "217, 70, 239", // Cosmic dust magenta
    ];

    let particles: Particle[] = [];

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function initParticles() {
      // Responsive particle count proportional to viewport area (sparse, subtle, elegant)
      const count = Math.min(
        75,
        Math.max(30, Math.floor((width * height) / 28000))
      );
      particles = [];

      for (let i = 0; i < count; i++) {
        const radius =
          Math.random() < 0.15
            ? 2.2 + Math.random() * 1.1 // Prominent stellar beacon
            : Math.random() < 0.45
            ? 1.3 + Math.random() * 0.7 // Medium stardust mote
            : 0.6 + Math.random() * 0.6; // Fine cosmic dust

        const baseAlpha = 0.2 + Math.random() * 0.45;
        const colorRgb =
          particleColors[Math.floor(Math.random() * particleColors.length)];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Subtle upward cosmic drift with gentle lateral wander
          vx: (Math.random() - 0.5) * 0.12,
          vy: -0.08 - Math.random() * 0.2,
          radius,
          baseAlpha,
          alpha: baseAlpha,
          colorRgb,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.025,
          hasGlowHalo: radius > 1.8 && Math.random() < 0.7,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx?.scale(dpr, dpr);
      initParticles();
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let isDocumentVisible = !document.hidden;
    function handleVisibilityChange() {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible && !prefersReducedMotion) {
        lastTime = performance.now();
        render(performance.now());
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();

    function render(currentTime: number) {
      if (!ctx || !isDocumentVisible) return;

      const delta = Math.min(currentTime - lastTime, 64) / 16.67;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Update position
          p.x += p.vx * delta;
          p.y += p.vy * delta;

          // Wrap smoothly across viewport bounds
          if (p.y < -12) p.y = height + 12;
          if (p.y > height + 12) p.y = -12;
          if (p.x < -12) p.x = width + 12;
          if (p.x > width + 12) p.x = -12;

          // Gentle shimmer twinkle
          p.pulsePhase += p.pulseSpeed * delta;
          const shimmer = Math.sin(p.pulsePhase);
          p.alpha = Math.max(
            0.08,
            Math.min(0.85, p.baseAlpha + shimmer * 0.22)
          );
        }

        // Draw soft outer atmospheric glow halo for stellar motes
        if (p.hasGlowHalo) {
          const glowRadius = p.radius * 4.5;
          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            glowRadius
          );
          gradient.addColorStop(0, `rgba(${p.colorRgb}, ${p.alpha * 0.35})`);
          gradient.addColorStop(0.5, `rgba(${p.colorRgb}, ${p.alpha * 0.12})`);
          gradient.addColorStop(1, `rgba(${p.colorRgb}, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw core particle
        ctx.fillStyle = `rgba(${p.colorRgb}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    if (prefersReducedMotion) {
      render(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
}
