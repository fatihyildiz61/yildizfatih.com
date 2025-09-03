import fs from 'fs';
import path from 'path';

// Proje dizinini tara ve tüm .mdx dosyalarını bul
function getProjects() {
  const projectsDir = path.join(process.cwd(), 'src/content/projects');
  const files = fs.readdirSync(projectsDir);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''));
}

// Blog yazılarını bul
function getBlogPosts() {
  const blogPosts = [
    '2025-grafik-tasarim-trendleri',
    'logo-tasarim-fiyatlari-2025',
    'marka-kimligi-neden-onemli',
    'sosyal-medya-tasarim-ipuclari',
    'ui-ux-tasarim-prensipleri',
    'grafik-tasarimda-renk-psikolojisi'
  ];
  
  return blogPosts;
}

// Sitemap XML oluştur
function generateSitemap() {
  const projects = getProjects();
  const blogPosts = getBlogPosts();
  const baseUrl = 'https://www.yildizfatih.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Ana Sayfa -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
           <!-- Servis Sayfaları -->
         <url>
           <loc>${baseUrl}/web-tasarim/</loc>
           <lastmod>${currentDate}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.9</priority>
         </url>
         
         <url>
           <loc>${baseUrl}/logo-tasarim/</loc>
           <lastmod>${currentDate}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.9</priority>
         </url>
         
         <url>
           <loc>${baseUrl}/marka-kimligi/</loc>
           <lastmod>${currentDate}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.9</priority>
         </url>
         
         <url>
           <loc>${baseUrl}/sosyal-medya-tasarim/</loc>
           <lastmod>${currentDate}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.9</priority>
         </url>
         
         <url>
           <loc>${baseUrl}/baski-tasarim/</loc>
           <lastmod>${currentDate}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.9</priority>
         </url>
         
         <url>
           <loc>${baseUrl}/hizmetlerim/</loc>
           <lastmod>${currentDate}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.9</priority>
         </url>
  
  <!-- Blog Ana Sayfası -->
  <url>
    <loc>${baseUrl}/blog/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Yazıları -->
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
  
  <!-- Projeler Ana Sayfası -->
  <url>
    <loc>${baseUrl}/projects/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Proje Sayfaları -->
${projects.map(project => `  <url>
    <loc>${baseUrl}/work/${project}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
  
  <!-- Yasal Sayfalar -->
  <url>
    <loc>${baseUrl}/privacy/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/terms/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  // Sitemap'i yaz
  const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Sitemap güncellendi: ${projects.length} proje, ${blogPosts.length} blog yazısı bulundu`);
  console.log(` Sitemap konumu: ${sitemapPath}`);
           console.log(`🔗 Toplam URL sayısı: ${6 + blogPosts.length + projects.length + 3} (ana sayfa + servisler + blog + projeler + yasal)`);
}

// Script çalıştır
generateSitemap();
