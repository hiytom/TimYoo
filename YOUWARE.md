# YOUWARE Project Documentation

## Project Overview
This is a corporate website for a textile manufacturing company, built with Astro, TypeScript, and Tailwind CSS. The website highlights the company's cost advantages, production capacity, quality control, and global partnerships.

## Key Features
- **Responsive Navigation**: Transparent, mobile-friendly menu with smooth transitions.
- **Smart Sticky Navbar**: Navigation bar hides on scroll down and appears on scroll up for better screen real estate.
- **Back to Top**: Floating button to smoothly scroll back to the top of the page.
- **Hero Section**: Immersive background with clear value proposition and integrated key advantages grid.
- **Product Showcase**: Dynamic grid displaying 6 key product categories (Aprons, Chef Wear, Fast Fashion) with high-quality imagery.
- **Case Studies**: Detailed success stories (Nisbets, Zara) with alternating layouts (Left-Right / Right-Left) and structured content sections.
- **About Us Section**: Integrated into Homepage, including Timeline, Values, and Production Facility.
- **Content Localization**: Chinese requirements translated and polished into professional English.
- **Asset Management**: Optimized image loading and SVG logo for high-quality rendering.
- **Typography**: Uses Montserrat font for a modern, professional look.
- **Interactive Animations**: Smooth scroll, reveal transitions, hero motion, and hover effects using CSS and small inline browser scripts.

## Tech Stack
- **Framework**: Astro 7 + TypeScript
- **Routing**: File-based Astro routes
- **Build Tool**: Astro static build
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: CSS transitions/keyframes plus browser IntersectionObserver
- **Icons**: Inline Astro SVG component
- **Runtime**: Static HTML with no React hydration

## Development Commands
- `npm install`: Install dependencies
- `npm run dev`: Start Astro development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Project Structure
- `src/pages/`: Page components
  - `index.astro`: Landing page with integrated About section
  - `products/`: Static product detail routes
- `src/components/`: Reusable UI components
  - `astro/Hero.astro`: Landing section
  - `astro/Products.astro`: Product grid
  - `astro/CaseStudies.astro`: Success stories section
  - `astro/AboutSections.astro`: Timeline, values, and factory sections
  - `astro/ProductGalleryPage.astro`: Shared product gallery page
  - `astro/Icon.astro`: Inline SVG icons
- `src/assets/`: Static assets (images, logos)
- `src/layouts/BaseLayout.astro`: Shared site shell

## Future Roadmap
1. **Knowledge Hub**: Create a blog/news section.
2. **Backend Integration**: Implement contact form submission and CMS features.
