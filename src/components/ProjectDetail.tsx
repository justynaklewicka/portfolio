import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Project } from "./AdminPanel";
import { useEffect } from "react";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    
    // Scroll to top of modal container when opening
    setTimeout(() => {
      const modalContainer = document.querySelector('.project-detail-container');
      if (modalContainer) {
        modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
    
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Render content blocks
  const renderContent = () => {
    if (!project.contentBlocks || project.contentBlocks.length === 0) {
      return <p className="text-[#6B8E9E] italic">No content available for this project.</p>;
    }

    return project.contentBlocks.map((block, index) => {
      if (block.type === 'text') {
        return (
          <div key={block.id} className="my-4">
            <p className="text-[#0F4C5C] whitespace-pre-line leading-relaxed">
              {block.content}
            </p>
          </div>
        );
      } else if (block.type === 'image' && block.content) {
        return (
          <div key={block.id} className="my-6">
            <img
              src={block.content}
              alt={`Project content ${index + 1}`}
              className="w-full rounded-lg shadow-md"
              style={{ maxHeight: '600px', objectFit: 'contain' }}
            />
          </div>
        );
      }
      return null;
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Close if clicking the backdrop (not the card content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto project-detail-container" 
      onClick={handleBackdropClick}
    >
      <div className="min-h-screen py-8 px-4" onClick={handleBackdropClick}>
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm p-0 overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#6B8E9E]/20 p-6 flex items-center justify-between z-10">
              <div>
                <span className="inline-block px-3 py-1 bg-[#E0A63F]/20 text-[#E0A63F] rounded-full text-sm mb-2">
                  {project.category}
                </span>
                <h2 className="text-[#0F4C5C]">{project.title}</h2>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="hover:bg-[#0F4C5C]/10 bg-white border-2 border-[#0F4C5C] text-[#0F4C5C]"
                aria-label="Close project details"
              >
                <X className="size-5" />
              </Button>
            </div>

            {/* Main Image */}
            <div className="relative">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full object-contain"
                style={{ maxHeight: '80vh' }}
              />
            </div>

            {/* Description Content */}
            <div className="p-8">
              {project.contentBlocks ? (
                <div className="prose prose-slate max-w-none">
                  {renderContent()}
                </div>
              ) : (
                <p className="text-[#6B8E9E] italic">No content available for this project.</p>
              )}
            </div>

            {/* Close Button at Bottom */}
            <div className="p-6 border-t border-[#6B8E9E]/20 bg-white/50">
              <Button 
                onClick={onClose}
                className="w-full bg-[#0F4C5C] hover:bg-[#0F4C5C]/90 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Back to Portfolio
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}