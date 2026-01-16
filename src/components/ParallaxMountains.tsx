import { useEffect, useState } from "react";

export function ParallaxMountains() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax transforms - mountains move down as you scroll
  const layer1Transform = Math.min(scrollY * 0.15, window.innerHeight * 0.8);
  const layer2Transform = Math.min(scrollY * 0.25, window.innerHeight * 0.8);
  const layer3Transform = Math.min(scrollY * 0.35, window.innerHeight * 0.8);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Back mountain layer - brighter and bigger */}
      <svg
        className="absolute bottom-0 w-full h-auto transition-transform duration-100 ease-linear"
        style={{ 
          transform: `translateY(${layer1Transform}px)`,
          opacity: 0.7
        }}
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
      >
        <path
          fill="#1a5a6b"
          d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,165.3C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,500L1392,500C1344,500,1248,500,1152,500C1056,500,960,500,864,500C768,500,672,500,576,500C480,500,384,500,288,500C192,500,96,500,48,500L0,500Z"
        />
      </svg>

      {/* Middle mountain layer - brighter */}
      <svg
        className="absolute bottom-0 w-full h-auto transition-transform duration-100 ease-linear"
        style={{ 
          transform: `translateY(${layer2Transform}px)`,
          opacity: 0.75
        }}
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
      >
        <path
          fill="#246a7c"
          d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,500L1392,500C1344,500,1248,500,1152,500C1056,500,960,500,864,500C768,500,672,500,576,500C480,500,384,500,288,500C192,500,96,500,48,500L0,500Z"
        />
      </svg>

      {/* Front mountain layer - brightest and biggest */}
      <svg
        className="absolute bottom-0 w-full h-auto transition-transform duration-100 ease-linear"
        style={{ 
          transform: `translateY(${layer3Transform}px)`,
          opacity: 0.85
        }}
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
      >
        <path
          fill="#2d7a8e"
          d="M0,256L48,245.3C96,235,192,213,288,208C384,203,480,213,576,218.7C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,500L1392,500C1344,500,1248,500,1152,500C1056,500,960,500,864,500C768,500,672,500,576,500C480,500,384,500,288,500C192,500,96,500,48,500L0,500Z"
        />
      </svg>
    </div>
  );
}