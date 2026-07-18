import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import BackgroundBlobs from '../components/BackgroundBlobs';
import VerifyHero from '../components/verify/VerifyHero';
import ResultCard from '../components/verify/ResultCard';
import ExplainerSection from '../components/verify/ExplainerSection';
import SEO from '../components/SEO';

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



export default function VerifyCertificate() {
  const [searchParams] = useSearchParams();
  const [certificateId, setCertificateId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'revoked'>('idle');
  const [data, setData] = useState<any | null>(null);



  const checkRateLimit = () => {
    const now = Date.now();
    const attemptsStr = sessionStorage.getItem('verifyAttempts');
    let attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
    
    // Filter attempts within the last 1 minute (60000ms)
    attempts = attempts.filter((timestamp: number) => now - timestamp < 60000);
    
    if (attempts.length >= 5) {
      return false; // Rate limited
    }
    
    attempts.push(now);
    sessionStorage.setItem('verifyAttempts', JSON.stringify(attempts));
    return true;
  };

  const handleVerify = useCallback(async (idToVerify?: string) => {
    const id = typeof idToVerify === 'string' ? idToVerify : certificateId;
    if (!id.trim()) return;

    if (!checkRateLimit()) {
      alert("You have exceeded the maximum number of verification attempts. Please try again in a minute.");
      return;
    }

    setStatus('loading');
    setData(null);



    try {
      // Artificial delay to mitigate rapid enumeration
      await new Promise(resolve => setTimeout(resolve, 800));

      const docRef = doc(db, 'certificates', id.trim());
      const docSnap = await getDoc(docRef);
      
      // Fire-and-forget log of the verification attempt
      try {
        await addDoc(collection(db, 'verificationLogs'), {
          certificateId: id.trim(),
          timestamp: serverTimestamp(),
          found: docSnap.exists(),
          userAgent: navigator.userAgent
        });
      } catch (logErr) {
        console.warn("Failed to log verification attempt", logErr);
      }

      if (docSnap.exists()) {
        const docData = docSnap.data();
        setData(docData);
        if (docData.revoked === true) {
          setStatus('revoked');
        } else {
          setStatus('success');
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      // In dev mode without keys, this will fail. Show error state.
      setStatus('error');
    }
  }, [certificateId]);

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setCertificateId(idFromUrl);
      handleVerify(idFromUrl);
    }
  }, [searchParams, handleVerify]);

  return (
    <div className="w-full relative bg-background min-h-screen">
      <SEO 
        title="Verify Certificate" 
        description="Verify the authenticity of FutureCodeAI certificates securely using our digital verification portal."
      />
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
