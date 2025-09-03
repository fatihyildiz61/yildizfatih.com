import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test edilecek URL'ler
const testUrls = [
  'https://www.yildizfatih.com/',
  'https://www.yildizfatih.com/logo-tasarim',
  'https://www.yildizfatih.com/marka-kimligi',
  'https://www.yildizfatih.com/web-tasarim',
  'https://www.yildizfatih.com/sosyal-medya-tasarim',
  'https://www.yildizfatih.com/baski-tasarim',
  'https://www.yildizfatih.com/blog',
  'https://www.yildizfatih.com/projects'
];

// SEO Test Fonksiyonları
async function testPageSEO(url) {
  console.log(`\n🔍 Testing: ${url}`);
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    const tests = {
      title: testTitle(html),
      description: testDescription(html),
      h1: testH1(html),
      images: testImages(html),
      links: testLinks(html),
      structuredData: testStructuredData(html),
      performance: await testPerformance(url),
      mobile: testMobileFriendly(html),
      ssl: testSSL(url),
      robots: testRobots(url)
    };
    
    return {
      url,
      status: response.status,
      tests
    };
    
  } catch (error) {
    console.error(`❌ Error testing ${url}:`, error.message);
    return {
      url,
      status: 'ERROR',
      error: error.message
    };
  }
}

function testTitle(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch) return { passed: false, message: 'Title tag not found' };
  
  const title = titleMatch[1].trim();
  const length = title.length;
  
  return {
    passed: length >= 30 && length <= 60,
    title,
    length,
    message: length < 30 ? 'Title too short' : length > 60 ? 'Title too long' : 'Title length OK'
  };
}

function testDescription(html) {
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (!descMatch) return { passed: false, message: 'Meta description not found' };
  
  const description = descMatch[1].trim();
  const length = description.length;
  
  return {
    passed: length >= 120 && length <= 160,
    description,
    length,
    message: length < 120 ? 'Description too short' : length > 160 ? 'Description too long' : 'Description length OK'
  };
}

function testH1(html) {
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  if (!h1Matches) return { passed: false, message: 'No H1 tags found' };
  
  const h1Count = h1Matches.length;
  
  return {
    passed: h1Count === 1,
    count: h1Count,
    message: h1Count === 0 ? 'No H1 tags' : h1Count > 1 ? 'Multiple H1 tags' : 'Single H1 tag OK'
  };
}

function testImages(html) {
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  const imagesWithoutAlt = imgMatches.filter(img => !img.includes('alt='));
  
  return {
    passed: imagesWithoutAlt.length === 0,
    total: imgMatches.length,
    withoutAlt: imagesWithoutAlt.length,
    message: imagesWithoutAlt.length > 0 ? `${imagesWithoutAlt.length} images without alt text` : 'All images have alt text'
  };
}

function testLinks(html) {
  const linkMatches = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi) || [];
  const internalLinks = linkMatches.filter(link => link.includes('yildizfatih.com'));
  const externalLinks = linkMatches.length - internalLinks.length;
  
  return {
    passed: linkMatches.length > 0,
    total: linkMatches.length,
    internal: internalLinks.length,
    external: externalLinks,
    message: `Found ${linkMatches.length} links (${internalLinks.length} internal, ${externalLinks} external)`
  };
}

function testStructuredData(html) {
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi) || [];
  
  return {
    passed: jsonLdMatches.length > 0,
    count: jsonLdMatches.length,
    message: jsonLdMatches.length > 0 ? `Found ${jsonLdMatches.length} structured data blocks` : 'No structured data found'
  };
}

async function testPerformance(url) {
  try {
    const startTime = Date.now();
    const response = await fetch(url);
    const loadTime = Date.now() - startTime;
    
    return {
      passed: loadTime < 3000,
      loadTime: `${loadTime}ms`,
      message: loadTime < 1000 ? 'Excellent' : loadTime < 3000 ? 'Good' : 'Slow'
    };
  } catch (error) {
    return {
      passed: false,
      loadTime: 'ERROR',
      message: 'Could not test performance'
    };
  }
}

function testMobileFriendly(html) {
  const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);
  const responsiveCSS = html.includes('@media') || html.includes('responsive');
  
  return {
    passed: viewportMatch && responsiveCSS,
    hasViewport: !!viewportMatch,
    hasResponsiveCSS: responsiveCSS,
    message: viewportMatch && responsiveCSS ? 'Mobile friendly' : 'Mobile optimization needed'
  };
}

function testSSL(url) {
  return {
    passed: url.startsWith('https://'),
    protocol: url.startsWith('https://') ? 'HTTPS' : 'HTTP',
    message: url.startsWith('https://') ? 'SSL enabled' : 'SSL required'
  };
}

async function testRobots(url) {
  try {
    const robotsUrl = url.replace(/\/$/, '') + '/robots.txt';
    const response = await fetch(robotsUrl);
    const robotsContent = await response.text();
    
    return {
      passed: response.status === 200,
      status: response.status,
      hasSitemap: robotsContent.includes('sitemap'),
      message: response.status === 200 ? 'Robots.txt accessible' : 'Robots.txt not accessible'
    };
  } catch (error) {
    return {
      passed: false,
      status: 'ERROR',
      message: 'Could not test robots.txt'
    };
  }
}

// Ana Test Fonksiyonu
async function runSEOTests() {
  console.log('🚀 Starting Google Search Console SEO Tests...\n');
  
  const results = [];
  
  for (const url of testUrls) {
    const result = await testPageSEO(url);
    results.push(result);
    
    // Her test sonucunu göster
    console.log(`📊 Results for ${url}:`);
    console.log(`   Status: ${result.status}`);
    
    if (result.tests) {
      Object.entries(result.tests).forEach(([testName, testResult]) => {
        const status = testResult.passed ? '✅' : '❌';
        console.log(`   ${status} ${testName}: ${testResult.message}`);
      });
    }
  }
  
  // Özet rapor oluştur
  const summary = createSummary(results);
  console.log('\n📈 SEO Test Summary:');
  console.log(summary);
  
  // Sonuçları dosyaya kaydet
  const reportPath = path.join(__dirname, '../seo-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  return results;
}

function createSummary(results) {
  const totalTests = results.length;
  const successfulTests = results.filter(r => r.status === 200).length;
  const failedTests = totalTests - successfulTests;
  
  const allTests = results.flatMap(r => r.tests ? Object.values(r.tests) : []);
  const passedTests = allTests.filter(t => t.passed).length;
  const totalIndividualTests = allTests.length;
  
  return `
   Total URLs Tested: ${totalTests}
   Successful Responses: ${successfulTests}
   Failed Responses: ${failedTests}
   Individual Tests Passed: ${passedTests}/${totalIndividualTests}
   Success Rate: ${((passedTests / totalIndividualTests) * 100).toFixed(1)}%
  `;
}

// Script çalıştır
if (import.meta.url === `file://${process.argv[1]}`) {
  runSEOTests().catch(console.error);
}

export { runSEOTests, testPageSEO };
