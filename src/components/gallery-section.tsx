import { useState } from "react";
import { useMediaGallery } from '@/components/hooks/useMediaGallery'
import type { DynamicGallery } from '@/components/hooks/useMediaGallery'
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function GallerySection() {
  const galleryItems = useMediaGallery();
  const [selectedItem, setSelectedItem] = useState<DynamicGallery | null>(null);

  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Artist Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative w-full h-full">
                <img
                  src={
                    item.thumbnail ||
                    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80"
                  }
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {item?.type === "video" && (
                    <div className="bg-black/50 rounded-full p-4">
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
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-lg font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <DialogContent className="max-w-4xl max-h-[95vh] bg-black border-gray-800 text-white p-0 flex flex-col">
          <div className="flex-grow flex items-center justify-center overflow-hidden">
            <div className="max-h-full max-w-full">
              {selectedItem?.type === "video" ? (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  muted
                  className="h-full w-auto max-h-[80vh] m-auto object-contain"
                />
              ) : (
                <img
                  src={selectedItem?.url}
                  alt={selectedItem?.title}
                  className="h-full w-auto max-h-[80vh] m-auto object-contain"
                />
              )}
            </div>
          </div>
          <div className="p-4 pt-0">
            <h3 className="text-xl font-medium">{selectedItem?.title}</h3>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
