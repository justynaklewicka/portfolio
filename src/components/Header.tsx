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
          <div className="cursor-pointer flex items-center gap-3" onClick={() => scrollToSection("home")}>
            <img src={logo} alt="Sivoriel Design" className="h-10 w-auto" />
            <span>Sivoriel Design</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection("home")} className="hover:text-primary transition-colors focus:outline-none focus:text-primary">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors focus:outline-none focus:text-primary">
              About
            </button>
            <button onClick={() => scrollToSection("work")} className="hover:text-primary transition-colors focus:outline-none focus:text-primary">
              Work
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors focus:outline-none focus:text-primary">
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
          <div className="md:hidden mt-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection("home")} className="hover:text-primary transition-colors text-left focus:outline-none focus:text-primary">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors text-left focus:outline-none focus:text-primary">
              About
            </button>
            <button onClick={() => scrollToSection("work")} className="hover:text-primary transition-colors text-left focus:outline-none focus:text-primary">
              Work
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors text-left focus:outline-none focus:text-primary">
              Contact
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}