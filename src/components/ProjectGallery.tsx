import { ProjectCard } from "./ProjectCard";
import { Project } from "./AdminPanel";
import { useState } from "react";
import { ProjectDetail } from "./ProjectDetail";

interface ProjectGalleryProps {
  projects: Project[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="work" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h2 className="mb-4">Portfolio</h2>
            <p className="max-w-2xl mx-auto">
              Browse through my recent projects including brand identities, marketing materials, 
              and custom graphic designs created for clients.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                category={project.category}
                imageUrl={project.imageUrl}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}