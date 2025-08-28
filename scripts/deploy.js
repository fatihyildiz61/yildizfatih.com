import ftp from 'basic-ftp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module için __dirname ve __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FTP Ayarları - .env dosyasından okuyacak
import dotenv from 'dotenv';
dotenv.config();

const config = {
  host: 'yildizfatih.com',
  user: 'yildizfatih',
  password: 'YOUR_FTP_PASSWORD', // FTP şifrenizi buraya girin
  secure: true
};

const localDir = './dist/';
const remoteDir = './public_html/';

async function deploy() {
  const client = new ftp.Client();
  
  try {
    console.log('🔄 FTP bağlantısı kuruluyor...');
    await client.access(config);
    
    console.log('📁 Uzak dizine geçiliyor...');
    await client.ensureDir(remoteDir);
    
    console.log('🚀 Dosyalar yükleniyor...');
    
    // Sadece HTML dosyalarını yükle
    const htmlFiles = await getHtmlFiles(localDir);
    
    for (const file of htmlFiles) {
      const localPath = path.join(localDir, file);
      const remotePath = path.join(remoteDir, file);
      
      console.log(`📤 ${file} yükleniyor...`);
      await client.uploadFrom(localPath, remotePath);
    }
    
    console.log('✅ Deploy tamamlandı!');
    
  } catch (err) {
    console.error('❌ Hata:', err);
  }
  
  client.close();
}

async function getHtmlFiles(dir) {
  const files = [];
  
  function scan(currentDir, relativePath = '') {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const relativeItemPath = path.join(relativePath, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        scan(fullPath, relativeItemPath);
      } else if (item.endsWith('.html')) {
        files.push(relativeItemPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

deploy();
