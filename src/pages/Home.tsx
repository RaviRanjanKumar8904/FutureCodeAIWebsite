import BackgroundBlobs from '../components/BackgroundBlobs';
import HeroSection from '../components/home/HeroSection';
import TrustBar from '../components/home/TrustBar';
import OfferingsSection from '../components/home/OfferingsSection';
import TimelineSection from '../components/home/TimelineSection';
import EnquirySection from '../components/home/EnquirySection';

export default function Home() {
  return (
    <div className="w-full relative bg-background">
      <BackgroundBlobs />
      
      <main className="w-full">
        <HeroSection />
        <OfferingsSection />
        <TimelineSection />
        <EnquirySection />
        <TrustBar />
      </main>
    </div>
  );
}
