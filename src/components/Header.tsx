import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/42bb371a199bc8ef542bbbed02dbde0be2a67804.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer flex items-center gap-3"
            onClick={() => scrollToSection("home")}
          >
            <img src={logo} alt="Sivoriel Design" className="h-10 w-auto" />
            <span>Sivoriel Design</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection("home")}
              className="px-3 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="px-3 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("work")}
              className="px-3 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Portfolio
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className="px-3 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Freelance
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:text-primary transition-colors focus:outline-none focus:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("home")}
              className="w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors focus:outline-none"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className="w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors focus:outline-none"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors focus:outline-none"
            >
              Freelance
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full text-left px-4 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none"
            >
              Contact
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}