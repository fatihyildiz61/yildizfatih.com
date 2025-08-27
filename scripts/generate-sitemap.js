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

// Sitemap XML oluştur
function generateSitemap() {
  const projects = getProjects();
  const baseUrl = 'https://yildizfatih.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Ana Sayfa -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Projeler Ana Sayfası -->
  <url>
    <loc>${baseUrl}/projects</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Proje Sayfaları -->
${projects.map(project => `  <url>
    <loc>${baseUrl}/work/${project}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
  
  <!-- Yasal Sayfalar -->
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  // Sitemap'i yaz
  const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Sitemap güncellendi: ${projects.length} proje bulundu`);
  console.log(`�� Sitemap konumu: ${sitemapPath}`);
}

// Script çalıştır
generateSitemap();
