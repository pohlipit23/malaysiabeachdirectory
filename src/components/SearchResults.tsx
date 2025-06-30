import React, { useState, useEffect } from 'react';
import { List, Map, Filter, Star, MapPin, Waves, Users, Car, Wifi, ArrowRight, Eye, Heart } from 'lucide-react';
import { Beach, FilterOptions } from '../types/Content';
import { searchBeaches, getAllActivities, getAllAmenities, getAllStates } from '../utils/contentLoader';
import InteractiveMap from './InteractiveMap';

interface SearchResultsProps {
  searchQuery: string;
  onBeachSelect: (beach: Beach) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, onBeachSelect }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [filteredBeaches, setFilteredBeaches] = useState<Beach[]>([]);
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    activities: [],
    amenities: [],
    vibe: [],
    accessibility: [],
    rating: 0,
    state: []
  });

  const [filterOptions, setFilterOptions] = useState({
    activities: [] as string[],
    amenities: [] as string[],
    vibe: ['Families', 'Tourists', 'Nature Lovers', 'Eco-tourists', 'Couples', 'Relaxation'],
    accessibility: ['Easy Access', 'Public Transport', 'Wheelchair Accessible', 'Paved Path'],
    states: [] as string[]
  });

  useEffect(() => {
    setFilterOptions(prev => ({
      ...prev,
      activities: getAllActivities(),
      amenities: getAllAmenities(),
      states: getAllStates()
    }));
  }, []);

  useEffect(() => {
    const results = searchBeaches(searchQuery);
    setBeaches(results);
    setFilteredBeaches(results);
  }, [searchQuery]);

  useEffect(() => {
    let filtered = beaches;

    if (filters.rating > 0) {
      filtered = filtered.filter(beach => beach.rating >= filters.rating);
    }

    if (filters.activities.length > 0) {
      filtered = filtered.filter(beach =>
        filters.activities.some(activity => beach.activities.includes(activity))
      );
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(beach =>
        filters.amenities.some(amenity => beach.amenities.includes(amenity))
      );
    }

    if (filters.vibe.length > 0) {
      filtered = filtered.filter(beach =>
        filters.vibe.some(vibe => beach.vibe.includes(vibe))
      );
    }

    if (filters.state.length > 0) {
      filtered = filtered.filter(beach =>
        filters.state.includes(beach.state)
      );
    }

    setFilteredBeaches(filtered);
  }, [filters, beaches]);

  const handleBeachSelect = (beach: Beach) => {
    setSelectedBeach(beach);
    onBeachSelect(beach);
  };

  const getVibeIcon = (vibe: string) => {
    switch (vibe) {
      case 'Families': return Users;
      case 'Quiet': return Waves;
      case 'Adventure': return Waves;
      default: return MapPin;
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Parking': return Car;
      case 'WiFi': return Wifi;
      default: return MapPin;
    }
  };

  return (
    <div className="min-h-screen pt-8 bg-gradient-to-b from-sandy-beige to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cinematic Search Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-dark-slate mb-4">
            Your Beach Journey
          </h1>
          <p className="text-xl text-dark-slate/70 mb-6">
            Searching for "{searchQuery}" • {filteredBeaches.length} paradises discovered
          </p>
          
          {/* Search Stats */}
          <div className="flex justify-center space-x-8 text-sm text-dark-slate/60">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{filteredBeaches.reduce((sum, beach) => sum + beach.reviewCount, 0)} experiences shared</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{(filteredBeaches.reduce((sum, beach) => sum + beach.rating, 0) / filteredBeaches.length || 0).toFixed(1)} avg rating</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sticky top-24 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-playfair font-bold text-dark-slate">Refine Your Search</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-dark-slate/50 hover:text-dark-slate"
                >
                  ×
                </button>
              </div>

              {/* Rating Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-dark-slate mb-4 text-lg">Minimum Rating</h3>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({...filters, rating})}
                      className={`flex flex-col items-center space-y-1 p-3 rounded-xl border-2 transition-all duration-300 ${
                        filters.rating === rating 
                          ? 'bg-gradient-to-r from-ocean-blue to-coral text-white border-transparent shadow-lg' 
                          : 'border-gray-200 hover:border-ocean-blue hover:shadow-md'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                      <span className="text-xs font-bold">{rating}+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* States Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-dark-slate mb-4 text-lg">States</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {filterOptions.states.map((state) => (
                    <label key={state} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-ocean-blue border-2 border-gray-300 rounded focus:ring-ocean-blue focus:ring-2"
                        checked={filters.state.includes(state)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, state: [...filters.state, state]});
                          } else {
                            setFilters({...filters, state: filters.state.filter(s => s !== state)});
                          }
                        }}
                      />
                      <span className="text-dark-slate group-hover:text-ocean-blue transition-colors font-medium">{state}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Activities Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-dark-slate mb-4 text-lg">Activities</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {filterOptions.activities.map((activity) => (
                    <label key={activity} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-ocean-blue border-2 border-gray-300 rounded focus:ring-ocean-blue focus:ring-2"
                        checked={filters.activities.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, activities: [...filters.activities, activity]});
                          } else {
                            setFilters({...filters, activities: filters.activities.filter(a => a !== activity)});
                          }
                        }}
                      />
                      <span className="text-dark-slate group-hover:text-ocean-blue transition-colors font-medium">{activity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-dark-slate mb-4 text-lg">Amenities</h3>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {filterOptions.amenities.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-ocean-blue border-2 border-gray-300 rounded focus:ring-ocean-blue focus:ring-2"
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, amenities: [...filters.amenities, amenity]});
                          } else {
                            setFilters({...filters, amenities: filters.amenities.filter(a => a !== amenity)});
                          }
                        }}
                      />
                      <span className="text-dark-slate group-hover:text-ocean-blue transition-colors font-medium">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Best For Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-dark-slate mb-4 text-lg">Perfect For</h3>
                <div className="space-y-3">
                  {filterOptions.vibe.map((vibe) => (
                    <label key={vibe} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-ocean-blue border-2 border-gray-300 rounded focus:ring-ocean-blue focus:ring-2"
                        checked={filters.vibe.includes(vibe)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, vibe: [...filters.vibe, vibe]});
                          } else {
                            setFilters({...filters, vibe: filters.vibe.filter(v => v !== vibe)});
                          }
                        }}
                      />
                      <span className="text-dark-slate group-hover:text-ocean-blue transition-colors font-medium">{vibe}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {/* View Toggle */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-ocean-blue transition-all shadow-lg"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </button>
              
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-2 shadow-lg">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-ocean-blue to-coral text-white shadow-lg' 
                      : 'text-dark-slate hover:bg-white/50'
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Stories</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    viewMode === 'map' 
                      ? 'bg-gradient-to-r from-ocean-blue to-coral text-white shadow-lg' 
                      : 'text-dark-slate hover:bg-white/50'
                  }`}
                >
                  <Map className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Map</span>
                </button>
              </div>
            </div>

            {/* Results */}
            {viewMode === 'list' ? (
              <div className="space-y-8">
                {filteredBeaches.map((beach, index) => (
                  <div
                    key={beach.id}
                    onClick={() => handleBeachSelect(beach)}
                    className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-white/20 hover:border-ocean-blue/30"
                  >
                    <div className="md:flex">
                      <div className="md:w-96 h-80 md:h-auto relative overflow-hidden">
                        <img
                          src={beach.images[0]}
                          alt={beach.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/60 via-transparent to-transparent"></div>
                        
                        {/* Floating Elements */}
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-bold">{beach.rating}</span>
                        </div>
                        
                        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Heart className="w-5 h-5 text-white" />
                        </div>

                        <div className="absolute bottom-6 left-6 text-white">
                          <div className="flex items-center space-x-2 text-sm opacity-90">
                            <Eye className="w-4 h-4" />
                            <span>{beach.reviewCount} experiences</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 text-coral mb-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm font-medium">{beach.location}</span>
                            </div>
                            <h3 className="text-3xl font-playfair font-bold text-dark-slate group-hover:text-ocean-blue transition-colors mb-2">
                              {beach.name}
                            </h3>
                          </div>
                          
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                            <div className="bg-gradient-to-r from-ocean-blue to-coral p-3 rounded-full">
                              <ArrowRight className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-dark-slate/70 mb-6 line-clamp-3 text-lg leading-relaxed">
                          {beach.description}
                        </p>
                        
                        {/* Experience Tags */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          {beach.vibe.slice(0, 3).map((vibe, vibeIndex) => {
                            const VibeIcon = getVibeIcon(vibe);
                            return (
                              <span
                                key={vibeIndex}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-light-ocean to-soft-coral text-ocean-blue rounded-full font-medium"
                              >
                                <VibeIcon className="w-4 h-4" />
                                <span>{vibe}</span>
                              </span>
                            );
                          })}
                        </div>
                        
                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2">
                          {beach.amenities.slice(0, 5).map((amenity, amenityIndex) => {
                            const AmenityIcon = getAmenityIcon(amenity);
                            return (
                              <span
                                key={amenityIndex}
                                className="flex items-center space-x-1 px-3 py-1 bg-white/60 text-dark-slate text-sm rounded-lg border border-white/40"
                              >
                                <AmenityIcon className="w-3 h-3" />
                                <span>{amenity}</span>
                              </span>
                            );
                          })}
                          {beach.amenities.length > 5 && (
                            <span className="px-3 py-1 bg-white/60 text-dark-slate text-sm rounded-lg border border-white/40">
                              +{beach.amenities.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                <div className="h-[700px]">
                  <InteractiveMap
                    beaches={filteredBeaches}
                    onBeachSelect={handleBeachSelect}
                    selectedBeach={selectedBeach}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;