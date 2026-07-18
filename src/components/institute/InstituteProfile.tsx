import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Clock, CheckCircle2, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const instituteProfileSchema = z.object({
  displayName: z.string().min(3, "Institute name must be at least 3 characters"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  description: z.string().min(20, "Please provide a brief description (min 20 chars)"),
});

type ProfileFormValues = z.infer<typeof instituteProfileSchema>;

export default function InstituteProfile() {
  const { user } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<ProfileFormValues>({
    resolver: zodResolver(instituteProfileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      contactPerson: '',
      phone: user?.phone || '',
      description: '',
    }
  });

  const onSubmit = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsPending(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-text-heading">Institute Profile</h2>
        <p className="text-slate-500 font-medium text-sm mt-1">Manage your public presence on the Collaborators page.</p>
      </div>
      
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-4 left-4 md:left-auto bg-amber-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-lg z-20"
            >
              <CheckCircle2 size={16} />
              Submitted for Admin Approval!
            </motion.div>
          )}
        </AnimatePresence>

        {isPending && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-800"
          >
            <Clock size={20} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold mb-1">Updates Pending Approval</p>
              <p className="text-sm font-medium opacity-90">
                Your profile updates have been submitted to FutureCodeAI administrators for review. They will appear on the public website once approved (usually within 24 hours).
              </p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          
          {/* Logo Field (Simulated) */}
          <div className="pb-6 border-b border-gray-100">
            <label className="block text-sm font-bold text-slate-700 mb-3">Institute Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-slate-50 overflow-hidden">
                <img src={user.photoURL} alt="Logo" className="w-full h-full object-contain p-2" />
              </div>
              <button 
                type="button"
                disabled={isPending}
                className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg text-sm hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Upload New Logo
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Institute Name</label>
                <input 
                  disabled={isPending}
                  {...register("displayName")}
                  className={`w-full bg-white border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text-heading disabled:bg-slate-50 disabled:text-slate-500 ${errors.displayName ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                />
                {errors.displayName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.displayName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Primary Contact Person</label>
                <input 
                  disabled={isPending}
                  {...register("contactPerson")}
                  className={`w-full bg-white border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text-heading disabled:bg-slate-50 disabled:text-slate-500 ${errors.contactPerson ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                />
                {errors.contactPerson && <p className="text-red-500 text-xs mt-1 ml-1">{errors.contactPerson.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Contact Phone</label>
                <input 
                  disabled={isPending}
                  {...register("phone")}
                  className={`w-full bg-white border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text-heading disabled:bg-slate-50 disabled:text-slate-500 ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  Registered Email
                  <Lock size={14} className="text-slate-400" />
                </label>
                <input 
                  disabled
                  value={user.email}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-500 font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Public Description</label>
              <textarea 
                disabled={isPending}
                rows={4}
                {...register("description")}
                className={`w-full bg-white border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all text-text-heading disabled:bg-slate-50 disabled:text-slate-500 resize-none ${errors.description ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1 ml-1">{errors.description.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={isSubmitting || (!isDirty && !isPending) || isPending}
              className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isPending ? (
                <>
                  <Clock size={18} /> Pending Approval
                </>
              ) : (
                'Submit for Review'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
