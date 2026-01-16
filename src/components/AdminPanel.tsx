import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Pencil, Trash2, Plus, X, Upload, LogOut } from "lucide-react";
import { BlockEditor, ContentBlock } from "./BlockEditor";
import { ProjectDetail } from "./ProjectDetail";

export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  contentBlocks?: ContentBlock[];
}

interface AdminPanelProps {
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onClose: () => void;
  onLogout: () => void;
}

export function AdminPanel({ projects, onUpdateProjects, onClose, onLogout }: AdminPanelProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({ 
    title: "", 
    category: "", 
    imageUrl: "", 
    contentBlocks: [] as ContentBlock[]
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const blockEditorRef = useRef<BlockEditorHandle>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      
      setUploadingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted!", { editingProject, formData });
    
    if (!formData.title.trim() || !formData.category.trim() || !formData.imageUrl) {
      alert("Please fill in all required fields (title, category, and cover image)");
      return;
    }
    
    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...editingProject, ...formData }
          : p
      );
      onUpdateProjects(updatedProjects);
      setEditingProject(null);
      alert("Project updated successfully!");
    } else {
      // Add new project
      const newProject: Project = {
        id: Math.max(...projects.map(p => p.id), 0) + 1,
        ...formData
      };
      console.log("Adding new project:", newProject);
      onUpdateProjects([...projects, newProject]);
      setIsAddingNew(false);
      alert("Project added successfully!");
    }
    
    setFormData({ title: "", category: "", imageUrl: "", contentBlocks: [] });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      imageUrl: project.imageUrl,
      contentBlocks: project.contentBlocks || []
    });
    setIsAddingNew(false);
    
    // Scroll to top of admin panel
    setTimeout(() => {
      const adminPanel = document.querySelector('.admin-panel-container');
      if (adminPanel) {
        adminPanel.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      onUpdateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsAddingNew(false);
    setFormData({ title: "", category: "", imageUrl: "", contentBlocks: [] });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProject(null);
    setFormData({ title: "", category: "", imageUrl: "", contentBlocks: [] });
    
    // Scroll to top of admin panel
    setTimeout(() => {
      const adminPanel = document.querySelector('.admin-panel-container');
      if (adminPanel) {
        adminPanel.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      onLogout();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto admin-panel-container">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#0F4C5C]">Admin Panel - Manage Projects</h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-[#0F4C5C] border-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white bg-white"
                >
                  <LogOut className="size-4 mr-2" />
                  Logout
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="hover:bg-[#0F4C5C]/10 text-[#0F4C5C] border border-[#0F4C5C]/30"
                >
                  <X className="size-5" />
                </Button>
              </div>
            </div>

            {/* Add/Edit Form */}
            {(isAddingNew || editingProject) && (
              <Card className="p-6 mb-8 bg-[#E0A63F]/10 border-[#E0A63F]/30">
                <h3 className="mb-4 text-[#0F4C5C]">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                      placeholder="e.g., Brand Identity System"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      required
                      placeholder="e.g., Branding, Logo Design, Print Design"
                    />
                  </div>
                  <div>
                    <Label>Cover Image (Required)</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label 
                          htmlFor="image-upload" 
                          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#6B8E9E] hover:bg-[#6B8E9E]/90 text-white rounded-md transition-colors"
                        >
                          <Upload className="size-4" />
                          {uploadingImage ? "Uploading..." : "Upload from Computer"}
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                        <span className="text-xs text-[#6B8E9E]">Max 5MB</span>
                      </div>
                      {formData.imageUrl && (
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-lg border border-[#6B8E9E]/30"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <BlockEditor
                      blocks={formData.contentBlocks}
                      onChange={(blocks) => setFormData(prev => ({ ...prev, contentBlocks: blocks }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-[#E0A63F] hover:bg-[#E0A63F]/90 text-white" disabled={!formData.imageUrl}>
                      {editingProject ? "Update Project" : "Add Project"}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Add New Button */}
            {!isAddingNew && !editingProject && (
              <Button 
                onClick={handleAddNew}
                className="mb-6 bg-[#0F4C5C] hover:bg-[#0F4C5C]/90 text-white"
              >
                <Plus className="size-4 mr-2" />
                Add New Project
              </Button>
            )}

            {/* Projects List */}
            <div className="space-y-4">
              <h3 className="text-[#0F4C5C]">Current Projects ({projects.length})</h3>
              {projects.length === 0 ? (
                <p className="text-[#0F4C5C] py-8 text-center">No projects yet. Add your first project above!</p>
              ) : (
                projects.map((project) => (
                  <Card key={project.id} className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow bg-white">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setPreviewProject(project)}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="text-[#0F4C5C] truncate cursor-pointer hover:text-[#E0A63F] transition-colors"
                        onClick={() => setPreviewProject(project)}
                      >
                        {project.title}
                      </h4>
                      <p className="text-[#0F4C5C]/70 truncate">{project.category}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(project)}
                        className="border-[#E0A63F] text-[#E0A63F] hover:bg-[#E0A63F]/10"
                        aria-label="Edit project"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        aria-label="Delete project"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Project Preview Modal with Edit/Delete Actions */}
      {previewProject && (
        <div className="relative z-[60]">
          <ProjectDetail 
            project={previewProject} 
            onClose={() => setPreviewProject(null)} 
          />
          {/* Floating action buttons */}
          <div className="fixed bottom-6 right-6 z-[70] flex gap-3">
            <Button
              onClick={() => {
                setPreviewProject(null);
                handleEdit(previewProject);
              }}
              className="bg-[#E0A63F] hover:bg-[#E0A63F]/90 text-white shadow-lg"
            >
              <Pencil className="size-4 mr-2" />
              Edit Project
            </Button>
            <Button
              onClick={() => {
                setPreviewProject(null);
                handleDelete(previewProject.id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
            >
              <Trash2 className="size-4 mr-2" />
              Delete Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}