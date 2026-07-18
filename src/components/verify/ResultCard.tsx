import Reveal from '../Reveal';
import { CheckCircle2, XCircle, Download, Calendar, MapPin, BookOpen, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CertificateData {
  certificateId: string;
  studentName: string;
  courseName: string;
  instituteName: string;
  issueDate: string;
  previewUrl: string;
  downloadUrl: string;
}

interface ResultCardProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: CertificateData | null;
}

export default function ResultCard({ status, data }: ResultCardProps) {
  if (status === 'idle') return null;

  return (
    <div className="container mx-auto px-6 max-w-4xl pb-24 relative z-10 mt-12">
      <Reveal direction="up">
        
        {status === 'loading' && (
          <div className="glass rounded-[2rem] p-8 md:p-12 shadow-xl animate-pulse">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/3 aspect-[3/4] bg-slate-200/50 rounded-2xl" />
              <div className="w-full md:w-2/3 space-y-6">
                <div className="h-10 bg-slate-200/50 rounded-full w-3/4" />
                <div className="h-6 bg-slate-200/50 rounded-full w-1/4" />
                <div className="space-y-4 pt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-slate-200/50 rounded-xl w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white border-2 border-red-100 rounded-[2rem] p-8 md:p-12 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />
            <XCircle className="mx-auto text-red-500 mb-6" size={64} />
            <h2 className="text-3xl font-extrabold text-text-heading mb-4">Certificate Not Found</h2>
            <p className="text-lg text-slate-500 mb-8 max-w-lg mx-auto">
              We couldn't find a certificate matching that ID. Please double-check the ID and try again, or contact our support team for assistance.
            </p>
            <Link 
              to="/#enquiry-form"
              className="inline-block bg-white text-text-heading border border-gray-200 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-all shadow-soft"
            >
              Contact Support
            </Link>
          </div>
        )}

        {status === 'success' && data && (
          <div className="glass rounded-[2rem] p-8 md:p-12 shadow-xl border border-white/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />
            
            <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 font-bold px-6 py-2 rounded-full mb-10 w-fit mx-auto border border-green-200 shadow-sm">
              <CheckCircle2 size={20} />
              Verified & Authentic
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Preview Image */}
              <div className="w-full lg:w-2/5">
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white relative group">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                    <a 
                      href={data.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-primary px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-xl"
                    >
                      <Download size={18} /> Download PDF
                    </a>
                  </div>
                  <img 
                    src={data.previewUrl} 
                    alt="Certificate Preview" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="w-full lg:w-3/5">
                <h2 className="text-3xl font-extrabold text-text-heading mb-8">Certificate Details</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <DetailBox icon={<User />} label="Student Name" value={data.studentName} />
                  <DetailBox icon={<BookOpen />} label="Course Name" value={data.courseName} />
                  <DetailBox icon={<MapPin />} label="Institute Name" value={data.instituteName} />
                  <DetailBox icon={<Calendar />} label="Issue Date" value={data.issueDate} />
                </div>

                <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Certificate ID</p>
                    <p className="text-xl font-mono font-bold text-text-heading">{data.certificateId}</p>
                  </div>
                  <a 
                    href={data.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-glow-primary flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Download
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

      </Reveal>
    </div>
  );
}

function DetailBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-start gap-4">
      <div className="text-primary mt-1 opacity-80">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="font-bold text-text-heading text-lg leading-snug">{value}</p>
      </div>
    </div>
  );
}
