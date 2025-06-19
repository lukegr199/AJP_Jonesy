import { cn } from "@/lib/utils";

interface ContentSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
  className?: string;
}

export function ContentSection({
  title,
  description,
  imageUrl,
  reverse = false,
  className,
}: ContentSectionProps) {
  return (
    <div className={cn("py-16 md:py-24 bg-black text-white", className)}>
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex flex-col md:flex-row items-center gap-8 md:gap-16",
            reverse && "md:flex-row-reverse",
          )}
        >
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto rounded-lg shadow-2xl object-cover aspect-[4/3]"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            <p className="text-lg text-gray-300">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
