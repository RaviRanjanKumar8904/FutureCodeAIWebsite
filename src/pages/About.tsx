import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import * as z from 'zod';
import BackgroundBlobs from '../components/BackgroundBlobs';
import SEO from '../components/SEO';

import { Info } from 'lucide-react';

// We will build these components next
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import MissionVision from '../components/about/MissionVision';
import FounderSection from '../components/about/FounderSection';
import ValuesSection from '../components/about/ValuesSection';
import TeamSection from '../components/about/TeamSection';

const aboutSchema = z.object({
  story: z.string().optional(),
  mission: z.string().optional(),
  vision: z.string().optional(),
  founder: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    quote: z.string().optional(),
    photoUrl: z.string().optional()
  }).optional(),
  values: z.array(z.object({
    title: z.string(),
    desc: z.string(),
    iconKey: z.string()
  })).optional(),
  milestones: z.array(z.object({
    year: z.string(),
    title: z.string(),
    description: z.string()
  })).optional(),
  team: z.array(z.object({
    name: z.string(),
    role: z.string(),
    photoUrl: z.string().optional()
  })).optional()
});

export default function About() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, 'pages', 'about');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const result = aboutSchema.safeParse(docSnap.data());
          if (result.success) {
            setData(result.data);
          } else {
            console.error("Firestore data validation failed:", result.error);
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching about page data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="w-full relative bg-background min-h-screen">
      <SEO 
        title="About Us" 
        description="Learn more about FutureCodeAI, our mission to democratize tech education, and the team behind our innovative programs."
      />
      <BackgroundBlobs />
      
      <main className="w-full relative z-10">
        <AboutHero />
        
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : error || !data ? (
          <div className="max-w-4xl mx-auto py-32 px-4 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info size={32} className="text-slate-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-text-heading mb-4">Content Coming Soon</h2>
            <p className="text-slate-500 text-lg font-medium">We are currently updating our about page. Please check back later.</p>
          </div>
        ) : (
          <>
            {data.story && <OurStory text={data.story} />}
            {(data.mission || data.vision) && <MissionVision mission={data.mission || ''} vision={data.vision || ''} />}
            {data.founder && <FounderSection founder={data.founder} />}
            {data.values && data.values.length > 0 && <ValuesSection values={data.values} />}
            {data.team && data.team.length > 0 && <TeamSection team={data.team} />}
          </>
        )}
      </main>
    </div>
  );
}
