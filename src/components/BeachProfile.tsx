import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star, MapPin, Thermometer, Calendar, Shield, Users, Waves, Car, Navigation, Camera, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Beach, ContentBeach } from '../types/Content';

interface BeachProfileProps {
  beach: Beach;
  onWriteReview: () => void;
}

const BeachProfile: React.FC<BeachProfileProps> = ({ beach, onWriteReview }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'photos' | 'guide' | 'directions'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MapPin },
    { id: 'reviews', label: `Reviews (${beach.reviewCount})`, icon: Star },
    { id: 'photos', label: 'Photos & Videos', icon: Camera },
    { id: 'guide', label: 'Know Before You Go', icon: Shield },
    { id: 'directions', label: 'Getting There', icon: Navigation }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % beach.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + beach.images.length) % beach.images.length);
  };

  return (
    <div className="min-h-screen pt-8">
      <Helmet>
        <title>{beach.name} - Pantai.my</title>
        <meta name="description" content={beach.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Beach',
            name: beach.name,
            description: beach.description,
            image: beach.images[0],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: beach.rating,
              reviewCount: beach.reviewCount,
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: beach.location,
              addressRegion: beach.state,
              addressCountry: 'Malaysia',
            },
          })}
        </script>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Gallery */}
        <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
          <img
            src={beach.images[currentImageIndex]}
            alt={beach.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/60 via-transparent to-transparent"></div>
          
          {/* Image Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-dark-slate" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-dark-slate" />
          </button>
          
          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {beach.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Beach Title Overlay */}
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
              {beach.name}
            </h1>
            <div className="flex items-center space-x-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{beach.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-ocean-blue text-ocean-blue bg-light-ocean/30'
                        : 'border-transparent text-dark-slate/70 hover:text-dark-slate hover:border-gray-300'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-playfair font-semibold text-dark-slate mb-4">
                      About {beach.name}
                    </h2>
                    <p className="text-dark-slate/80 text-lg leading-relaxed">
                      {beach.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {beach.activities.map((activity, index) => (
                          <span
                            key={index}
                            className="flex items-center space-x-1 px-3 py-2 bg-light-ocean text-ocean-blue rounded-lg"
                          >
                            <Waves className="w-4 h-4" />
                            <span>{activity}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {beach.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-dark-slate rounded-lg"
                          >
                            <Car className="w-4 h-4" />
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">Vibe</h3>
                    <div className="flex flex-wrap gap-2">
                      {beach.vibe.map((vibe, index) => (
                        <span
                          key={index}
                          className="flex items-center space-x-1 px-4 py-2 bg-soft-coral text-coral rounded-full font-medium"
                        >
                          <Users className="w-4 h-4" />
                          <span>{vibe}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-playfair font-semibold text-dark-slate">
                      Reviews & Ratings
                    </h2>
                    <button
                      onClick={onWriteReview}
                      className="bg-ocean-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-ocean-blue/90 transition-colors"
                    >
                      Write Review
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-light-ocean rounded-xl">
                      <div className="text-4xl font-playfair font-bold text-ocean-blue mb-2">
                        {beach.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(beach.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-dark-slate/70">Overall Rating</div>
                    </div>
                    
                    <div className="text-center p-6 bg-soft-coral rounded-xl">
                      <div className="text-4xl font-playfair font-bold text-coral mb-2">
                        {beach.reviewCount}
                      </div>
                      <div className="text-dark-slate/70">Total Reviews</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                      <div className="text-4xl font-playfair font-bold text-dark-slate mb-2">
                        {beach.safetyRating}/5
                      </div>
                      <div className="text-dark-slate/70">Safety Rating</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {beach.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-dark-slate">{review.author}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-dark-slate/70">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <h5 className="font-medium text-dark-slate mb-2">{review.title}</h5>
                        <p className="text-dark-slate/80">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'photos' && (
                <div>
                  <h2 className="text-2xl font-playfair font-semibold text-dark-slate mb-6">
                    Photos & Videos
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {beach.images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image}
                          alt={`${beach.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'guide' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-playfair font-semibold text-dark-slate">
                    Know Before You Go
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">
                        What to Bring
                      </h3>
                      <ul className="space-y-2">
                        {beach.knowBeforeYouGo.whatToBring.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-ocean-blue rounded-full"></div>
                            <span className="text-dark-slate/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">
                        Safety Tips
                      </h3>
                      <ul className="space-y-2">
                        {beach.knowBeforeYouGo.safety.map((tip, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-coral rounded-full"></div>
                            <span className="text-dark-slate/80">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">
                      Local Tips
                    </h3>
                    <ul className="space-y-2">
                      {beach.knowBeforeYouGo.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                          <span className="text-dark-slate/80">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'directions' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-playfair font-semibold text-dark-slate">
                    Getting There
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-light-ocean p-6 rounded-xl">
                      <div className="flex items-center space-x-2 mb-4">
                        <Car className="w-6 h-6 text-ocean-blue" />
                        <h3 className="text-xl font-playfair font-semibold text-dark-slate">By Car</h3>
                      </div>
                      <p className="text-dark-slate/80 mb-4">{beach.gettingThere.bycar}</p>
                      <div className="bg-white/50 p-3 rounded-lg">
                        <h4 className="font-semibold text-dark-slate mb-2">Parking</h4>
                        <p className="text-dark-slate/80 text-sm">{beach.gettingThere.parking}</p>
                      </div>
                    </div>
                    
                    <div className="bg-soft-coral p-6 rounded-xl">
                      <div className="flex items-center space-x-2 mb-4">
                        <Navigation className="w-6 h-6 text-coral" />
                        <h3 className="text-xl font-playfair font-semibold text-dark-slate">Public Transport</h3>
                      </div>
                      <p className="text-dark-slate/80">{beach.gettingThere.byPublicTransport}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Info Sidebar */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              {/* Quick Info */}
              <div>
                <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-dark-slate">Rating</span>
                    </div>
                    <span className="font-semibold">{beach.rating}/5</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-5 h-5 text-ocean-blue" />
                      <span className="text-dark-slate">Water Temp</span>
                    </div>
                    <span className="font-semibold">{beach.waterTemp}°C</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-coral" />
                      <span className="text-dark-slate">Best Season</span>
                    </div>
                    <span className="font-semibold">{beach.bestSeason}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span className="text-dark-slate">Safety</span>
                    </div>
                    <span className="font-semibold">{beach.safetyRating}/5</span>
                  </div>
                </div>
              </div>

              {/* Nearby Hotels */}
              <div>
                <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">Nearby Hotels</h3>
                <div className="space-y-3">
                  {beach.nearbyHotels.slice(0, 3).map((hotel, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-slate text-sm">{hotel.name}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-dark-slate/70">{hotel.rating}</span>
                          </div>
                          <span className="text-xs font-semibold text-ocean-blue">{hotel.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 text-ocean-blue font-semibold hover:text-ocean-blue/80 transition-colors flex items-center justify-center space-x-1">
                  <span>View All Hotels</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Local Tours */}
              <div>
                <h3 className="text-xl font-playfair font-semibold text-dark-slate mb-4">Local Tours</h3>
                <div className="space-y-3">
                  {beach.tours.slice(0, 2).map((tour, index) => (
                    <div key={index} className="p-3 bg-light-ocean rounded-lg">
                      <h4 className="font-semibold text-dark-slate text-sm mb-1">{tour.name}</h4>
                      <p className="text-xs text-dark-slate/70 mb-2">{tour.provider}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-dark-slate/70">{tour.duration}</span>
                        <span className="text-sm font-semibold text-ocean-blue">{tour.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 text-ocean-blue font-semibold hover:text-ocean-blue/80 transition-colors flex items-center justify-center space-x-1">
                  <span>View All Tours</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeachProfile;