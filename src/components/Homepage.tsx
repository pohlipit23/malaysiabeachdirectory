import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, MapPin, Star, Users, Waves, Camera, ArrowRight, Play, ChevronDown, Map } from 'lucide-react';
import { getAllStates, getFeaturedBeaches, getAllBeaches } from '../utils/contentLoader';
import { Beach } from '../types/Content';
import InteractiveMap from './InteractiveMap';

interface HomepageProps {
  onSearch: (query: string) => void;
  onBeachSelect: (beach: Beach) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onSearch, onBeachSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [states, setStates] = useState<string[]>([]);
  const [featuredBeaches, setFeaturedBeaches] = useState<Beach[]>([]);
  const [allBeaches, setAllBeaches] = useState<Beach[]>([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const [heroImages, setHeroImages] = useState<Beach['images']>([]);

  useEffect(() => {
    setStates(getAllStates());
    const currentFeaturedBeaches = getFeaturedBeaches();
    setFeaturedBeaches(currentFeaturedBeaches);

    // Beautiful beach images for the hero carousel (no mountains)
    const currentHeroImages = currentFeaturedBeaches.flatMap(beach => beach.images).slice(0, 5);
    setHeroImages(currentHeroImages);
    
    // Load all beaches for the map
    const beaches = getAllBeaches();
    setAllBeaches(beaches);
    
    // Auto-rotate hero images
    if (currentHeroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % currentHeroImages.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleMapBeachSelect = (beach: Beach) => {
    setSelectedBeach(beach);
    onBeachSelect(beach);
  };

  const scrollToExplore = () => {
    document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Pantai.my - Discover Malaysia's Beaches</title>
        <meta
          name="description"
          content="Explore Malaysia's most beautiful beaches and plan your next getaway with Pantai.my."
        />
      </Helmet>
      {/* Immersive Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image Carousel */}
        {heroImages.length > 0 && (
          <>
            <div className="absolute inset-0">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-2000 ${
                    index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{ backgroundImage: `url(${image.url})` }}
                  />
                </div>
              ))}

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-slate/10 to-dark-slate/80"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-dark-slate/30 via-transparent to-dark-slate/30"></div>
            </div>

            {/* Floating Navigation Dots */}
            <div className="absolute top-8 right-8 flex space-x-2 z-20">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentHeroIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-5xl mx-auto">
            {/* Animated Title */}
            <div className="mb-8 space-y-4">
              <h1 className="text-6xl md:text-8xl font-playfair font-bold text-white leading-tight">
                <span className="block opacity-0 animate-[fadeInUp_1s_0.2s_forwards]">
                  Malaysia's
                </span>
                <span className="block text-coral opacity-0 animate-[fadeInUp_1s_0.6s_forwards]">
                  Hidden
                </span>
                <span className="block opacity-0 animate-[fadeInUp_1s_1s_forwards]">
                  Paradises
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1s_1.4s_forwards]">
                Discover untold stories of pristine shores, secret coves, and the souls of Malaysia's most extraordinary beaches
              </p>
            </div>

            {/* Cinematic Search */}
            <div className="opacity-0 animate-[fadeInUp_1s_1.8s_forwards]">
              <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto mb-12">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-ocean-blue/20 to-coral/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-2">
                    <div className="flex items-center">
                      <Search className="ml-6 text-white/70 w-6 h-6" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Where does your soul want to wander?"
                        className="flex-1 py-6 px-6 text-lg bg-transparent text-white placeholder-white/60 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-ocean-blue to-coral text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Begin Journey</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Scroll Indicator */}
              <button 
                onClick={scrollToExplore}
                className="group flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors"
              >
                <span className="text-sm font-medium tracking-wider uppercase">Explore Map Below</span>
                <ChevronDown className="w-6 h-6 animate-bounce group-hover:animate-pulse" />
              </button>
            </div>
          </div>
        </div>

        {/* Ambient Video Play Button */}
        <button className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-4 hover:bg-white/20 transition-all duration-300 group">
          <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </section>

      {/* Interactive Map Discovery Section */}
      <section id="explore-section" className="py-32 px-4 bg-gradient-to-b from-dark-slate to-dark-slate/95">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-8">
              Discover Your Paradise
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Explore Malaysia's stunning coastline through our interactive map. Click on any beach to uncover its secrets, or zoom in to discover hidden gems in your favorite regions.
            </p>
          </div>

          {/* Map Container */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                <InteractiveMap
                  beaches={allBeaches}
                  onBeachSelect={handleMapBeachSelect}
                  selectedBeach={selectedBeach}
                />
              </div>
            </div>

            {/* Map Features */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-gradient-to-r from-ocean-blue to-coral p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-white mb-2">Interactive Exploration</h3>
                <p className="text-white/70">Click and zoom to discover beaches across Malaysia's diverse coastline</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-coral to-ocean-blue p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-white mb-2">Rich Beach Profiles</h3>
                <p className="text-white/70">Each pin reveals stunning photos, activities, and insider tips</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-ocean-blue to-coral p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-playfair font-bold text-white mb-2">Curated Experiences</h3>
                <p className="text-white/70">Discover ratings, reviews, and recommendations from fellow travelers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive State Grid */}
      <section className="py-32 px-4 bg-gradient-to-b from-sandy-beige to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold text-dark-slate mb-8">
              Explore by Region
            </h2>
            <p className="text-xl text-dark-slate/70 max-w-3xl mx-auto">
              From the mystical islands of Langkawi to the pristine shores of Tioman, every state holds treasures waiting to be discovered
            </p>
          </div>

          {/* Interactive State Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {states.map((state, index) => {
                const stateBeaches = allBeaches.filter(beach => beach.state === state);
                return (
                  <button
                    key={index}
                    onClick={() => onSearch(state)}
                    className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-light-ocean/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-gradient-to-r from-ocean-blue to-coral p-3 rounded-2xl">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-dark-slate/30 group-hover:text-coral transition-colors">
                          {stateBeaches.length}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-playfair font-bold text-dark-slate mb-2 group-hover:text-ocean-blue transition-colors">
                        {state}
                      </h3>
                      
                      <p className="text-sm text-dark-slate/60 group-hover:text-dark-slate/80 transition-colors">
                        {stateBeaches.length} hidden gems
                      </p>
                      
                      {/* Hover Arrow */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="w-5 h-5 text-coral" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Stats */}
      <section className="py-32 px-4 bg-gradient-to-r from-dark-slate via-ocean-blue to-dark-slate">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { 
                number: `${allBeaches.length}+`, 
                label: "Beaches Documented",
                description: "Each one personally explored and verified"
              },
              { 
                number: `${allBeaches.reduce((sum, beach) => sum + beach.reviewCount, 0)}+`, 
                label: "Authentic Stories",
                description: "Real experiences from fellow travelers"
              },
              { 
                number: "95%", 
                label: "Accuracy Promise",
                description: "Information you can trust completely"
              },
              { 
                number: "∞", 
                label: "Memories Created",
                description: "Countless moments of pure bliss"
              }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-6xl md:text-7xl font-playfair font-bold text-white mb-4 group-hover:text-coral transition-colors duration-500">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-white/90 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-white/60 leading-relaxed">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;