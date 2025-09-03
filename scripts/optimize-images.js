import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const imagesDir = path.join(publicDir, 'images');

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

// Optimization settings
const optimizationSettings = {
  jpeg: {
    quality: 85,
    progressive: true,
    mozjpeg: true
  },
  png: {
    quality: 85,
    progressive: true
  },
  webp: {
    quality: 85,
    effort: 6
  },
  avif: {
    quality: 85,
    effort: 6
  }
};

// Recursively find all images in a directory
function findImages(dir) {
  const files = fs.readdirSync(dir);
  const images = [];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      images.push(...findImages(filePath));
    } else if (supportedFormats.includes(path.extname(file).toLowerCase())) {
      images.push(filePath);
    }
  }
  
  return images;
}

// Optimize a single image
async function optimizeImage(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    const dir = path.dirname(imagePath);
    const name = path.basename(imagePath, ext);
    
    // Skip if already optimized
    if (name.includes('-optimized')) {
      return;
    }
    
    const outputPath = path.join(dir, `${name}-optimized${ext}`);
    
    let sharpInstance = sharp(imagePath);
    
    // Apply format-specific optimizations
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        sharpInstance = sharpInstance.jpeg(optimizationSettings.jpeg);
        break;
      case '.png':
        sharpInstance = sharpInstance.png(optimizationSettings.png);
        break;
      case '.webp':
        sharpInstance = sharpInstance.webp(optimizationSettings.webp);
        break;
      case '.avif':
        sharpInstance = sharpInstance.avif(optimizationSettings.avif);
        break;
    }
    
    await sharpInstance.toFile(outputPath);
    
    // Compare file sizes
    const originalSize = fs.statSync(imagePath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(imagePath)}: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% savings)`);
    
    // Replace original with optimized version
    fs.unlinkSync(imagePath);
    fs.renameSync(outputPath, imagePath);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error.message);
  }
}

// Main optimization function
async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  if (!fs.existsSync(imagesDir)) {
    console.log('❌ Images directory not found');
    return;
  }
  
  const images = findImages(imagesDir);
  console.log(`📁 Found ${images.length} images to optimize`);
  
  let processed = 0;
  for (const image of images) {
    await optimizeImage(image);
    processed++;
    
    if (processed % 10 === 0) {
      console.log(`📊 Progress: ${processed}/${images.length}`);
    }
  }
  
  console.log('✅ Image optimization completed!');
}

// Run optimization
optimizeImages().catch(console.error);
