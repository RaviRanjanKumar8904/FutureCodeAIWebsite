import Reveal from '../Reveal';
import { ShieldCheck, Database, FileDigit } from 'lucide-react';

export default function ExplainerSection() {
  return (
    <section className="py-20 bg-surface relative z-10 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-5xl">
        <Reveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-text-heading mb-4 tracking-tight">How Verification Works</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              We employ strict database integrity checks to ensure that every certificate issued by FutureCodeAI is authentic, unaltered, and globally verifiable.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          
          <Reveal direction="up" delay={0.1}>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center flex flex-col items-center h-full">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <FileDigit size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-heading mb-3">Unique Identification</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Every certificate is issued with a unique, cryptographically random ID that is permanently bound to the student's records.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center flex flex-col items-center h-full">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
                <Database size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-heading mb-3">Secure Database</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Records are securely stored in our cloud infrastructure. The database is strictly read-only for the public, preventing any tampering.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 text-center flex flex-col items-center h-full">
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-text-heading mb-3">Instant Validation</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Employers and institutes can instantly verify the authenticity of a candidate's skills directly through this portal with zero friction.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
