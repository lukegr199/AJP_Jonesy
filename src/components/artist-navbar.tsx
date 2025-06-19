import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";

interface NavItem {
  label: string;
  href: string;
}

interface ArtistNavbarProps {
  items?: NavItem[];
  logoText?: string;
}

const defaultNavItems: NavItem[] = [{ label: "Contact", href: "#contact" }];

export function ArtistNavbar({
  items = defaultNavItems,
  logoText = "AJP JONESY",
}: ArtistNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-white font-bold text-xl">
            {logoText}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <SocialLinks variant="navbar" className="mr-4" />
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-indigo-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a href="#music">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 transform hover:scale-105">
                Stream Music
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="#" className="text-white font-bold text-xl">
              {logoText}
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center space-y-8">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white text-2xl hover:text-indigo-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white mt-4"
              onClick={() => setIsOpen(false)}
            >
              Stream Music
            </Button>
            <div className="mt-8">
              <SocialLinks variant="footer" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
