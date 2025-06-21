import { readdir, writeFile } from 'fs/promises'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const tracksDir = join(__dirname, '../public/tracks')
const outputPath = join(tracksDir, 'tracks.json')
const audioExtensions = [
  '.mp3', '.mp2', '.mp4', '.m4a', '.m4v', '.aac',
  '.wav', '.bwf', '.aiff', '.aif', '.aifc',
  '.flac', '.ogg', '.oga', '.opus', '.spx',
  '.wma', '.wv', '.ape', '.dsf', '.dff',
  '.mka', '.mkv', '.webm', '.mpc', '.asf' ]

try {
  const allFiles = await readdir(tracksDir)
  const audioFiles = allFiles.filter(file =>
    audioExtensions.includes(extname(file).toLowerCase())
  )

  await writeFile(outputPath, JSON.stringify(audioFiles, null, 2))
  console.log(`✅ Generated tracks.json with ${audioFiles.length} entries.`)
} catch (err) {
  console.error('🚨 Failed to generate track list:', err)
}