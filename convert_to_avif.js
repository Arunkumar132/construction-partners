const sharp = require('sharp');
const inputPath = 'C:/Users/65820/.gemini/antigravity/brain/4b76e851-5343-461e-8d4c-b506e168f089/indian_construction_site_avif_1795069290291.jpg';
const outputPath = 'C:/Users/65820/Downloads/construction-partners/construction-partners/src/assets/indian-construction-site.avif';
sharp(inputPath)
  .avif({ quality: 80 })
  .toFile(outputPath)
  .then(info => console.log('Conversion successful:', info))
  .catch(err => console.error('Conversion error:', err));
