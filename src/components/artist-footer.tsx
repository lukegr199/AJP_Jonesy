import { SocialLinks } from "@/components/social-links";

export function ArtistFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">AJP JONESY</h3>
            <p className="text-gray-400 mb-4">UK Rapper | Producer | Artist</p>
            <SocialLinks variant="footer" className="mt-4" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#music"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Music
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Stream Music */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stream Music</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://open.spotify.com/artist/5HyKIVJmQECHmdiGsjcn59?si=DO4YGdsFTpqLKwvUWurqtg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Spotify
                </a>
              </li>
              <li>
                <a
                  href="https://music.apple.com/artist/ajpjonesy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Apple Music
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@ajpjonesy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  YouTube Music
                </a>
              </li>
              <li>
                <a
                  href="https://soundcloud.com/ajpproductions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  SoundCloud
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} AJP Jonesy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
