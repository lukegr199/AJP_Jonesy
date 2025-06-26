import { useState, useEffect } from 'react'

export interface DynamicGallery {
  id: string
  title: string
  type: "image" | "video"
  thumbnail?: string;
  url: string;
}

export function useMediaGallery() {
  const [gallery, setGallery] = useState<DynamicGallery[]>([])

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/gallery/gallery.json')
        if (!res.ok) throw new Error('Failed to load gallery manifest.')
        const filenames: string[] = await res.json()

        const loaded: DynamicGallery[] = await Promise.all(
          filenames.map(async (name, index) => {
            const mediaUrl = `/gallery/${name}`

            try {
              const response = await fetch(mediaUrl)
              if (!response.ok) throw new Error(`Failed to fetch ${name}`)
              
                const type = getMediaType(mediaUrl);
                return {
                  id: String(index),
                  title: name || 'AJP Media',
                  type,
                  thumbnail: type === "video" ? await generateThumbnail(mediaUrl) : mediaUrl,
                  url: mediaUrl
                }
            } catch (err) {
              console.warn(`⚠️ Could not parse media for "${name}":`, err)
              return {
                id: String(index),
                title: 'AJP Media',
                type: getMediaType(mediaUrl) || 'image',
                thumbnail: mediaUrl || undefined,
                url: mediaUrl
              }
            }
          })
        )

        setGallery(loaded)
      } catch (err) {
        console.error('🚨 Failed to load gallery list:', err)
      }
    }

    fetchGallery()
  }, [])

  return gallery
}


const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
function getMediaType(url: string): "video" | "image" {
  const lower = url.toLowerCase();
  return videoExtensions.some((ext) => lower.endsWith(ext)) ? "video" : "image";
}

async function generateThumbnail(videoUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.crossOrigin = "anonymous"; // only if needed
      video.preload = "metadata";
      video.muted = true;
  
      video.addEventListener("loadeddata", () => {
        video.currentTime = 0.5;
      });
  
      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/png");
          resolve(dataUrl);
        } else {
          reject("Canvas rendering failed");
        }
      });
  
      video.addEventListener("error", () => reject("Video failed to load"));
    });
  }
  