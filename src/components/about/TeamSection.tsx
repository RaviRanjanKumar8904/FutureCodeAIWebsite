import Reveal from '../Reveal';

export default function TeamSection({ team }: { team: any[] }) {
  if (!team || team.length === 0) return null;

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6 tracking-tight">Meet the Team</h2>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-500 font-medium">
              The passionate individuals driving our vision forward.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Reveal key={index} direction="up" delay={index * 0.1}>
              <div className="glass p-6 rounded-3xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 shadow-soft hover:shadow-soft-lg">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300" />
                  <img 
                    src={member.photoUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-text-heading mb-1">{member.name}</h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
