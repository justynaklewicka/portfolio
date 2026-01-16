import logo from "figma:asset/e66861bb25c6faeca10b86454c9d58ca06097999.png";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <img src={logo} alt="Sivoriel Design" className="h-24 w-auto opacity-80" />
          <p className="opacity-60">© 2025 Sivoriel Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
