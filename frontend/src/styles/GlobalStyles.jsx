import { theme } from './theme';

export const pageStyles = {
  // Hero section for all pages
  hero: {
    wrapper: 'bg-blue-900 text-white py-20',
    title: 'text-5xl font-bold mb-4',
    subtitle: 'text-xl text-blue-100 max-w-2xl',
  },
  
  // Section headers
  sectionHeader: {
    wrapper: 'text-center mb-12',
    tag: 'inline-block bg-blue-100 text-blue-600 text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4',
    title: 'text-4xl font-bold text-gray-900 mb-4',
    subtitle: 'text-xl text-gray-600 max-w-2xl mx-auto',
  },
  
  // Cards
  card: {
    base: 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow',
    hover: 'hover:shadow-lg transition-shadow',
    body: 'p-6',
  },
  
  // Stats
  stats: {
    grid: 'grid grid-cols-2 md:grid-cols-4 gap-6',
    item: 'text-center',
    number: 'text-3xl font-bold text-blue-600 mb-1',
    label: 'text-sm text-gray-600',
  },
  
  // Grid layouts
  grids: {
    two: 'grid grid-cols-1 md:grid-cols-2 gap-8',
    three: 'grid grid-cols-1 md:grid-cols-3 gap-8',
    four: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
  },
  
  // Buttons (matching your CSS)
  buttons: {
    primary: 'btn-primary',
    outline: 'btn-outline',
    outlineLight: 'btn-outline-light',
    accent: 'btn-accent',
  },
  
  // Spacing
  spacing: {
    section: 'section-padding',
    container: 'container-custom',
  },
  
  // Text utilities
  text: {
    gradient: 'text-gradient',
    white: 'text-white',
    gray: 'text-gray-600',
    dark: 'text-gray-900',
    blue: 'text-blue-600',
  },
};