import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import BackgroundBlobs from '../components/BackgroundBlobs';
import SEO from '../components/SEO';

// We will build these components next
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import MissionVision from '../components/about/MissionVision';
import FounderSection from '../components/about/FounderSection';
import ValuesSection from '../components/about/ValuesSection';
import TeamSection from '../components/about/TeamSection';

// --- Fallback Data ---
const fallbackData = {
  story: "FutureCodeAI bridges the gap between traditional education and industry demands. By partnering with existing coaching institutes and colleges, we leverage local infrastructure to deliver our modern, in-demand tech curriculum. We don't just teach code; we empower institutes to offer world-class training in AI, Machine Learning, and Full-Stack Development, followed by guaranteed real-world internship placements.",
  mission: "To democratize access to cutting-edge technology education by empowering local institutes with world-class curriculum and industry connections.",
  vision: "A world where every student, regardless of their location, has the opportunity to learn the technology that builds tomorrow and launch a successful career.",
  founder: {
    name: "Ravi Ranjan Kumar",
    title: "Founder & CEO",
    bio: "Ravi founded FutureCodeAI with a singular vision: to revolutionize tech education in tier-2 and tier-3 cities. With extensive experience in software architecture and AI, he recognized the widening gap between what colleges teach and what the industry needs. He built FutureCodeAI to empower local coaching institutes to bridge this gap.",
    quote: "We are not just building a platform; we are building the architects of tomorrow. Technology belongs to everyone.",
    photoUrl: "/founder.jpg"
  },
  values: [
    { title: "Innovation", desc: "Always pushing the boundaries of what's possible in tech education.", iconKey: "Lightbulb" },
    { title: "Accessibility", desc: "Making premium education available in every city and town.", iconKey: "Globe2" },
    { title: "Practical Learning", desc: "Focusing on hands-on, project-based curriculum.", iconKey: "Terminal" },
    { title: "Career-Focus", desc: "Connecting education directly to internships and jobs.", iconKey: "Briefcase" }
  ],
  milestones: [
    { year: "2023", title: "The Vision Born", description: "FutureCodeAI was founded to bridge the industry-academia gap." },
    { year: "2024", title: "First 10 Partnerships", description: "Successfully partnered with 10 leading coaching institutes in Bihar." },
    { year: "2025", title: "Curriculum Expansion", description: "Launched advanced AI, ML, and Prompt Engineering tracks." },
    { year: "2026", title: "National Scale", description: "Expanding our platform to empower institutes nationwide." }
  ],
  team: [
    { name: "Ramesh Kumar", role: "Platform Manager", photoUrl: "/ramesh.png" }
  ]
};

export default function About() {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, 'pages', 'about');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          // Merge fetched data with fallback to ensure no missing fields
          setData({ ...fallbackData, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching about page data:", error);
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
        <OurStory text={data.story} />
        <MissionVision mission={data.mission} vision={data.vision} />
        <FounderSection founder={data.founder} />
        <ValuesSection values={data.values} />
        <TeamSection team={data.team} />
      </main>
    </div>
  );
}
