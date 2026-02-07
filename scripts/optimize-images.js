const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  imageDir: path.join(__dirname, '../assets/img'),
  outputDir: path.join(__dirname, '../assets/img-optimized'),
  quality: { jpeg: 80, webp: 80, png: 80 },
  maxWidth: 1920,
  maxHeight: 1080,
  formats: ['webp', 'jpeg']
};

let stats = { processed: 0, errors: 0, originalSize: 0, optimizedSize: 0 };

// Rekurziv fajlkereses
function getAllImageFiles(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Kep optimalizalas
async function optimizeImage(inputPath) {
  try {
    const relativePath = path.relative(CONFIG.imageDir, inputPath);
    const outputDir = path.dirname(path.join(CONFIG.outputDir, relativePath));
    const ext = path.extname(inputPath).toLowerCase();
    const basename = path.basename(inputPath, ext);
    const originalSize = fs.statSync(inputPath).size;

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const metadata = await sharp(inputPath).metadata();
    const resizeOptions = (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight)
      ? { width: CONFIG.maxWidth, height: CONFIG.maxHeight, fit: 'inside', withoutEnlargement: true }
      : null;

    let totalOptimizedSize = 0;

    // WebP
    if (CONFIG.formats.includes('webp')) {
      let pipeline = sharp(inputPath);
      if (resizeOptions) pipeline = pipeline.resize(resizeOptions);
      const webpPath = path.join(outputDir, `${basename}.webp`);
      await pipeline.webp({ quality: CONFIG.quality.webp }).toFile(webpPath);
      totalOptimizedSize += fs.statSync(webpPath).size;
    }

    // Optimalizalt JPG/PNG
    if (CONFIG.formats.includes('jpeg') || CONFIG.formats.includes('png')) {
      let pipeline = sharp(inputPath);
      if (resizeOptions) pipeline = pipeline.resize(resizeOptions);
      const optimizedPath = path.join(outputDir, path.basename(inputPath));
      if (ext === '.png') {
        await pipeline.png({ quality: CONFIG.quality.png, compressionLevel: 9 }).toFile(optimizedPath);
      } else {
        await pipeline.jpeg({ quality: CONFIG.quality.jpeg, progressive: true }).toFile(optimizedPath);
      }
      totalOptimizedSize += fs.statSync(optimizedPath).size;
    }

    console.log(`${relativePath} - ${(originalSize / 1024).toFixed(0)}KB -> ${(totalOptimizedSize / 1024).toFixed(0)}KB`);
    stats.processed++;
    stats.originalSize += originalSize;
    stats.optimizedSize += totalOptimizedSize;

  } catch (error) {
    console.error(`HIBA: ${inputPath} - ${error.message}`);
    stats.errors++;
  }
}

async function main() {
  if (!fs.existsSync(CONFIG.outputDir)) fs.mkdirSync(CONFIG.outputDir, { recursive: true });

  const imageFiles = getAllImageFiles(CONFIG.imageDir);
  console.log(`${imageFiles.length} kep feldolgozasa...\n`);

  for (const file of imageFiles) {
    await optimizeImage(file);
  }

  const savings = ((1 - (stats.optimizedSize / stats.originalSize)) * 100).toFixed(1);
  console.log(`\nKesz: ${stats.processed} kep, ${stats.errors} hiba`);
  console.log(`${(stats.originalSize / 1024 / 1024).toFixed(1)}MB -> ${(stats.optimizedSize / 1024 / 1024).toFixed(1)}MB (${savings}% csokkenes)`);
}

main().catch(console.error);
