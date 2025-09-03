// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}'],
    
    // Build optimizasyonları
    corePlugins: {
      preflight: true,
      container: true,
      accessibility: true
    },
    
    // Performance optimizations
    future: {
      hoverOnlyWhenSupported: true,
      respectDefaultRingColor: true
    },
    

    
    theme: {
      extend: {
        colors: {
          accent: '#C6FF00',
          // Enhanced color palette for better dark mode support
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Space Grotesk', 'Inter', 'sans-serif'],
          mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
        },
        // Enhanced transitions for smooth theme switching
        transitionProperty: {
          'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        },
        transitionDuration: {
          '800': '800ms',
          '1000': '1000ms',
        },
        transitionTimingFunction: {
          'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        animation: {
          'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-up': 'slideUp 1s cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-down': 'slideDown 1s cubic-bezier(0.4, 0, 0.2, 1)',
          'scale-in': 'scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        // Performance optimizations
        screens: {
          'xs': '475px',
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
        }
      }
    },
    
    plugins: [
      require('@tailwindcss/typography'),
      // Custom performance plugin
      function({ addUtilities, theme }) {
        const newUtilities = {
          '.will-change-auto': { 'will-change': 'auto' },
          '.will-change-scroll': { 'will-change': 'scroll-position' },
          '.will-change-contents': { 'will-change': 'contents' },
          '.will-change-transform': { 'will-change': 'transform' },
          '.contain-layout': { 'contain': 'layout' },
          '.contain-style': { 'contain': 'style' },
          '.contain-paint': { 'contain': 'paint' },
          '.contain-size': { 'contain': 'size' },
          '.contain-strict': { 'contain': 'strict' },
        }
        addUtilities(newUtilities)
      }
    ]
  };