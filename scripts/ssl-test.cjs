#!/usr/bin/env node

const https = require('https');
const http = require('http');

const domains = [
  'yildizfatih.com',
  'www.yildizfatih.com'
];

function testSSL(domain) {
  return new Promise((resolve) => {
    const options = {
      hostname: domain,
      port: 443,
      method: 'GET',
      path: '/',
      timeout: 10000,
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      console.log(`✅ ${domain} - HTTPS Status: ${res.statusCode}`);
      console.log(`   Headers:`, res.headers);
      resolve({ domain, https: true, status: res.statusCode, headers: res.headers });
    });

    req.on('error', (err) => {
      console.log(`❌ ${domain} - HTTPS Error: ${err.message}`);
      resolve({ domain, https: false, error: err.message });
    });

    req.on('timeout', () => {
      console.log(`⏰ ${domain} - HTTPS Timeout`);
      req.destroy();
      resolve({ domain, https: false, error: 'timeout' });
    });

    req.end();
  });
}

function testHTTP(domain) {
  return new Promise((resolve) => {
    const options = {
      hostname: domain,
      port: 80,
      method: 'GET',
      path: '/',
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      console.log(`✅ ${domain} - HTTP Status: ${res.statusCode}`);
      console.log(`   Headers:`, res.headers);
      resolve({ domain, http: true, status: res.statusCode, headers: res.headers });
    });

    req.on('error', (err) => {
      console.log(`❌ ${domain} - HTTP Error: ${err.message}`);
      resolve({ domain, http: false, error: err.message });
    });

    req.on('timeout', () => {
      console.log(`⏰ ${domain} - HTTP Timeout`);
      req.destroy();
      resolve({ domain, http: false, error: 'timeout' });
    });

    req.end();
  });
}

async function runTests() {
  console.log('🔍 SSL ve HTTP Testleri Başlıyor...\n');

  for (const domain of domains) {
    console.log(`\n📋 ${domain} test ediliyor...`);
    
    const httpsResult = await testSSL(domain);
    const httpResult = await testHTTP(domain);
    
    // Yönlendirme kontrolü
    if (httpResult.http && httpResult.status === 301) {
      const location = httpResult.headers.location;
      if (location && location.startsWith('https://')) {
        console.log(`   ✅ HTTP'den HTTPS'e yönlendirme çalışıyor: ${location}`);
      } else {
        console.log(`   ⚠️  Yönlendirme var ama HTTPS değil: ${location}`);
      }
    }
  }

  console.log('\n🎯 Öneriler:');
  console.log('1. Hosting sağlayıcınızda SSL sertifikasının aktif olduğundan emin olun');
  console.log('2. .htaccess dosyasının sunucuya yüklendiğinden emin olun');
  console.log('3. Cloudflare kullanıyorsanız SSL/TLS ayarlarını kontrol edin');
  console.log('4. Mixed content uyarıları için tüm kaynakların HTTPS olduğundan emin olun');
}

runTests().catch(console.error);
