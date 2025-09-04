#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 SEO Kontrol Raporu\n');

// Kontrol edilecek dosyalar
const filesToCheck = [
  'dist/robots.txt',
  'dist/sitemap.xml',
  'dist/index.html'
];

// Test dosyaları (bunlar olmamalı)
const testFiles = [
  'dist/test-form.html',
  'dist/test-php.php',
  'dist/ultra-simple.php',
  'dist/simple-test.php',
  'dist/contact-form-handler/index.html',
  'dist/.DS_Store'
];

// Kontrol fonksiyonları
function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function checkRobotsTxt() {
  console.log('📋 Robots.txt Kontrolü:');
  const robotsPath = 'dist/robots.txt';
  
  if (!checkFileExists(robotsPath)) {
    console.log('❌ robots.txt dosyası bulunamadı!');
    return false;
  }
  
  const content = fs.readFileSync(robotsPath, 'utf8');
  
  // Test dosyalarının disallow edilip edilmediğini kontrol et
  const testFilesDisallowed = testFiles.some(file => {
    const fileName = path.basename(file);
    return content.includes(`Disallow: /${fileName}`) || 
           content.includes(`Disallow: ${fileName}`);
  });
  
  if (testFilesDisallowed) {
    console.log('✅ Test dosyaları robots.txt\'de disallow edilmiş');
  } else {
    console.log('⚠️  Test dosyaları robots.txt\'de disallow edilmemiş');
  }
  
  if (content.includes('Sitemap:')) {
    console.log('✅ Sitemap robots.txt\'de tanımlanmış');
  } else {
    console.log('❌ Sitemap robots.txt\'de tanımlanmamış');
  }
  
  return true;
}

function checkSitemap() {
  console.log('\n🗺️  Sitemap Kontrolü:');
  const sitemapPath = 'dist/sitemap.xml';
  
  if (!checkFileExists(sitemapPath)) {
    console.log('❌ sitemap.xml dosyası bulunamadı!');
    return false;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  
  // Test dosyalarının sitemap'te olup olmadığını kontrol et
  const testFilesInSitemap = testFiles.some(file => {
    const fileName = path.basename(file);
    return content.includes(fileName);
  });
  
  if (testFilesInSitemap) {
    console.log('❌ Test dosyaları sitemap\'te bulunuyor!');
    return false;
  } else {
    console.log('✅ Test dosyaları sitemap\'te yok');
  }
  
  // URL sayısını say
  const urlCount = (content.match(/<url>/g) || []).length;
  console.log(`✅ Toplam ${urlCount} URL sitemap\'te listelenmiş`);
  
  return true;
}

function checkTestFiles() {
  console.log('\n🧪 Test Dosyaları Kontrolü:');
  let allClean = true;
  
  testFiles.forEach(file => {
    if (checkFileExists(file)) {
      console.log(`❌ ${file} hala mevcut!`);
      allClean = false;
    } else {
      console.log(`✅ ${file} temizlenmiş`);
    }
  });
  
  return allClean;
}

function checkMainPage() {
  console.log('\n🏠 Ana Sayfa SEO Kontrolü:');
  const indexPath = 'dist/index.html';
  
  if (!checkFileExists(indexPath)) {
    console.log('❌ index.html dosyası bulunamadı!');
    return false;
  }
  
  const content = fs.readFileSync(indexPath, 'utf8');
  
  // Meta tag kontrolü
  const checks = [
    { name: 'Title tag', pattern: /<title>/, found: false },
    { name: 'Meta description', pattern: /<meta[^>]*name="description"/, found: false },
    { name: 'Meta keywords', pattern: /<meta[^>]*name="keywords"/, found: false },
    { name: 'Canonical URL', pattern: /<link[^>]*rel="canonical"/, found: false },
    { name: 'Open Graph tags', pattern: /<meta[^>]*property="og:/, found: false },
    { name: 'Twitter Card tags', pattern: /<meta[^>]*name="twitter:/, found: false },
    { name: 'Structured data', pattern: /<script[^>]*type="application\/ld\+json"/, found: false }
  ];
  
  checks.forEach(check => {
    check.found = check.pattern.test(content);
    console.log(`${check.found ? '✅' : '❌'} ${check.name}`);
  });
  
  return checks.every(check => check.found);
}

// Ana kontrol fonksiyonu
function runSEOCheck() {
  let allPassed = true;
  
  allPassed = checkRobotsTxt() && allPassed;
  allPassed = checkSitemap() && allPassed;
  allPassed = checkTestFiles() && allPassed;
  allPassed = checkMainPage() && allPassed;
  
  console.log('\n📊 Özet:');
  if (allPassed) {
    console.log('✅ Tüm SEO kontrolleri başarılı!');
    console.log('🎉 Siteniz Google Search Console için hazır!');
  } else {
    console.log('❌ Bazı SEO sorunları tespit edildi.');
    console.log('🔧 Yukarıdaki sorunları düzeltin ve tekrar kontrol edin.');
  }
  
  return allPassed;
}

// Scripti çalıştır
if (require.main === module) {
  runSEOCheck();
}

module.exports = { runSEOCheck };

