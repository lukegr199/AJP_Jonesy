import { useRef } from 'react';
import { ArtistNavbar } from "@/components/artist-navbar";
import { HeroSection } from "@/components/hero-section";
import { GallerySection } from "@/components/gallery-section";
import { MusicPlayer} from "@/components/music-player";
import type { MusicPlayerHandle } from '@/components/music-player'
import { MusicCarousel } from "@/components/music-carousel";
import { SocialLinks } from "@/components/social-links";
import { ContactForm } from "@/components/contact-form";
import { ArtistFooter } from "@/components/artist-footer";
import { Toaster } from "@/components/ui/toaster";
// import { Button } from "@/components/ui/button";

export default function ArtistHome() {
  const playerRef = useRef<MusicPlayerHandle>(null);
  return (
    <div className="bg-black text-white">
      <Toaster />
      <ArtistNavbar />

      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Music Section */}
      <section
        id="music"
        className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Music
          </h2>
          <div className="max-w-5xl mx-auto mb-12">
          <MusicCarousel onTrackSelect={(id) => playerRef.current?.playTrackById(id)} />
          </div>

          {/* <div className="flex justify-center"> // not sure what this was for tbh
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 transition-all duration-300 transform hover:scale-105"
            >
              Stream Music
            </Button>
          </div> */}
          {/* <audio ref={audioRef} style={{ display: 'none' }} /> */}
          <div className="max-w-3xl mx-auto mt-16">
            <MusicPlayer ref={playerRef}/>
          </div>
          

          {/* <iframe 
            className="mx-auto max-w-7xl mt-20"
            style={{ borderRadius: '12px'}}
            src="https://open.spotify.com/embed/artist/5HyKIVJmQECHmdiGsjcn59?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          /> */}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery">
        <GallerySection />
      </section>

      {/* Social Media Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Connect With Me
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Follow me on social media for the latest updates, behind-the-scenes
            content, and exclusive releases.
          </p>

          <div className="max-w-2xl mx-auto">
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12">
              For bookings, press inquiries, or just to say hello, fill out the
              form below.
            </p>

            <div className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ArtistFooter />
    </div>
  );
}
