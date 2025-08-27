// Astro yapılandırma dosyası
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://yildizfatih.com',
  
  // Build optimizasyonları
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  
  // CSS optimizasyonları
  vite: {
    css: {
      devSourcemap: true
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'tailwind': ['tailwindcss']
          }
        }
      }
    }
  },
  
  // Geliştirme sunucusu ayarları
  server: {
    host: 'localhost', // Yerel geliştirme için localhost
    port: 3000, // Varsayılan port
    open: true // Tarayıcıyı otomatik aç
  },
  
  // Geliştirme ortamı ayarları
  dev: {
    host: 'localhost',
    port: 3000
  }
});