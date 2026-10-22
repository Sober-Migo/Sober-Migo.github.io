# Artistic Deep Cosmic Nebula & Animated Gradient Background

Transform the portfolio from a standard dark surface into a captivating piece of digital art featuring a deep cosmic nebula background with slow-drifting rich violet, indigo, and warm gold radial gradient orbs, ambient star dust, and luminous glass card reflections.

## User Review & Critical Decisions

> [!IMPORTANT]
> The plan integrates the user's confirmed choices from Phase 1:
> - **Confirmed Color Direction**: Deep cosmic nebula palette featuring rich violet (`#7c3aed`), electric indigo (`#4f46e5` / `#3b82f6`), and warm gold/amber bursts (`#f59e0b` / `#c47a3a`) over a velvety space canvas (`#070a10`).
> - **Confirmed Texture & Motion**: Multi-layered, slow-drifting animated gradient orbs with deep radial blurs (`blur(100px)–blur(140px)`), creating an ethereal breathing atmosphere beneath the frosted glass interface.

---

## 1. Overview & Core Concept

- **What It Does**: Replaces the basic static background with a living, artistic cosmic canvas. Three large, beautifully tinted gradient orbs drift slowly across the viewport on asynchronous orbital paths, casting rich violet, indigo, and warm gold ambient hues through the frosted glass cards, navigation bar, and modals.
- **Target Audience / Impression**: Technical recruiters, investors, and fellow engineers seeing a portfolio that reflects exceptional visual craft, technical depth, and attention to detail.
- **Key Value**: Turns the portfolio into a museum-grade digital showcase while keeping text typography razor-sharp with WCAG AA compliant contrast ratios.

---

## 2. User Experience & Visual Design

### Key Visual Layers
1. **Base Deep Space Canvas**:
   - Deep obsidian field: `linear-gradient(180deg, #07090f 0%, #0a0e17 50%, #06080d 100%)`.
   - Subtle radial vignette focusing attention on the center content column.
2. **Layer 1 — Violet / Amethyst Drift Orb (Top-Right / Center)**:
   - Dimensions: $600\text{px}\times 600\text{px}$ to $800\text{px}\times 800\text{px}$.
   - Radial gradient: `radial-gradient(circle, rgba(124, 58, 237, 0.28) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)`.
   - Animation: 28-second smooth drifting figure-eight orbit with gentle scaling.
3. **Layer 2 — Deep Indigo / Cyan Electric Glow (Bottom-Left / Center)**:
   - Dimensions: $700\text{px}\times 700\text{px}$.
   - Radial gradient: `radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(14, 165, 233, 0.12) 50%, transparent 70%)`.
   - Animation: 34-second counter-clockwise undulating drift.
4. **Layer 3 — Radiant Warm Gold Solar Flare (Hero & Projects Accent)**:
   - Dimensions: $500\text{px}\times 500\text{px}$.
   - Radial gradient: `radial-gradient(circle, rgba(245, 158, 11, 0.24) 0%, rgba(196, 122, 58, 0.14) 45%, transparent 70%)`.
   - Animation: 22-second subtle breathing and floating motion.
5. **Glass Refraction Synergy**:
   - The frosted glass elements (`.glass`, `.glass-modal`, project cards, navigation header) will naturally refract the drifting colors behind them, illuminating their borders and surfaces with dynamic color shifts.

### Accessibility & Performance
- **Compositor-Only Motion**: Orbs animated strictly via GPU-accelerated `transform: translate3d(...) scale(...)`.
- **Zero Layout Shift**: Fixed positioning (`fixed inset-0 overflow-hidden pointer-events-none`) prevents any scrollbar flickering or layout reflow.
- **Strict Reduced Motion**: `@media (prefers-reduced-motion: reduce)` immediately pauses the drifting keyframes and locks the gradients in an elegant static configuration.
- **High Text Legibility**: All text maintains over 7:1 contrast on top of dark structural glass backgrounds.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Pure CSS GPU-Accelerated Orbs vs Heavy Canvas/Three.js Shader**
  - *Chosen Approach*: Implement the gradient nebula with pure CSS radial gradients, `filter: blur(...)`, and `transform: translate3d(...)` keyframes.
  - *Why*: Consumes virtually 0% CPU, runs at native 60fps/120fps across mobile and desktop, requires zero external libraries, and loads instantly without WebGL context overhead.
  - *Alternatives Considered*: WebGL fragment shader; rejected due to high GPU battery drain on mobile and potential sandbox initialization hiccups.

- **Decision 2: Dedicated Fixed Background Component (`CosmicBackground.tsx`)**
  - *Chosen Approach*: Encapsulate the background art in `src/components/site/CosmicBackground.tsx`, mounted at the root of `src/routes/index.tsx`.
  - *Why*: Keeps code modular, easy to maintain or tweak, and completely decoupled from content sections.

---

## 4. Technical Architecture & Component Mapping

### Visual Layer Hierarchy

```
┌────────────────────────────────────────────────────────┐
│                   App Shell (Index)                    │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ CosmicBackground (fixed inset-0, z-0)            │  │
│  │   ├── Deep obsidian space gradient               │  │
│  │   ├── Violet Nebula Orb (drift-orb-1, 28s)       │  │
│  │   ├── Electric Indigo Glow (drift-orb-2, 34s)    │  │
│  │   └── Warm Gold Solar Flare (drift-orb-3, 22s)   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Content Layer (relative z-10)                    │  │
│  │   ├── Sticky Header (frosted glass)              │  │
│  │   ├── Hero Section (frosted visual panel)        │  │
│  │   ├── Projects Grid (illuminated glass cards)    │  │
│  │   ├── Social Dock & Contact (glass-modal)        │  │
│  │   └── Footer                                     │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Floating Action Dock (fixed z-40)                │  │
│  │   ├── BackToTopButton (glass-modal)              │  │
│  │   └── FloatingContactButton (glass + pulse)      │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Component & Style Updates
- `src/styles.css`: Add keyframe animations `orb-drift-1`, `orb-drift-2`, and `orb-drift-3`, plus optimized blur filter utilities.
- `src/components/site/CosmicBackground.tsx`: Create the fixed background art component with three cosmic gradient emitters.
- `src/routes/index.tsx`: Mount `<CosmicBackground />` at the root of the layout.
