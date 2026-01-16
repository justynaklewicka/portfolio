import { Mail, Linkedin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <h2 className="mb-6">Get In Touch</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Ready to start your project? Contact me for a consultation and let's discuss 
            how I can help bring your vision to life with professional graphic design.
          </p>
          <a
            href="mailto:justyna.klewicka@outlook.com"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors mb-12 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Contact Me
          </a>
          <div className="flex justify-center gap-6">
            <a 
              href="mailto:justyna.klewicka@outlook.com" 
              className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/justyna-klewicka-8335a3183/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://www.behance.net/jklewicka#" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors focus:outline-none focus:text-primary" 
              aria-label="Behance"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}