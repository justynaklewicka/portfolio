import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
  onClick: () => void;
}

export function ProjectCard({ title, category, imageUrl, onClick }: ProjectCardProps) {
  return (
    <div 
      className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-lg" 
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-gray-100">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <h3 className="mb-1">{title}</h3>
      <p className="opacity-60">{category}</p>
    </div>
  );
}