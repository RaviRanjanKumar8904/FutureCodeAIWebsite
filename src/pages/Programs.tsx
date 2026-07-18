import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BackgroundBlobs from '../components/BackgroundBlobs';
import ProgramsHero from '../components/programs/ProgramsHero';
import FilterBar from '../components/programs/FilterBar';
import CourseCard from '../components/programs/CourseCard';
import type { CourseData } from '../components/programs/CourseCard';
import CourseModal from '../components/programs/CourseModal';
import EnquiryFormModal from '../components/programs/EnquiryFormModal';
import type { TargetInfo } from '../components/programs/EnquiryFormModal';
import CityCTA from '../components/programs/CityCTA';

const fallbackCourses: CourseData[] = [
  {
    id: "course-1",
    title: "Advanced Full-Stack Development",
    description: "Master modern web development from front to back. Build real-world applications using React, Node.js, and MongoDB.",
    category: "Web Development",
    duration: "16 Weeks",
    level: "Intermediate",
    institute: { name: "FutureCode Academy", city: "Purnea", address: "Tech Park, Bailey Road" },
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    ],
    syllabus: [
      { title: "Frontend Mastery with React", topics: ["Components & Props", "State Management (Redux/Zustand)", "Routing & Hooks", "Performance Optimization"] },
      { title: "Backend Architecture", topics: ["Node.js & Express", "RESTful APIs", "Authentication (JWT)", "Microservices Intro"] },
      { title: "Database Design", topics: ["MongoDB Fundamentals", "Mongoose ORM", "Aggregation Framework", "NoSQL vs SQL"] }
    ],
    batchTimings: "Mon, Wed, Fri - 6:00 PM to 8:00 PM",
    isActive: true
  },
  {
    id: "course-2",
    title: "AI & Machine Learning Foundations",
    description: "Dive deep into the algorithms that power modern AI. Learn Python, Pandas, TensorFlow, and build predictive models.",
    category: "AI/ML",
    duration: "12 Weeks",
    level: "Advanced",
    institute: { name: "CodeCraft Institute", city: "Purnea", address: "HSR Layout, Sector 2" },
    thumbnailUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    galleryUrls: [],
    syllabus: [
      { title: "Data Science with Python", topics: ["Numpy & Pandas", "Data Visualization", "Statistical Analysis"] },
      { title: "Machine Learning Core", topics: ["Linear Regression", "Decision Trees", "SVM & KNN"] },
      { title: "Deep Learning Intro", topics: ["Neural Networks", "TensorFlow Basics", "Image Classification"] }
    ],
    batchTimings: "Weekends - 10:00 AM to 1:00 PM",
    isActive: true
  },
  {
    id: "course-3",
    title: "Mastering Data Structures in C++",
    description: "The ultimate preparation for product-based company interviews. Master DSA, problem-solving, and algorithmic thinking.",
    category: "Programming Languages",
    duration: "10 Weeks",
    level: "Beginner",
    institute: { name: "Apex Coaching", city: "Purnea", address: "Boring Road Crossing" },
    thumbnailUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    galleryUrls: [],
    syllabus: [
      { title: "C++ Fundamentals", topics: ["Syntax & Pointers", "OOP Concepts", "STL Libraries"] },
      { title: "Core Data Structures", topics: ["Arrays & Strings", "Linked Lists", "Stacks & Queues"] },
      { title: "Advanced Algorithms", topics: ["Trees & Graphs", "Dynamic Programming", "Sorting & Searching"] }
    ],
    batchTimings: "Tue, Thu, Sat - 5:00 PM to 7:00 PM",
    isActive: true
  },
  {
    id: "course-4",
    title: "Prompt Engineering & Generative AI",
    description: "Learn to harness the power of LLMs like ChatGPT and Claude to automate workflows and build AI-powered apps.",
    category: "Prompt Engineering",
    duration: "6 Weeks",
    level: "Beginner",
    institute: { name: "FutureCode Academy", city: "Purnea", address: "Kalyani Nagar" },
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    galleryUrls: [],
    syllabus: [
      { title: "Understanding LLMs", topics: ["How Transformers Work", "Zero-shot & Few-shot Learning"] },
      { title: "Advanced Prompting Techniques", topics: ["Chain of Thought", "ReAct Framework", "Prompt Injection Security"] },
      { title: "Building AI Apps", topics: ["OpenAI API", "LangChain Basics", "RAG (Retrieval-Augmented Generation)"] }
    ],
    batchTimings: "Sun - 9:00 AM to 12:00 PM",
    isActive: true
  }
];

export default function Programs() {
  const [courses] = useState<CourseData[]>(fallbackCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [enquiringTarget, setEnquiringTarget] = useState<TargetInfo | null>(null);

  const location = useLocation();

  useEffect(() => {
    // If we're linking to this page from a specific category on the homepage
    if (location.pathname === '/programs/fullstack') setCategoryFilter('Web Development');
    if (location.pathname === '/programs/ai-ml') setCategoryFilter('AI/ML');
    if (location.pathname === '/programs/dsa') setCategoryFilter('Programming Languages');
    if (location.pathname === '/programs/prompt-engineering') setCategoryFilter('Prompt Engineering');
  }, [location]);

  // Derived state for filters
  const categories = useMemo(() => Array.from(new Set(courses.map(c => c.category))), [courses]);
  const cities = useMemo(() => Array.from(new Set(courses.map(c => c.institute.city))), [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
      const matchesCity = cityFilter === 'All' || course.institute.city === cityFilter;
      
      return matchesSearch && matchesCategory && matchesCity && course.isActive;
    });
  }, [courses, searchQuery, categoryFilter, cityFilter]);

  const handleEnquire = (target: TargetInfo) => {
    setEnquiringTarget(target);
  };

  return (
    <div className="w-full relative bg-background min-h-screen">
      <BackgroundBlobs />
      
      <main className="w-full relative z-10">
        <ProgramsHero />
        
        <FilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          categories={categories}
          cities={cities}
        />

        <section className="py-20 relative z-10 min-h-[50vh]">
          <div className="container mx-auto px-6 max-w-7xl">
            {filteredCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    index={index} 
                    onClick={() => setSelectedCourse(course)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-text-heading mb-2">No courses found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setCityFilter('All');
                  }}
                  className="mt-6 bg-white border border-gray-200 text-text-heading px-6 py-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        <CityCTA />
      </main>

      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)}
        onEnquire={handleEnquire}
      />

      <EnquiryFormModal 
        isOpen={!!enquiringTarget}
        onClose={() => setEnquiringTarget(null)}
        target={enquiringTarget}
        type="course"
      />
    </div>
  );
}
