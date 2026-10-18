# ContentMint Landing Page: Detailed Technical Documentation

This document provides an exhaustive, in-depth explanation of the architecture, design systems, and component logic implemented in the `src/app/page.tsx` file for the ContentMint application.

## 1. Architectural Overview

The landing page is built as a highly interactive, client-side rendered (CSR) React component using Next.js 16 (App Router). Because the page relies heavily on scroll events, mouse tracking, and browser-specific timing APIs (`setInterval`), the entire file is demarcated with the `"use client"` directive at the top of the file.

The page is structurally divided into four main visual layers:
1. **The Background Layer:** Contains the floating particle system and static CSS gradient blurs.
2. **The Navigation Layer:** A sticky, scroll-responsive header.
3. **The Hero Section:** Contains the main typography, CTA buttons, and the interactive mockup.
4. **The Features Section:** Contains the 3D-tilting informational cards.

---

## 2. Design System & Theme Integration

The visual identity of the page is driven by a custom 5-color "Earthy Botanical" palette. Instead of scattering hardcoded hex values across the application, this palette is tightly integrated with the **Tailwind CSS v4 `@theme` engine** and the **shadcn-ui** configuration in `globals.css`.

### The 5-Color Palette
* **Background:** Very Dark Green / Almost Black (`#0A0D08`)
* **Text & Typography:** Pale Sand / Beige (`#DBCAC0`)
* **Primary Elements:** Muted Sage Green (`#6F8055`)
* **Secondary Elements & Depth:** Dark Forest Green (`#3E4F32`)
* **Accents & Highlights:** Pale Mauve / Lilac (`#C2A3B3`)

### Shadcn Integration Strategy
Because Shadcn UI components rely on semantic CSS variables (e.g., `--color-border`, `--color-primary`), we mapped our exact hex codes to these variables inside `globals.css`. 
For example, the Sand color (`#DBCAC0`) is mapped to `--color-foreground`, and the Sage Green (`#6F8055`) is mapped to `--color-primary`. This ensures that any new UI components added to the project will automatically render in the correct botanical theme without requiring manual styling overrides.

---

## 3. Component Deep-Dive

### A. The Particle Background (`<ParticleBackground />`)
The particle system is a purely aesthetic component that creates a sense of depth and continuous motion.

* **State Management:** It uses a React `useState` array to hold configuration data for 25 individual particles.
* **Hydration Safety:** The particle array is generated inside a `useEffect` hook. If we generated the random `x` and `y` coordinates directly during the initial render, Next.js would throw a Hydration Mismatch error because the server-rendered HTML would differ from the client-rendered HTML.
* **Color Distribution:** The component dynamically cycles through our `PALETTE` array so that the glowing orbs are a mix of Mauve, Forest Green, Sage Green, and Sand.
* **Framer Motion Animation:** Each particle is wrapped in a `<motion.div>` and given an `animate` property that loops infinitely (`repeat: Infinity`). It uses a keyframe array (`y: [0, -100, 0]`) to make the particles drift up and back down smoothly.

### B. The 3D Tilt Feature Cards (`<FeatureCard />`)
The feature cards located at the bottom of the page use advanced mouse-tracking and physics-based animations to create a premium, tactile feel.

* **Mouse Tracking:** We use Framer Motion's `useMotionValue` to store the exact `X` and `Y` coordinates of the user's cursor.
* **Calculating the Tilt:** Inside the `handleTilt` function, we calculate the cursor's percentage position relative to the center of the card (`xPct = mouseXPos / width - 0.5`). 
* **Spring Physics:** Rather than rotating the card directly to the calculated percentage, we pass the values through `useSpring`. This adds simulated physical weight and friction to the rotation, ensuring the card glides smoothly rather than snapping abruptly.
* **The Dynamic Glow:** Inside the card, there is a hidden layer with `opacity-0` that becomes visible on hover. We use `useMotionTemplate` to inject the tracked `mouseX` and `mouseY` coordinates into a CSS `radial-gradient`. This draws a soft, glowing orb exactly beneath the cursor, mimicking a physical light source passing under frosted glass.

### C. The Interactive Mockup (`<InteractiveMockup />`)
Instead of an embedded video, the hero section utilizes a coded, state-driven animation to demonstrate the application's core value proposition (AI generation).

* **The State Machine:** The component relies on a simple integer state (`step`), which increments from 0 to 3. 
* **The Timer:** A `setInterval` inside a `useEffect` hook fires every 3,000 milliseconds (3 seconds) to advance the step.
* **Conditional Rendering:**
  * **Step 0:** Renders the user's prompt (simulating the input).
  * **Step 1:** Renders a pulsing "Groq Llama 3.3 is analyzing..." loading state.
  * **Step 2 & 3:** Renders the final output, sliding in the generated text and a visual representation of a 3-slide carousel.
* **Animation:** Every element entering the DOM is wrapped in `<motion.div>` with a spring transition, causing the fake UI elements to bounce into place exactly like a real, snappy web application.

### D. The Dynamic Scroll Navigation
The top navigation bar acts as a transparency layer that solidifies as the user scrolls, ensuring it is always legible against the changing background elements.

* **Scroll Tracking:** Framer Motion's `useScroll` hook listens to the window's vertical scroll position.
* **Threshold Logic:** An event listener is attached to the scroll value: `scrollY.on("change", (latest) => setIsScrolled(latest > 50))`.
* **Tailwind Application:** If `isScrolled` is true, the navbar transitions from `bg-transparent` to `bg-[#0A0D08]/90 backdrop-blur-xl`. This applies a heavy glassmorphism blur effect to the background, creating a frosted glass header.

---

## 4. Conclusion
The codebase is structured to prioritize visual impact without sacrificing performance. By leveraging Framer Motion variants and keeping complex state logic isolated within discrete components (like `<ParticleBackground />`), the main `<LandingPage />` component remains declarative and easy to read.
