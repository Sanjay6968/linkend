const fs = require("fs");

const createHtml = () => {
  const images = {
    workspace: fs.readFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e2531f4f-5f1e-4534-a8b7-78dcf733942c\\.user_uploaded\\media_1786627729378.png").toString("base64"),
    drafts: fs.readFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e2531f4f-5f1e-4534-a8b7-78dcf733942c\\.user_uploaded\\media_1786627748475.png").toString("base64"),
    settings: fs.readFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e2531f4f-5f1e-4534-a8b7-78dcf733942c\\.user_uploaded\\media_1786627780227.png").toString("base64"),
    login: fs.readFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e2531f4f-5f1e-4534-a8b7-78dcf733942c\\.user_uploaded\\media_1786627800047.png").toString("base64"),
  };

  const html = `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Arial', sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px; }
  h1 { font-size: 24pt; margin-top: 40px; }
  h2 { font-size: 18pt; margin-top: 30px; }
  h3 { font-size: 14pt; margin-top: 20px; }
  p { font-size: 12pt; margin-bottom: 15px; }
  img { max-width: 100%; border: 1px solid #ccc; margin: 20px 0; }
  .title-page { text-align: center; margin-bottom: 100px; margin-top: 50px; }
  .title-page h1 { font-size: 36pt; margin-bottom: 10px; }
  .title-page h2 { font-size: 24pt; font-weight: normal; margin-bottom: 10px; }
  .title-page h3 { font-size: 18pt; font-style: italic; font-weight: normal; }
</style>
</head>
<body>

<div class="title-page">
  <h1>ContentMint:</h1>
  <h2>Frontend User Interface & Architecture Report</h2>
  <h3>Dezai Learners Internship Program</h3>
</div>

<h1>1.0 Introduction and Project Initialization</h1>
<p>The primary objective of this project phase was to fully architect, build, and stylize the Frontend User Interface (UI) for ContentMint, an AI-powered LinkedIn content generation platform. The foundation of the application was built using Next.js 16 (App Router) to leverage advanced server-side rendering and routing capabilities. The Turbopack compiler was utilized to drastically reduce local development compilation times.</p>
<p>Initial setup required scaffolding the project using 'create-next-app' and subsequently initializing the Shadcn UI library. Shadcn was chosen because it provides accessible, unstyled foundational components (like Cards, Inputs, and Dropdowns) that do not enforce a strict design language, allowing for complete customization.</p>

<h1>2.0 Custom Design System: Earthy Botanical</h1>
<p>A critical requirement for this project was to establish a premium brand identity that diverges from standard, generic SaaS aesthetics. To achieve this, an 'Earthy Botanical' color palette was engineered:</p>
<ul>
  <li><strong>Background Canvas:</strong> #0A0D08 (Very Dark Green/Black)</li>
  <li><strong>Text & Typography:</strong> #DBCAC0 (Pale Sand)</li>
  <li><strong>Primary Accents:</strong> #6F8055 (Sage Green)</li>
  <li><strong>Secondary Depth:</strong> #3E4F32 (Forest Green)</li>
  <li><strong>Highlights:</strong> #C2A3B3 (Mauve)</li>
</ul>
<p><strong>Implementation Details:</strong><br/>
Because Tailwind CSS v4 utilizes a completely modernized, CSS-variable-based engine rather than the legacy 'tailwind.config.js' file, the entire theme was established via a custom @theme block in globals.css. By mapping these specific hex codes to Shadcn's semantic CSS variables (e.g., --color-primary, --color-background), every single UI component installed automatically inherited the premium aesthetic without requiring tedious, manual CSS overrides throughout the codebase.</p>

<h1>3.0 Landing Page & Interactive Elements</h1>
<p>The Landing Page (/) serves as the marketing entry point. It required high-fidelity interactions to demonstrate product value immediately.</p>
<p><strong>Framer Motion Integration:</strong><br/>
A custom <code>&lt;ParticleBackground /&gt;</code> component was developed using Framer Motion to render 25 continuously floating, glowing orbs that utilize the 5-color palette. A significant technical challenge arose during implementation: Next.js threw severe Hydration Mismatch errors because the random X/Y coordinates of the particles were generated differently on the server versus the client.</p>
<p>To mitigate this, the particle generation logic was safely encapsulated within a React 'useEffect' hook, ensuring the mathematical coordinate randomization only executes strictly on the client-side after initial hydration.</p>

<h1>4.0 Authentication Flow & DOM Hydration Fixes</h1>
<p>The authentication routes (/login, /register, and /forgot-password) were grouped under an '(auth)' route group in Next.js to share a specialized layout that reuses the Particle Background for visual continuity.</p>
<p><strong>Technical Challenge Resolved:</strong><br/>
During the construction of the login forms, a critical DOM Hydration error was triggered by Shadcn. The error stated: 'In HTML, &lt;button&gt; cannot be a descendant of &lt;button&gt;'. This occurred because the newest version of Shadcn utilizes @base-ui primitives which handle the 'asChild' polymorphic prop differently than previous Radix UI versions.</p>
<p>To resolve this architectural issue, the 'asChild' rendering logic was entirely bypassed on all form submission buttons. Instead, the native Shadcn 'buttonVariants' utility function was directly applied to standard Next.js &lt;Link&gt; components. This completely eliminated the nested button error while preserving the perfect styling.</p>

<div style="text-align: center;">
  <img src="data:image/png;base64,${images.login}" alt="Login Page" />
</div>

<h1>5.0 The Core Dashboard Workspace</h1>
<p>The primary /dashboard route acts as the AI generation workspace. It is structured using a global persistent sidebar for navigation, applying dynamic styling based on the current 'usePathname' to highlight active routes.</p>
<p><strong>AI Composer & Live Preview:</strong><br/>
The workspace features a split-pane layout. The left column contains a large &lt;Textarea&gt; for prompt engineering, alongside native HTML5 date/time inputs for scheduling. The right column renders a 'Live Preview' panel. To provide a robust user experience, Shadcn &lt;Tabs&gt; were implemented to allow the user to seamlessly toggle between viewing a mock LinkedIn Text Post layout and a visual representation of a multi-slide Carousel mockup.</p>

<div style="text-align: center;">
  <img src="data:image/png;base64,${images.workspace}" alt="Dashboard Workspace" />
</div>

<h1>6.0 Drafts Manager & Schedule Features</h1>
<p>To support comprehensive content management, two highly specialized sub-routes were developed:</p>
<p><strong>Drafts (/dashboard/drafts):</strong><br/>
Implemented a fully responsive CSS Grid layout displaying saved content cards. Each card utilizes a Shadcn &lt;DropdownMenu&gt; component anchored to a 'MoreVertical' icon, providing access to Edit and Delete actions.</p>

<div style="text-align: center;">
  <img src="data:image/png;base64,${images.drafts}" alt="Drafts Page" />
</div>

<p><strong>Schedule (/dashboard/schedule):</strong><br/>
Integrated the complex Shadcn &lt;Calendar&gt; component. The default generic styling was heavily overridden using custom classNames to ensure the active selected dates render in the application's signature Sage Green palette. Adjacent to the calendar, a custom chronological CSS-based timeline was engineered to display upcoming scheduled posts.</p>

<h1>7.0 User Settings & API Configuration</h1>
<p>The /dashboard/settings page organizes user preferences using a tabbed interface. The most critical component developed here is the API Configuration tab. Because the application will rely on the Groq Llama 3.3 model for AI generation, a secure, masked input field was built for the user to input their personal 'gsk_' API key.</p>

<div style="text-align: center;">
  <img src="data:image/png;base64,${images.settings}" alt="Settings Page" />
</div>

<h1>8.0 Conclusion & Backend Roadmap</h1>
<p>The Frontend Development phase is officially 100% complete. The application is highly responsive, strictly adheres to the custom design system, and has been thoroughly debugged for React Hydration mismatches.</p>
<p>The next phase of development will focus exclusively on Backend Integration. This includes configuring a PostgreSQL database via Prisma ORM to persist the mock data, building secure Next.js API Routes for JWT session management, and successfully connecting the AI Composer to the Groq API endpoint for live content generation.</p>

</body>
</html>`;

  fs.writeFileSync("C:\\Users\\ASUS\\Downloads\\linkedin\\linkedin-content-generator\\docs\\ContentMint-Frontend-Report.html", html);
  console.log("HTML Document generated perfectly.");
};

createHtml();
