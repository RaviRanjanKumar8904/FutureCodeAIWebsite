import { Link } from 'react-router-dom';
import Reveal from '../Reveal';

export default function CityCTA() {
  return (
    <section className="py-24 bg-surface relative z-10 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-heading mb-6 tracking-tight">
            Don't see your course?
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-10">
            We are rapidly expanding our program offerings. Let us know what course you want next, or ask your local institute to partner with us!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSft3jx8ku_rz3flPi655bQgpEB_i40yS04vIVhDNV9Fb-OzPA/viewform?usp=sharing&ouid=108683978754416404738"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-600 transition-all shadow-glow-primary w-full sm:w-auto"
            >
              Request a Course
            </a>
            <Link 
              to="/institutes"
              className="bg-white text-text-heading border border-gray-200 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all w-full sm:w-auto"
            >
              Partner With Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
