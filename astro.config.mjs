// Astro yapılandırma dosyası
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://www.yildizfatih.com',
  trailingSlash: 'always',
  
  // Build optimizasyonları
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  
  // CSS optimizasyonları
  vite: {
    css: {
      devSourcemap: false, // Production'da sourcemap kapalı

    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'tailwind': ['tailwindcss'],
            'vendor': ['astro']
          },
          // Asset optimization
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico|avif|webp/i.test(ext)) {
              return `images/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          }
        }
      },
      // Minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    // Performance optimizations
    ssr: false, // Static site generation
    experimental: {
      assets: true
    }
  },
  
  // Geliştirme sunucusu ayarları
  server: {
    host: 'localhost',
    port: 3000,
    open: true
  },
  
  // Geliştirme ortamı ayarları
  dev: {
    host: 'localhost',
    port: 3000
  }
});