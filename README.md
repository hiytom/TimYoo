# TIMYOO Astro Website

Static Astro website for TIMYOO's apparel manufacturing business.

## Key Features

- **Astro + TypeScript** - Static HTML output for SEO-focused pages
- **Tailwind CSS** - Utility-first CSS framework
- **Astro build pipeline** - Fast static site generation
- **Static routes** - Home, chef wear, casuals, and aprons pages

## Tech Stack

### Core Technologies
- Astro 7 + TypeScript 5.8.3
- Tailwind CSS 3.4.17 (CSS framework)

### Runtime
- No React hydration is used in the production pages.
- Page interactions use static HTML, CSS animations, and small inline browser scripts.

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Visit http://127.0.0.1:5173 to view the application

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview build**:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── assets/          # Source assets
├── components/astro # Astro components
├── data/            # Shared site data
├── layouts/         # Astro layouts
├── pages/           # Astro routes
└── index.css        # Global Tailwind CSS
```

## More Information

For more detailed project structure, tech stack, configuration instructions and development guide, please refer to the [YOUWARE.md](./YOUWARE.md) file.
