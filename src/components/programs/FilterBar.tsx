import { Search, MapPin, Layers } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  cityFilter: string;
  setCityFilter: (val: string) => void;
  categories: string[];
  cities: string[];
}

export default function FilterBar({
  searchQuery, setSearchQuery,
  categoryFilter, setCategoryFilter,
  cityFilter, setCityFilter,
  categories, cities
}: FilterBarProps) {
  return (
    <div className="bg-white sticky top-[72px] md:top-[88px] z-40 border-b border-gray-100 shadow-sm py-4">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          
          {/* Search Box */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search courses (e.g. React, Data Science)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 text-text-heading rounded-full py-3 pl-12 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex w-full md:w-auto gap-4">
            {/* Category Filter */}
            <div className="relative flex-1 md:w-48">
              <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 text-text-heading rounded-full py-3 pl-10 pr-8 outline-none focus:border-primary appearance-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* City Filter */}
            <div className="relative flex-1 md:w-48">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 text-text-heading rounded-full py-3 pl-10 pr-8 outline-none focus:border-primary appearance-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
