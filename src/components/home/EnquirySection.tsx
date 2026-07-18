import Reveal from '../Reveal';

export default function EnquirySection() {
  return (
    <section className="py-24 bg-surface relative z-10" id="enquiry-form">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6 tracking-tight">Enquiry Form</h2>
            <p className="text-lg text-slate-500 font-medium mb-10">
              Click the button below to fill out our quick enquiry form. Our team will get back to you shortly to guide you on the best path forward.
            </p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSft3jx8ku_rz3flPi655bQgpEB_i40yS04vIVhDNV9Fb-OzPA/viewform?usp=sharing&ouid=108683978754416404738"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-indigo-500 transition-all shadow-glow-primary hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1 active:scale-95"
            >
              Open Enquiry Form
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
