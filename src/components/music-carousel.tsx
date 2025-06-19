import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  coverArt: string;
  audioUrl?: string;
}

interface MusicCarouselProps {
  className?: string;
}

const musicTracks: MusicTrack[] = [
  {
    id: "1",
    title: "Whatever You Need",
    artist: "AJP Jonesy",
    coverArt:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
  },
  {
    id: "2",
    title: "German",
    artist: "AJP Jonesy",
    coverArt:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80",
  },
  {
    id: "3",
    title: "Head in a Hood",
    artist: "AJP Jonesy",
    coverArt:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  },
  {
    id: "4",
    title: "Money in the Cup",
    artist: "AJP Jonesy",
    coverArt:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
  },
  {
    id: "5",
    title: "Hand on Havana",
    artist: "AJP Jonesy",
    coverArt:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
  },
  {
    id: "6",
    title: "DM x Jonesy Freestyle",
    artist: "AJP Jonesy",
    coverArt:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80",
  },
  {
    id: "7",
    title: "Boned",
    artist: "AJP Jonesy",
    coverArt:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
  },
];

export function MusicCarousel({ className }: MusicCarouselProps) {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const togglePlay = (trackId: string) => {
    setActiveTrack(activeTrack === trackId ? null : trackId);
  };

  const handleScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 100);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Left scroll button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-lg transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hide scrollbar for Chrome, Safari and Opera */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {musicTracks.map((track) => (
          <div key={track.id} className="flex-none w-64 snap-start">
            <div className="relative group bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="aspect-square overflow-hidden">
                <img
                  src={track.coverArt}
                  alt={track.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 transform hover:scale-110"
                  onClick={() => togglePlay(track.id)}
                >
                  {activeTrack === track.id ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8" />
                  )}
                </Button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-white truncate">
                  {track.title}
                </h3>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-l-lg transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
