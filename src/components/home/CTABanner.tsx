import Reveal from '../Reveal';

export default function CTABanner() {
  const scrollToEnquiry = () => {
    document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 relative z-10 px-6">
      <div className="container mx-auto max-w-7xl">
        <Reveal direction="up">
          <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-primary p-8 sm:p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-white/10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight">
                Ready to future-proof your career?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 font-medium">
                Join the fastest growing tech education platform and start building the future today. 
                Spots for the upcoming batch are filling fast.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={scrollToEnquiry}
                  className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-full text-base font-bold hover:bg-gray-50 transition-all shadow-glow-primary active:scale-95 hover:-translate-y-1"
                >
                  Enroll Now
                </button>
                <button 
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-white/20 transition-all active:scale-95 hover:-translate-y-1"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
