import logo from "figma:asset/e66861bb25c6faeca10b86454c9d58ca06097999.png";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="Sivoriel Design Logo" className="h-64 w-auto" />
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="mb-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full">
            Graphic Designer & Visual Artist
          </div>
          <h1 className="mb-6">
            Justyna Klewicka
          </h1>
          <p className="mb-6 max-w-2xl mx-auto">
            Hey! I'm a graphic designer who loves creating brand identities, 
            marketing materials, and all things visual. Currently looking for 
            full-time opportunities where I can bring creative ideas to life.
          </p>
          <p className="mb-8 max-w-2xl mx-auto">
            I pay attention to the details and always aim to make designs that 
            not only look good but actually communicate the right message.
          </p>
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            View Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}