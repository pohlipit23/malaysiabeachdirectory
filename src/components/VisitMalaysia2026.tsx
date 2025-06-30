import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Star, 
  Users, 
  Camera, 
  ArrowRight, 
  Globe, 
  Heart,
  Compass,
  Plane,
  Ship,
  Train,
  Car,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface VisitMalaysia2026Props {
  onBeachSelect?: (beachName: string) => void;
}

const VisitMalaysia2026: React.FC<VisitMalaysia2026Props> = ({ onBeachSelect }) => {
  const [activeDestination, setActiveDestination] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Official VM2026 color palette
  const vm2026Colors = {
    primary: '#2054A3',
    red: '#EB2226', 
    teal: '#03B1A8',
    yellow: '#FBBE14',
    purple: '#66308D',
    navy: '#213E7C',
    green: '#8EC440',
    darkRed: '#CA2029'
  };

  const destinations = [
    {
      id: 'langkawi',
      name: 'Langkawi, Kedah',
      slogan: 'World-renowned Langkawi beckons with sun-kissed beaches, clear blue skies and the marvels of nature.',
      image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
      highlights: ['99 Islands Archipelago', 'Duty-Free Shopping', 'Cable Car Adventures', 'Marine Parks'],
      beaches: ['Pantai Cenang', 'Tanjung Rhu Beach', 'Datai Beach']
    },
    {
      id: 'penang',
      name: 'Penang',
      slogan: 'Lovely beach resorts, old-world charm and colourful cultures give Penang its allure.',
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      highlights: ['UNESCO World Heritage', 'Street Art Capital', 'Culinary Paradise', 'Cultural Diversity'],
      beaches: ['Batu Ferringhi', 'Tanjung Bungah', 'Monkey Beach']
    },
    {
      id: 'tioman',
      name: 'Tioman, Pahang',
      slogan: 'Hailed as one of the best island getaways in the world, Tioman is famed as the setting for "Bali Hai".',
      image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg',
      highlights: ['Marine Park Paradise', 'Diving Excellence', 'Pristine Nature', 'Dragon Legend'],
      beaches: ['Juara Beach', 'Salang Beach', 'Tekek Beach']
    },
    {
      id: 'terengganu',
      name: 'Islands of Terengganu',
      slogan: 'Blessed with captivating island retreats of soft white sand and breathtaking blue waters.',
      image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
      highlights: ['Crystal Clear Waters', 'Coral Gardens', 'Island Hopping', 'Traditional Culture'],
      beaches: ['Redang Island', 'Perhentian Islands', 'Lang Tengah']
    }
  ];

  const campaignStats = [
    { number: '2026', label: 'Visit Malaysia Year', description: 'A year-long celebration of Malaysian tourism' },
    { number: '4,800km', label: 'Coastline', description: 'Of pristine beaches and islands' },
    { number: '99', label: 'Langkawi Islands', description: 'Each with unique natural wonders' },
    { number: '13', label: 'States', description: 'Each offering distinct experiences' }
  ];

  const handleBeachExplore = (beachName: string) => {
    if (onBeachSelect) {
      onBeachSelect(beachName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sandy-beige">
      {/* Hero Section with VM2026 Branding */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-400/20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-red-400/20 to-yellow-400/20 blur-xl"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          {/* VM2026 Logo */}
          <div className="mb-12">
            <img 
              src="/faVMTA2026_Logo_CMYK_revNov2024.png" 
              alt="Visit Malaysia 2026 - Truly Asia" 
              className="h-32 md:h-40 mx-auto mb-8"
            />
          </div>

          {/* Campaign Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: vm2026Colors.primary }}>
              <span className="block font-playfair">Discover Asia's Best</span>
              <span className="block text-4xl md:text-6xl" style={{ color: vm2026Colors.red }}>
                In One Extraordinary Destination
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-dark-slate/80 max-w-4xl mx-auto leading-relaxed">
              Malaysia, a land of friendly people and a nation blessed with natural wonders, welcomes you. 
              With 4,800km of coastline, Malaysia boasts some of the most beautiful islands and beaches in Asia.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${vm2026Colors.primary}, ${vm2026Colors.teal})` }}
            >
              <span className="flex items-center space-x-2">
                <Compass className="w-6 h-6" />
                <span>Explore Destinations</span>
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
            
            <button 
              onClick={() => window.open('https://www.malaysia.travel/page/visit-malaysia-2026', '_blank')}
              className="px-8 py-4 border-2 font-bold rounded-2xl transition-all duration-300 hover:shadow-lg"
              style={{ 
                borderColor: vm2026Colors.red, 
                color: vm2026Colors.red,
                backgroundColor: 'transparent'
              }}
            >
              <span className="flex items-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span>Official Campaign Site</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Campaign Statistics */}
      <section className="py-20 px-4" style={{ backgroundColor: vm2026Colors.primary }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {campaignStats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl md:text-6xl font-playfair font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-sm opacity-90">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-8" style={{ color: vm2026Colors.primary }}>
              Surreal Experiences Await
            </h2>
            <p className="text-xl text-dark-slate/70 max-w-3xl mx-auto">
              From mystical islands to pristine shores, each destination offers unique wonders that embody the true spirit of Asia
            </p>
          </div>

          <div className="space-y-16">
            {destinations.map((destination, index) => (
              <div
                key={destination.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
              >
                {/* Image Side */}
                <div className="lg:w-1/2 relative group">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/60 via-transparent to-transparent"></div>
                    
                    {/* Floating Badge */}
                    <div 
                      className="absolute top-6 right-6 px-4 py-2 rounded-full text-white font-bold text-sm"
                      style={{ backgroundColor: vm2026Colors.red }}
                    >
                      VM2026 Featured
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-playfair font-bold mb-4" style={{ color: vm2026Colors.primary }}>
                      {destination.name}
                    </h3>
                    <p className="text-xl text-dark-slate/80 leading-relaxed italic mb-6">
                      "{destination.slogan}"
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: vm2026Colors.teal }}
                        ></div>
                        <span className="text-dark-slate font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Beach Links */}
                  <div>
                    <h4 className="font-bold text-dark-slate mb-4">Discover These Beaches:</h4>
                    <div className="flex flex-wrap gap-3">
                      {destination.beaches.map((beach, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleBeachExplore(beach)}
                          className="px-4 py-2 rounded-full border-2 transition-all duration-300 hover:shadow-lg"
                          style={{ 
                            borderColor: vm2026Colors.yellow,
                            color: vm2026Colors.primary,
                            backgroundColor: 'transparent'
                          }}
                        >
                          {beach}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleBeachExplore(destination.name)}
                    className="group px-8 py-4 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    style={{ background: `linear-gradient(135deg, ${vm2026Colors.red}, ${vm2026Colors.yellow})` }}
                  >
                    <span className="flex items-center space-x-3">
                      <span>Explore {destination.name}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Malaysia at a Glance */}
      <section className="py-32 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-8" style={{ color: vm2026Colors.primary }}>
              Malaysia at a Glance
            </h2>
            <p className="text-xl text-dark-slate/70 max-w-3xl mx-auto">
              Essential information for your Malaysian adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Geography',
                content: 'Lying 2 to 7º north of the Equator, Malaysia comprises Peninsular Malaysia and the states of Sabah and Sarawak in Borneo.',
                color: vm2026Colors.teal
              },
              {
                icon: Users,
                title: 'Population',
                content: '33.4 million people representing diverse cultures: Malays, Chinese, Indians, and indigenous communities.',
                color: vm2026Colors.purple
              },
              {
                icon: Heart,
                title: 'Climate',
                content: 'Tropical climate with warm weather year-round. Temperatures range from 21°C to 32°C.',
                color: vm2026Colors.red
              },
              {
                icon: Plane,
                title: 'Getting There',
                content: 'KLIA serves as the main gateway with over 40 international airlines. Other airports in Langkawi, Penang, and more.',
                color: vm2026Colors.navy
              },
              {
                icon: MapPin,
                title: 'Currency',
                content: 'Malaysian Ringgit (RM/MYR). Credit cards and e-wallets widely accepted.',
                color: vm2026Colors.green
              },
              {
                icon: Calendar,
                title: 'Best Time',
                content: 'Year-round destination. West coast: Nov-Apr, East coast: Mar-Oct for optimal weather.',
                color: vm2026Colors.yellow
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div 
                    className="p-3 rounded-2xl"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold" style={{ color: vm2026Colors.primary }}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-dark-slate/80 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Around Malaysia */}
      <section className="py-32 px-4" style={{ backgroundColor: vm2026Colors.primary }}>
        <div className="max-w-7xl mx-auto text-white">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-8">
              Getting Around Malaysia
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Malaysia offers excellent transportation options to explore every corner of this beautiful country
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Plane,
                title: 'By Air',
                description: 'Excellent domestic air links with Malaysia Airlines, AirAsia, Firefly, and Batik Air connecting all major destinations.',
                color: vm2026Colors.yellow
              },
              {
                icon: Train,
                title: 'By Rail',
                description: 'KTM provides comfortable train services connecting major cities with modern electronic trains and scenic routes.',
                color: vm2026Colors.teal
              },
              {
                icon: Car,
                title: 'By Road',
                description: 'Well-developed highway system with excellent roads. Car rentals and e-hailing services like Grab available.',
                color: vm2026Colors.green
              },
              {
                icon: Ship,
                title: 'By Sea',
                description: 'Ferry services connect islands and coastal areas. Luxury cruise lines also make stops at Malaysian ports.',
                color: vm2026Colors.red
              }
            ].map((transport, index) => (
              <div key={index} className="text-center group">
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: transport.color }}
                >
                  <transport.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-4">{transport.title}</h3>
                <p className="opacity-90 leading-relaxed">{transport.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-32 px-4 bg-gradient-to-b from-sandy-beige to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-8" style={{ color: vm2026Colors.primary }}>
              Plan Your Journey
            </h2>
            <p className="text-xl text-dark-slate/70 max-w-3xl mx-auto">
              Get in touch with Tourism Malaysia for personalized assistance and the latest information
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Head Office */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div 
                  className="p-3 rounded-2xl"
                  style={{ backgroundColor: `${vm2026Colors.primary}20` }}
                >
                  <MapPin className="w-8 h-8" style={{ color: vm2026Colors.primary }} />
                </div>
                <h3 className="text-2xl font-playfair font-bold" style={{ color: vm2026Colors.primary }}>
                  Tourism Malaysia Head Office
                </h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-dark-slate/80">
                  9th Floor, No. 2, Tower 1, Jalan P5/6, Precinct 5, 62200 Putrajaya, Malaysia
                </p>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" style={{ color: vm2026Colors.teal }} />
                  <span>+603 8891 8000</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" style={{ color: vm2026Colors.red }} />
                  <span>enquiries@tourism.gov.my</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5" style={{ color: vm2026Colors.yellow }} />
                  <a 
                    href="https://www.malaysia.travel" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: vm2026Colors.primary }}
                  >
                    www.malaysia.travel
                  </a>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-playfair font-bold mb-6" style={{ color: vm2026Colors.primary }}>
                Regional Offices
              </h3>
              
              <div className="space-y-6">
                {[
                  { region: 'Northern Region', location: 'Penang', phone: '604 261 0058' },
                  { region: 'Central Region', location: 'Kuala Lumpur', phone: '603 21610166' },
                  { region: 'Southern Region', location: 'Johor Bahru', phone: '607-222 3590' },
                  { region: 'East Coast Region', location: 'Kuantan', phone: '609 567 7112' }
                ].map((office, index) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: vm2026Colors.teal }}>
                    <h4 className="font-bold text-dark-slate">{office.region}</h4>
                    <p className="text-sm text-dark-slate/70">{office.location}</p>
                    <p className="text-sm" style={{ color: vm2026Colors.primary }}>{office.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-3xl p-12">
              <h3 className="text-3xl font-playfair font-bold mb-6" style={{ color: vm2026Colors.primary }}>
                Ready to Experience Malaysia?
              </h3>
              <p className="text-xl text-dark-slate/80 mb-8 max-w-2xl mx-auto">
                Start planning your Malaysian adventure today and discover why Malaysia is truly Asia's best destination.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.open('https://www.malaysia.travel', '_blank')}
                  className="px-8 py-4 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ background: `linear-gradient(135deg, ${vm2026Colors.primary}, ${vm2026Colors.teal})` }}
                >
                  <span className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Visit Official Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </button>
                
                <button 
                  onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border-2 font-bold rounded-2xl transition-all duration-300"
                  style={{ 
                    borderColor: vm2026Colors.red,
                    color: vm2026Colors.red,
                    backgroundColor: 'transparent'
                  }}
                >
                  <span className="flex items-center space-x-2">
                    <Compass className="w-5 h-5" />
                    <span>Explore More Destinations</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitMalaysia2026;