import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Reveal from '../Reveal';

interface Testimonial {
  id: string;
  name: string;
  photoUrl?: string;
  institute: string;
  quote: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const displayData = testimonials.length > 0 ? testimonials : [
    {
      id: '1',
      name: 'Rohan Sharma',
      institute: 'Tech Innovation College',
      quote: 'The AI & ML curriculum is incredibly well-structured. Building real models in class gave me the confidence to ace my interviews.',
      rating: 5
    },
    {
      id: '2',
      name: 'Priya Patel',
      institute: 'Global Tech Academy',
      quote: 'I learned Full-Stack development from scratch and landed a great internship within 4 months. The hands-on approach is exactly what I needed.',
      rating: 5
    },
    {
      id: '3',
      name: 'Amit Kumar',
      institute: 'Pinnacle Institute',
      quote: 'The prompt engineering course opened my eyes to the power of LLMs. FutureCodeAI provides top-tier education right in our city.',
      rating: 4
    }
  ];

  if (loading) return null;

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-text-heading mb-4">Student Success Stories</h2>
              <p className="text-lg text-text-body">
                Hear from thousands of students who have transformed their careers with FutureCodeAI.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {displayData.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_40%] pl-6"
              >
                <Reveal delay={index * 0.1} direction="up" className="h-full">
                  <div className="glass p-8 rounded-3xl h-full flex flex-col relative group hover:-translate-y-2 transition-transform duration-300">
                    <Quote className="absolute top-8 right-8 text-primary/10 w-16 h-16 transform -scale-x-100" />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < testimonial.rating ? 'fill-warning text-warning' : 'text-gray-300'} 
                        />
                      ))}
                    </div>

                    <p className="text-text-heading text-lg font-medium leading-relaxed mb-8 flex-grow relative z-10">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl overflow-hidden shrink-0">
                        {testimonial.photoUrl ? (
                          <img src={testimonial.photoUrl} alt={testimonial.name} loading="lazy" className="w-full h-full object-cover" />
                        ) : (
                          testimonial.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-text-heading">{testimonial.name}</h4>
                        <p className="text-sm text-text-body">{testimonial.institute}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
