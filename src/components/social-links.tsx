import { Instagram, Twitter, Youtube, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
  handle: string;
}

interface SocialLinksProps {
  className?: string;
  variant?: "default" | "footer" | "navbar";
}

export function SocialLinks({
  className,
  variant = "default",
}: SocialLinksProps) {
  const socialLinks: SocialLink[] = [
    {
      platform: "Instagram",
      url: "https://instagram.com/lvbeltbuckle",
      icon: <Instagram className="h-5 w-5" />,
      handle: "@lvbeltbuckle",
    },
    {
      platform: "X",
      url: "https://x.com/ajpjonesy",
      icon: <Twitter className="h-5 w-5" />,
      handle: "@ajpjonesy",
    },
    {
      platform: "YouTube",
      url: "https://youtube.com/@ajpjonesy",
      icon: <Youtube className="h-5 w-5" />,
      handle: "@ajpjonesy",
    },
    {
      platform: "Spotify",
      url: "https://open.spotify.com/artist/5HyKIVJmQECHmdiGsjcn59?si=DO4YGdsFTpqLKwvUWurqtg",
      icon: <Music className="h-5 w-5" />,
      handle: "AJP Jonesy",
    },
  ];

  if (variant === "footer" || variant === "navbar") {
    return (
      <div className={cn("flex space-x-4", className)}>
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              variant === "footer"
                ? "text-gray-400 hover:text-white"
                : "text-white hover:text-indigo-400",
              "transition-colors",
            )}
            aria-label={`Follow on ${link.platform}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="w-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white transition-all duration-300 transform hover:scale-105"
          >
            {link.icon}
          </Button>
        </a>
      ))}
    </div>
  );
}
