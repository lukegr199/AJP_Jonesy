import { useState } from "react";
import { useMediaGallery } from '@/components/hooks/useMediaGallery'
import type { DynamicGallery } from '@/components/hooks/useMediaGallery'
import { Dialog, DialogContent } from "@/components/ui/dialog";

// interface GalleryItem {
//   id: string;
//   type: "image" | "video";
//   url: string;
//   thumbnail?: string;
//   title: string;
// }

// interface GallerySectionProps {
//   title?: string;
//   // items?: GalleryItem[];
// }

// const defaultGalleryItems: GalleryItem[] = [
//   {
//     id: "1",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg20v1rz6st5rkpct199yntreh7btrj1",
//     thumbnail:
//       "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80",
//     title: "Live Performance",
//   },
//   {
//     id: "2",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg2aq6spzjnk7gmvqnpbyc8svd7bttwp",
//     thumbnail:
//       "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
//     title: "Studio Session",
//   },
//   {
//     id: "3",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg293652wjtjfar6zx5vm991417btm88",
//     thumbnail:
//       "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80",
//     title: "Behind the Scenes",
//   },
//   {
//     id: "4",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg205zjkc9rhd9jvvvftgfytr97bta7a",
//     thumbnail:
//       "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
//     title: "Music Video Shoot",
//   },
//   {
//     id: "5",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg297d2pjka3j8ap78ferycatx7btzkg",
//     thumbnail:
//       "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
//     title: "Concert",
//   },
//   {
//     id: "6",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg29s8wkgagr8qwyy69gke1ke17bt2bs",
//     thumbnail:
//       "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
//     title: "Festival Performance",
//   },
//   {
//     id: "7",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg28v5xpcsvwgd8j0e8db2dyah7btx77",
//     thumbnail:
//       "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
//     title: "Backstage",
//   },
//   {
//     id: "8",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg28js72aafhs90v4y9hz2zy6x7bvqyn",
//     thumbnail:
//       "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80",
//     title: "Album Cover Shoot",
//   },
//   {
//     id: "9",
//     type: "video",
//     url: "https://storage.googleapis.com/convex-prod-public/kg26rt0vnavwhfmpwqxnxnqnqh7btqnj",
//     thumbnail:
//       "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
//     title: "Studio Recording",
//   },
// ];

export function GallerySection(
//   {
//   title = "",
//   // items = useMediaGallery(),
// }: GallerySectionProps
) {
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
                {selectedItem?.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
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
                  </div>
                )}
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
