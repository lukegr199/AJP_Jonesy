import { useState, useEffect } from 'react'
import { parseBlob } from 'music-metadata'

export interface DynamicTrack {
  id: string
  title: string
  artists: string[]
  coverArt: string
  audioUrl: string
}

export function useMusicTracks() {
  const [tracks, setTracks] = useState<DynamicTrack[]>([])

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/tracks/tracks.json')
        if (!res.ok) throw new Error('Failed to load track manifest.')
        const filenames: string[] = await res.json()

        const loaded: DynamicTrack[] = await Promise.all(
          filenames.map(async (name, index) => {
            const audioUrl = `/tracks/${name}`

            try {
              const response = await fetch(audioUrl)
              if (!response.ok) throw new Error(`Failed to fetch ${name}`)
              const blob = await response.blob()
              const metadata = await parseBlob(blob)

              const picture = metadata.common.picture?.[0]
              const coverArt = picture
                ? URL.createObjectURL(new Blob([picture.data]))
                : '/music-fallback.svg'

              const artists = Array.isArray(metadata.common.artists)
                ? metadata.common.artists
                : metadata.common.artist
                ? [metadata.common.artist]
                : ['Unknown']

              return {
                id: String(index),
                title: metadata.common.title || name,
                artists,
                coverArt,
                audioUrl,
              }
            } catch (err) {
              console.warn(`⚠️ Could not parse metadata for "${name}":`, err)
              return {
                id: String(index),
                title: name,
                artists: ['Unknown'],
                coverArt: '/music-fallback.svg',
                audioUrl,
              }
            }
          })
        )

        setTracks(loaded)
      } catch (err) {
        console.error('🚨 Failed to load track list:', err)
      }
    }

    fetchTracks()
  }, [])

  return tracks
}
