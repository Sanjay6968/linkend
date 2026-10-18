const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ImageRun, AlignmentType } = require("docx");

const createDoc = async () => {
  const images = {
    workspace: fs.readFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e2531f4f-5f1e-4534-a8b7-78dcf733942c\\.user_uploaded\\media_1786627729378.png"),
    drafts: fs.readFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e2531f4f-5f1e-4534-a8b7-78dcf733942c\\.user_uploaded\\media_1786627748475.png"),
    settings: fs.readFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e2531f4f-5f1e-4534-a8b7-78dcf733942c\\.user_uploaded\\media_1786627780227.png"),
    login: fs.readFileSync("C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e2531f4f-5f1e-4534-a8b7-78dcf733942c\\.user_uploaded\\media_1786627800047.png"),
  };

  const doc = new Document({
    creator: "Dezai Learners Internship",
    title: "ContentMint Frontend Implementation Report",
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          basedOn: "Normal",
          next: "Normal",
          run: { font: "Calibri", size: 24 }, // 12pt
          paragraph: { spacing: { after: 200 } }
        }
      ]
    },
    sections: [
      {
        properties: {},
        children: [
          // TITLE PAGE
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 800, after: 400 },
            children: [
              new TextRun({ text: "ContentMint:", bold: true, size: 48, font: "Calibri" }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 800 },
            children: [
              new TextRun({ text: "Frontend User Interface & Architecture Report", bold: true, size: 36, font: "Calibri" }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({ text: "Dezai Learners Internship Program", italics: true, size: 28, font: "Calibri" }),
            ],
          }),

          // 1.0 INTRODUCTION & SETUP
          new Paragraph({ text: "1.0 Introduction and Project Initialization", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: "The primary objective of this project phase was to fully architect, build, and stylize the Frontend User Interface (UI) for ContentMint, an AI-powered LinkedIn content generation platform. The foundation of the application was built using Next.js 16 (App Router) to leverage advanced server-side rendering and routing capabilities. The Turbopack compiler was utilized to drastically reduce local development compilation times." }),
          new Paragraph({ text: "Initial setup required scaffolding the project using 'create-next-app' and subsequently initializing the Shadcn UI library. Shadcn was chosen because it provides accessible, unstyled foundational components (like Cards, Inputs, and Dropdowns) that do not enforce a strict design language, allowing for complete customization." }),

          // 2.0 DESIGN SYSTEM & THEMING
          new Paragraph({ text: "2.0 Custom Design System: Earthy Botanical", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: "A critical requirement for this project was to establish a premium brand identity that diverges from standard, generic SaaS aesthetics. To achieve this, an 'Earthy Botanical' color palette was engineered:" }),
          new Paragraph({ text: "• Background Canvas: #0A0D08 (Very Dark Green/Black)", bullet: { level: 0 } }),
          new Paragraph({ text: "• Text & Typography: #DBCAC0 (Pale Sand)", bullet: { level: 0 } }),
          new Paragraph({ text: "• Primary Accents (Buttons/Active States): #6F8055 (Sage Green)", bullet: { level: 0 } }),
          new Paragraph({ text: "• Secondary Depth (Card Backgrounds): #3E4F32 (Forest Green)", bullet: { level: 0 } }),
          new Paragraph({ text: "• Highlights (Loading States/Alerts): #C2A3B3 (Mauve)", bullet: { level: 0 } }),
          new Paragraph({ text: "Implementation Details:", bold: true }),
          new Paragraph({ text: "Because Tailwind CSS v4 utilizes a completely modernized, CSS-variable-based engine rather than the legacy 'tailwind.config.js' file, the entire theme was established via a custom @theme block in globals.css. By mapping these specific hex codes to Shadcn's semantic CSS variables (e.g., --color-primary, --color-background), every single UI component installed automatically inherited the premium aesthetic without requiring tedious, manual CSS overrides throughout the codebase." }),

          // 3.0 LANDING PAGE
          new Paragraph({ text: "3.0 Landing Page & Interactive Elements", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: "The Landing Page (/) serves as the marketing entry point. It required high-fidelity interactions to demonstrate product value immediately." }),
          new Paragraph({ text: "Framer Motion Integration:", bold: true }),
          new Paragraph({ text: "A custom <ParticleBackground /> component was developed using Framer Motion to render 25 continuously floating, glowing orbs that utilize the 5-color palette. A significant technical challenge arose during implementation: Next.js threw severe Hydration Mismatch errors because the random X/Y coordinates of the particles were generated differently on the server versus the client." }),
          new Paragraph({ text: "To mitigate this, the particle generation logic was safely encapsulated within a React 'useEffect' hook, ensuring the mathematical coordinate randomization only executes strictly on the client-side after initial hydration." }),
          
          // 4.0 AUTHENTICATION FLOW
          new Paragraph({ text: "4.0 Authentication Flow & DOM Hydration Fixes", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: "The authentication routes (/login, /register, and /forgot-password) were grouped under an '(auth)' route group in Next.js to share a specialized layout that reuses the Particle Background for visual continuity." }),
          new Paragraph({ text: "Technical Challenge Resolved:", bold: true }),
          new Paragraph({ text: "During the construction of the login forms, a critical DOM Hydration error was triggered by Shadcn. The error stated: 'In HTML, <button> cannot be a descendant of <button>'. This occurred because the newest version of Shadcn utilizes @base-ui primitives which handle the 'asChild' polymorphic prop differently than previous Radix UI versions." }),
          new Paragraph({ text: "To resolve this architectural issue, the 'asChild' rendering logic was entirely bypassed on all form submission buttons. Instead, the native Shadcn 'buttonVariants' utility function was directly applied to standard Next.js <Link> components. This completely eliminated the nested button error while preserving the perfect styling." }),
          
          new Paragraph({
            children: [
              new ImageRun({ data: images.login, transformation: { width: 600, height: 260 }, type: "png" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 240 }
          }),

          // 5.0 DASHBOARD WORKSPACE
          new Paragraph({ text: "5.0 The Core Dashboard Workspace", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: "The primary /dashboard route acts as the AI generation workspace. It is structured using a global persistent sidebar for navigation, applying dynamic styling based on the current 'usePathname' to highlight active routes." }),
          new Paragraph({ text: "AI Composer & Live Preview:", bold: true }),
          new Paragraph({ text: "The workspace features a split-pane layout. The left column contains a large <Textarea> for prompt engineering, alongside native HTML5 date/time inputs for scheduling. The right column renders a 'Live Preview' panel. To provide a robust user experience, Shadcn <Tabs> were implemented to allow the user to seamlessly toggle between viewing a mock LinkedIn Text Post layout and a visual representation of a multi-slide Carousel mockup." }),

          new Paragraph({
            children: [
              new ImageRun({ data: images.workspace, transformation: { width: 600, height: 260 }, type: "png" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 240 }
          }),

          // 6.0 DRAFTS & SCHEDULING
          new Paragraph({ text: "6.0 Drafts Manager & Schedule Features", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: "To support comprehensive content management, two highly specialized sub-routes were developed:" }),
          new Paragraph({ text: "Drafts (/dashboard/drafts):", bold: true }),
          new Paragraph({ text: "Implemented a fully responsive CSS Grid layout displaying saved content cards. Each card utilizes a Shadcn <DropdownMenu> component anchored to a 'MoreVertical' icon, providing access to Edit and Delete actions." }),
          
          new Paragraph({
            children: [
              new ImageRun({ data: images.drafts, transformation: { width: 600, height: 260 }, type: "png" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 240 }
          }),

          new Paragraph({ text: "Schedule (/dashboard/schedule):", bold: true }),
          new Paragraph({ text: "Integrated the complex Shadcn <Calendar> component. The default generic styling was heavily overridden using custom classNames to ensure the active selected dates render in the application's signature Sage Green palette. Adjacent to the calendar, a custom chronological CSS-based timeline was engineered to display upcoming scheduled posts." }),

          // 7.0 SETTINGS
          new Paragraph({ text: "7.0 User Settings & API Configuration", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: "The /dashboard/settings page organizes user preferences using a tabbed interface. The most critical component developed here is the API Configuration tab. Because the application will rely on the Groq Llama 3.3 model for AI generation, a secure, masked input field was built for the user to input their personal 'gsk_' API key." }),

          new Paragraph({
            children: [
              new ImageRun({ data: images.settings, transformation: { width: 600, height: 260 }, type: "png" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 240 }
          }),

          // 8.0 CONCLUSION
          new Paragraph({ text: "8.0 Conclusion & Backend Roadmap", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: "The Frontend Development phase is officially 100% complete. The application is highly responsive, strictly adheres to the custom design system, and has been thoroughly debugged for React Hydration mismatches." }),
          new Paragraph({ text: "The next phase of development will focus exclusively on Backend Integration. This includes configuring a PostgreSQL database via Prisma ORM to persist the mock data, building secure Next.js API Routes for JWT session management, and successfully connecting the AI Composer to the Groq API endpoint for live content generation." }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("C:\\Users\\ASUS\\Downloads\\linkedin\\linkedin-content-generator\\docs\\ContentMint-Frontend-Report-v3.docx", buffer);
  console.log("Detailed Document generated perfectly.");
};

createDoc().catch(console.error);
