import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProjectGallery } from "./components/ProjectGallery";
import { Services } from "./components/Services";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ParallaxMountains } from "./components/ParallaxMountains";
import { AdminPanel, Project } from "./components/AdminPanel";
import { AdminLogin } from "./components/AdminLogin";
import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Settings } from "lucide-react";

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Brand Identity System",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1647675975434-864e1c3fc98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwYnJhbmRpbmd8ZW58MXx8fHwxNzYyNjE0MzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "Music Festival Poster",
    category: "Print Design",
    imageUrl: "https://images.unsplash.com/photo-1762365189058-7be5b07e038b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb3N0ZXIlMjBkZXNpZ258ZW58MXx8fHwxNzYyNTg0ODgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Minimal Logo Collection",
    category: "Logo Design",
    imageUrl: "https://images.unsplash.com/photo-1756510473714-567691ff8a2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbG9nbyUyMGRlc2lnbnxlbnwxfHx8fDE3NjI1MzE1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    title: "Abstract Art Series",
    category: "Illustration",
    imageUrl: "https://images.unsplash.com/photo-1726070319073-17ca8a58a850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjI2MjAxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    title: "Typography Experiments",
    category: "Typography",
    imageUrl: "https://images.unsplash.com/photo-1738003667850-a2fb736e31b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5JTIwZGVzaWdufGVufDF8fHx8MTc2MjYxMzkyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    title: "Product Packaging",
    category: "Packaging",
    imageUrl: "https://images.unsplash.com/photo-1748765968965-7e18d4f7192b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBhY2thZ2luZyUyMGRlc2lnbnxlbnwxfHx8fDE3NjI1MjAwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load projects from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("portfolio-projects");
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch {
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
    }

    // Check if user has an active session
    const sessionAuth = sessionStorage.getItem("admin-authenticated");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Save projects to localStorage whenever they change
  const handleUpdateProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("portfolio-projects", JSON.stringify(updatedProjects));
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setShowAdmin(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("admin-authenticated", "true");
    setShowLogin(false);
    setShowAdmin(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin-authenticated");
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen">
      <ParallaxMountains />
      <div className="relative z-10">
        <Header />
        <Hero />
        <ProjectGallery projects={projects} />
        <Services />
        <Contact />
        <Footer />
      </div>

      {/* Admin Panel Toggle Button */}
      <Button
        onClick={handleAdminClick}
        className="fixed bottom-6 right-6 z-40 bg-[#E0A63F] hover:bg-[#E0A63F]/90 text-[#0F4C5C] shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        size="icon"
        aria-label="Open admin panel"
      >
        <Settings className="size-5" />
      </Button>

      {/* Admin Login */}
      {showLogin && (
        <AdminLogin
          onLogin={handleLogin}
          onClose={handleCloseLogin}
        />
      )}

      {/* Admin Panel */}
      {showAdmin && isAuthenticated && (
        <AdminPanel
          projects={projects}
          onUpdateProjects={handleUpdateProjects}
          onClose={handleCloseAdmin}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}