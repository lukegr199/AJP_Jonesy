import { readdir, writeFile } from 'fs/promises'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const galleryDir = join(__dirname, '../public/gallery')
const outputPath = join(galleryDir, 'gallery.json')
const mediaExtensions = [
    // Video formats - be sure to update useMediaGallery.ts ext check when you tweak these
    '.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv',
  
    // Image formats
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff', '.ico'
  ];

try {
  const allFiles = await readdir(galleryDir)
  const mediaFiles = allFiles.filter(file =>
    mediaExtensions.includes(extname(file).toLowerCase())
  )

  await writeFile(outputPath, JSON.stringify(mediaFiles, null, 2))
  console.log(`✅ Generated gallery.json with ${mediaFiles.length} media file entries found.`)
} catch (err) {
  console.error('🚨 Failed to generate media list:', err)
}