import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  tagline?: string;
  imageUrl?: string;
}

export function HeroSection({
  title = "AJP JONESY",
  tagline = "UK Rapper | Producer | Artist",
  imageUrl = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
}: HeroSectionProps) {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10"></div>
        <img
          src={imageUrl}
          alt="AJP Jonesy"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col justify-center items-center h-screen text-center">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">{tagline}</p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
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
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
}
