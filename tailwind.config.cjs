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
        }
      }
    },
    
    // CSS optimizasyonları
    future: {
      hoverOnlyWhenSupported: true,
      respectDefaultRingColor: true
    },
    
    plugins: [require('@tailwindcss/typography')]
  };