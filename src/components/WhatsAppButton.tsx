import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL = `https://wa.me/918709078136?text=${encodeURIComponent("Hi, I'm interested in FutureCodeAI courses")}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute -top-10 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
        Chat with us!
      </span>
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ring-4 ring-[#25D366]/20">
        <MessageCircle size={28} className="text-white" fill="white" />
      </div>
    </a>
  );
}
