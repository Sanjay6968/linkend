# Frontend Documentation: ContentMint
**Author:** Dezai Learners Internship
**Component:** UI & Frontend Implementation

## Overview
This document covers the frontend setup for ContentMint. The main goal for this phase was getting all the UI routes built and styled before connecting the Prisma database and Groq API. 

The project is built on Next.js 16 (App Router) using Tailwind CSS v4. Since Tailwind v4 handles variables differently, I set up a custom theme block in `globals.css` rather than using the standard config file.

## Design & Theming
I didn't want to use the default Shadcn styles because they look a bit too generic for a modern SaaS app. Instead, I went with an "Earthy Botanical" color scheme:
- Background: `#0A0D08` (basically black with a slight green tint)
- Text: `#DBCAC0` (sand/beige)
- Accents: `#6F8055` (sage green) and `#3E4F32` (dark forest)
- Highlights: `#C2A3B3` (mauve)

I mapped these hex codes directly to the Shadcn CSS variables so any component I install (like buttons or inputs) automatically picks up the styling without needing manual overrides every time.

## Page Structure

### 1. Landing Page
The entry point of the app. It has a custom particle background running on Framer Motion. 
*Note on the particles: I had to wrap the random coordinate generation inside a `useEffect` hook, otherwise Next.js kept throwing hydration mismatch errors between the server and client rendering.*

![Landing Page](./assets/landing-page.png)

### 2. Auth Flow
Contains the `/login`, `/register`, and `/forgot-password` routes.
These are pretty straightforward glass-morphism cards. I ran into a bug here where the Shadcn dropdowns and buttons were nesting `<button>` tags and causing DOM errors because of a recent Radix/Base-UI update. I fixed it by stripping out the `asChild` props and applying `buttonVariants` directly to the Next.js `Link` components.

![Login Page](./assets/login-page.png)

### 3. Dashboard Workspace
The main `/dashboard` route is where the AI generation happens.
- Left side: A large text area for the prompt and standard date/time inputs for scheduling.
- Right side: A live preview panel. Right now it just uses `setTimeout` to fake a loading state, but eventually it will render the actual Groq API response. I used Shadcn tabs here so you can toggle between viewing the text post and the carousel mockup.

![Dashboard Workspace](./assets/dashboard-workspace.png)

### 4. Drafts & Schedule
- **/dashboard/drafts:** A simple grid showing saved posts. I added a Shadcn dropdown menu on each card for edit/delete actions.
- **/dashboard/schedule:** Used the Shadcn `<Calendar>` component here. I had to heavily customize the classes so the selected dates show up as Sage Green instead of the default black/white. I also built a custom CSS timeline on the right side to list the posts scheduled for that specific date.

![Drafts Page](./assets/dashboard-drafts.png)
![Schedule Page](./assets/dashboard-schedule.png)

### 5. Settings
Located at `/dashboard/settings`. Just a standard tabbed interface.
The most important part here is the API Keys tab. Since this app uses Groq for the AI, users will need to paste their own `gsk_...` key here. 

![Settings Page](./assets/dashboard-settings.png)

## Next Steps
Frontend is basically done. The next step is setting up the PostgreSQL database and writing the API routes to handle the actual AI generation and user sessions.
