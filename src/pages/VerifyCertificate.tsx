import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import BackgroundBlobs from '../components/BackgroundBlobs';
import VerifyHero from '../components/verify/VerifyHero';
import ResultCard from '../components/verify/ResultCard';
import ExplainerSection from '../components/verify/ExplainerSection';

// Note on Security & Rate Limiting:
// 1. Rate Limiting: We implement a basic client-side rate limit using sessionStorage.
//    In a production scenario, you would also use Firebase App Check and Cloud Functions
//    for strict server-side rate limiting to prevent abuse/scraping.
// 2. Security Rules: Ensure your Firestore rules only allow public reads for exact matches,
//    and restrict writes to admins.
/*
match /certificates/{certId} {
  allow read: if true;
  allow write, delete: if request.auth != null && request.auth.token.admin == true;
}
*/

const MOCK_CERTIFICATE = {
  certificateId: "FC-2026-DEMO",
  studentName: "Ramesh Kumar",
  courseName: "Advanced Full-Stack Development",
  instituteName: "FutureCode Academy, Patna",
  issueDate: "July 15, 2026",
  previewUrl: "https://images.unsplash.com/photo-1589330694653-06defb5e1220?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Placeholder certificate image
  downloadUrl: "#"
};

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [data, setData] = useState<any | null>(null);

  const checkRateLimit = () => {
    const now = Date.now();
    const attemptsStr = sessionStorage.getItem('verifyAttempts');
    let attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
    
    // Filter attempts within the last 1 minute (60000ms)
    attempts = attempts.filter((timestamp: number) => now - timestamp < 60000);
    
    if (attempts.length >= 10) {
      return false; // Rate limited
    }
    
    attempts.push(now);
    sessionStorage.setItem('verifyAttempts', JSON.stringify(attempts));
    return true;
  };

  const handleVerify = async () => {
    if (!certificateId.trim()) return;

    if (!checkRateLimit()) {
      alert("You have exceeded the maximum number of verification attempts. Please try again in a minute.");
      return;
    }

    setStatus('loading');
    setData(null);

    // Mock Fallback for Development (Offline Mode)
    if (certificateId.trim().toUpperCase() === "FC-2026-DEMO") {
      setTimeout(() => {
        setData(MOCK_CERTIFICATE);
        setStatus('success');
      }, 1500); // Simulate network delay
      return;
    }

    try {
      const q = query(
        collection(db, 'certificates'), 
        where('certificateId', '==', certificateId.trim())
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Assuming there's only one certificate per ID
        const docData = querySnapshot.docs[0].data();
        setData(docData);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      // In dev mode without keys, this will fail. Show error state.
      setStatus('error');
    }
  };

  return (
    <div className="w-full relative bg-background min-h-screen">
      <BackgroundBlobs />
      
      <main className="w-full relative z-10">
        <VerifyHero 
          certificateId={certificateId} 
          setCertificateId={setCertificateId}
          onVerify={handleVerify}
          isLoading={status === 'loading'}
        />
        
        <ResultCard status={status} data={data} />
        
        <ExplainerSection />
      </main>
    </div>
  );
}
