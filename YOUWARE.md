# YOUWARE Project Documentation

## Project Overview
This is a corporate website for a textile manufacturing company, built with React, TypeScript, Vite, and Tailwind CSS. The website highlights the company's cost advantages, production capacity, quality control, and global partnerships.

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
- **Interactive Animations**: Smooth scroll and hover effects using Framer Motion.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Routing**: React Router DOM 6
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion 11.0.8
- **Icons**: Lucide React
- **State Management**: React Hooks (local state)

## Development Commands
- `npm install`: Install dependencies
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Project Structure
- `src/pages/`: Page components
  - `Home.tsx`: Landing page with integrated About section
- `src/components/`: Reusable UI components
  - `Navbar.tsx`: Top navigation with routing support
  - `Hero.tsx`: Landing section
  - `AboutOnHome.tsx`: Contact/Partner section with value proposition (ID: `contact`)
  - `Products.tsx`: Product grid
  - `CaseStudies.tsx`: Main container for success stories
  - `case-studies/`: Sub-components for Case Studies section
  - `about/`: Sub-components for About Us page
    - `TimelineSection.tsx`: Company history
    - `ValuesSection.tsx`: Vision and values with 2-column layout (Image + List)
    - `FactorySection.tsx`: Combined factory stats, equipment, and images
  - `Footer.tsx`: Site footer
- `src/assets/`: Static assets (images, logos)
- `src/App.tsx`: Main application layout with Routes

## Future Roadmap
1. **Knowledge Hub**: Create a blog/news section.
2. **Backend Integration**: Implement contact form submission and CMS features.
