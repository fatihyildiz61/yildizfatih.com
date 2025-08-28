#!/usr/bin/env node

const https = require('https');
const http = require('http');
const { exec } = require('child_process');

const domain = 'yildizfatih.com'; // Domain adınızı buraya yazın

console.log(`🔍 SSL ve Site Testi: ${domain}\n`);

// SSL sertifikası testi
function testSSL() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: domain,
      port: 443,
      method: 'GET',
      path: '/',
      timeout: 10000,
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      console.log(`✅ HTTPS Bağlantı: ${res.statusCode}`);
      console.log(`🔒 SSL Sürüm: ${res.socket.getTLSVersion()}`);
      console.log(`🔐 Cipher: ${res.socket.getCipher()}`);
      resolve();
    });

    req.on('error', (err) => {
      console.log(`❌ HTTPS Hatası: ${err.message}`);
      reject(err);
    });

    req.on('timeout', () => {
      console.log('⏰ HTTPS Timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

// HTTP testi
function testHTTP() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: domain,
      port: 80,
      method: 'GET',
      path: '/',
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      console.log(`✅ HTTP Bağlantı: ${res.statusCode}`);
      console.log(`🔄 Yönlendirme: ${res.headers.location || 'Yok'}`);
      resolve();
    });

    req.on('error', (err) => {
      console.log(`❌ HTTP Hatası: ${err.message}`);
      reject(err);
    });

    req.on('timeout', () => {
      console.log('⏰ HTTP Timeout');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

// DNS testi
function testDNS() {
  return new Promise((resolve) => {
    exec(`nslookup ${domain}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ DNS Hatası: ${error.message}`);
      } else {
        console.log(`✅ DNS Çözümleme:`);
        console.log(stdout);
      }
      resolve();
    });
  });
}

// Ping testi
function testPing() {
  return new Promise((resolve) => {
    exec(`ping -c 3 ${domain}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ Ping Hatası: ${error.message}`);
      } else {
        console.log(`✅ Ping Testi:`);
        console.log(stdout);
      }
      resolve();
    });
  });
}

// Ana test fonksiyonu
async function runTests() {
  try {
    console.log('🌐 DNS Testi...');
    await testDNS();
    
    console.log('\n📡 Ping Testi...');
    await testPing();
    
    console.log('\n🔒 SSL Testi...');
    await testSSL();
    
    console.log('\n🌍 HTTP Testi...');
    await testHTTP();
    
    console.log('\n✅ Tüm testler tamamlandı!');
    
  } catch (error) {
    console.log(`\n❌ Test hatası: ${error.message}`);
  }
}

// Testleri çalıştır
runTests();
