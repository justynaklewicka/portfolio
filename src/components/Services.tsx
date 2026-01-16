export function Services() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <h2 className="mb-8 text-center">Services Available</h2>
          <p className="text-center mb-10 max-w-3xl mx-auto">
            I'm available for select freelance projects. Below are the services I offer:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="mb-3">Brand Identity & Logo Design</h3>
              <p className="text-sm">Creating memorable logos and comprehensive brand identities that define your business.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="mb-3">Marketing Materials</h3>
              <p className="text-sm">Professional flyers, brochures, and promotional materials that engage your audience.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="mb-3">Social Media Graphics</h3>
              <p className="text-sm">Eye-catching posts and banners optimized for various social platforms.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="mb-3">Print Design & Layouts</h3>
              <p className="text-sm">Magazine layouts, catalogs, and print-ready designs with precision and care.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="mb-3">Business Cards & Stationery</h3>
              <p className="text-sm">Professional business materials that leave a lasting impression.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="mb-3">Custom Illustrations</h3>
              <p className="text-sm">Unique illustrations and visual assets tailored to your brand.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
