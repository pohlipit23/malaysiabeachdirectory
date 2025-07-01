import { ContentData, ContentBeach, Beach } from '../types/Content';
import contentData from '../data/content.json';

// Load and parse content data
const getContentData = (): ContentData => {
  return contentData as ContentData;
};

// Get all beaches from content data
const getAllContentBeaches = (): ContentBeach[] => {
  const data = getContentData();
  const beaches: ContentBeach[] = [];
  
  data.country.states.forEach(state => {
    state.districts.forEach(district => {
      district.cities.forEach(city => {
        beaches.push(...city.beaches);
      });
    });
  });
  
  return beaches;
};

// Transform content beach to UI beach format
const transformBeachForUI = (contentBeach: ContentBeach): Beach => {
  // Generate mock data for fields not in content.json
  const mockRating = 4.2 + Math.random() * 0.8; // Random rating between 4.2-5.0
  const mockReviewCount = Math.floor(Math.random() * 500) + 50; // Random reviews 50-550
  const mockWaterTemp = 26 + Math.floor(Math.random() * 4); // 26-29°C
  const mockSafetyRating = Math.floor(Math.random() * 2) + 4; // 4-5
  
  // Determine best season based on location
  const getBestSeason = (state: string): string => {
    const eastCoastStates = ['Pahang', 'Terengganu', 'Kelantan'];
    return eastCoastStates.includes(state) ? 'Mar - Oct' : 'Nov - Apr';
  };

  // Generate mock nearby hotels
  const generateMockHotels = (beachName: string) => [
    {
      name: `${beachName} Resort`,
      rating: 4.2 + Math.random() * 0.6,
      price: `From RM${Math.floor(Math.random() * 200) + 200}/night`,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
    },
    {
      name: `Seaside ${beachName} Hotel`,
      rating: 4.0 + Math.random() * 0.8,
      price: `From RM${Math.floor(Math.random() * 150) + 150}/night`,
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
    }
  ];

  // Generate mock tours
  const generateMockTours = () => [
    {
      name: 'Island Hopping Adventure',
      provider: 'Local Tours',
      price: `RM${Math.floor(Math.random() * 50) + 50}/person`,
      duration: `${Math.floor(Math.random() * 4) + 4} hours`
    },
    {
      name: 'Snorkeling Experience',
      provider: 'Marine Adventures',
      price: `RM${Math.floor(Math.random() * 80) + 70}/person`,
      duration: `${Math.floor(Math.random() * 2) + 3} hours`
    }
  ];

  // Generate mock reviews
  const generateMockReviews = () => [
    {
      id: '1',
      author: 'Sarah Chen',
      rating: 5,
      date: '2024-10-15',
      title: 'Absolutely stunning!',
      content: contentBeach.sub_headline
    },
    {
      id: '2',
      author: 'Marcus Johnson',
      rating: 4,
      date: '2024-09-28',
      title: 'Great experience',
      content: 'Beautiful beach with excellent facilities. Highly recommended for families.'
    }
  ];

  return {
    id: contentBeach.id,
    name: contentBeach.name,
    location: `${contentBeach.location.city}, ${contentBeach.location.state}`,
    state: contentBeach.location.state,
    description: contentBeach.detailed_description,
    rating: Math.round(mockRating * 10) / 10,
    reviewCount: mockReviewCount,
    images: contentBeach.images.map(img => img.url),
    amenities: contentBeach.attributes.amenities,
    activities: contentBeach.attributes.activities,
    vibe: contentBeach.attributes.best_for,
    accessibility: ['Easy Access', 'Public Transport'],
    waterTemp: mockWaterTemp,
    bestSeason: getBestSeason(contentBeach.location.state),
    safetyRating: mockSafetyRating,
    coordinates: {
      lat: contentBeach.geolocation.latitude,
      lng: contentBeach.geolocation.longitude
    },
    nearbyHotels: generateMockHotels(contentBeach.name),
    tours: generateMockTours(),
    reviews: generateMockReviews(),
    gettingThere: {
      bycar: `Drive to ${contentBeach.location.city} and follow signs to ${contentBeach.name}. Parking available nearby.`,
      byPublicTransport: `Take public transport to ${contentBeach.location.city}, then local transport to the beach.`,
      parking: 'Public parking available. Fees may apply during peak seasons.'
    },
    knowBeforeYouGo: {
      whatToBring: [
        'Sunscreen and hat',
        'Swimming gear',
        'Camera for photos',
        'Cash for local purchases',
        'Comfortable beach shoes'
      ],
      safety: [
        'Follow local safety guidelines',
        'Be aware of tide conditions',
        'Stay hydrated',
        'Respect marine life',
        'Keep valuables secure'
      ],
      tips: [
        'Visit early morning for fewer crowds',
        'Try local food specialties',
        'Respect local customs and environment',
        'Check weather conditions before visiting',
        'Bring reef-safe sunscreen'
      ]
    }
  };
};

// Get all beaches
export const getAllBeaches = (): Beach[] => {
  const contentBeaches = getAllContentBeaches();
  return contentBeaches.map(transformBeachForUI);
};

// Get beaches by state
const getBeachesByState = (stateName: string): Beach[] => {
  const allBeaches = getAllBeaches();
  return allBeaches.filter(beach => beach.state === stateName);
};

// Get beach by ID
const getBeachById = (id: string): Beach | null => {
  const allBeaches = getAllBeaches();
  return allBeaches.find(beach => beach.id === id) || null;
};

// Search beaches
export const searchBeaches = (query: string): Beach[] => {
  const allBeaches = getAllBeaches();
  const lowercaseQuery = query.toLowerCase();
  
  return allBeaches.filter(beach => 
    beach.name.toLowerCase().includes(lowercaseQuery) ||
    beach.state.toLowerCase().includes(lowercaseQuery) ||
    beach.location.toLowerCase().includes(lowercaseQuery) ||
    beach.description.toLowerCase().includes(lowercaseQuery) ||
    beach.activities.some(activity => 
      activity.toLowerCase().includes(lowercaseQuery)
    ) ||
    beach.vibe.some(vibe => 
      vibe.toLowerCase().includes(lowercaseQuery)
    )
  );
};

// Get all unique states
export const getAllStates = (): string[] => {
  const data = getContentData();
  const states = new Set<string>();
  
  data.country.states.forEach(state => {
    states.add(state.name);
  });
  
  return Array.from(states).sort();
};

// Get all unique cities
const getAllCities = (): string[] => {
  const data = getContentData();
  const cities = new Set<string>();
  
  data.country.states.forEach(state => {
    state.districts.forEach(district => {
      district.cities.forEach(city => {
        cities.add(city.name);
      });
    });
  });
  
  return Array.from(cities).sort();
};

// Get beaches by city
const getBeachesByCity = (cityName: string): Beach[] => {
  const allBeaches = getAllBeaches();
  return allBeaches.filter(beach => 
    beach.location.toLowerCase().includes(cityName.toLowerCase())
  );
};

// Get all unique activities
export const getAllActivities = (): string[] => {
  const contentBeaches = getAllContentBeaches();
  const activities = new Set<string>();
  
  contentBeaches.forEach(beach => {
    beach.attributes.activities.forEach(activity => activities.add(activity));
  });
  
  return Array.from(activities).sort();
};

// Get all unique amenities
export const getAllAmenities = (): string[] => {
  const contentBeaches = getAllContentBeaches();
  const amenities = new Set<string>();
  
  contentBeaches.forEach(beach => {
    beach.attributes.amenities.forEach(amenity => amenities.add(amenity));
  });
  
  return Array.from(amenities).sort();
};

// Get featured beaches (top rated beaches from each state)
export const getFeaturedBeaches = (): Beach[] => {
  const allBeaches = getAllBeaches();
  const stateGroups = new Map<string, Beach[]>();
  
  // Group beaches by state
  allBeaches.forEach(beach => {
    if (!stateGroups.has(beach.state)) {
      stateGroups.set(beach.state, []);
    }
    stateGroups.get(beach.state)!.push(beach);
  });
  
  const featured: Beach[] = [];
  
  // Get top 2 highest rated beaches from each state
  stateGroups.forEach(beaches => {
    const sortedBeaches = beaches.sort((a, b) => b.rating - a.rating);
    featured.push(...sortedBeaches.slice(0, 2));
  });
  
  return featured;
};

// Get beaches by coordinates (for map clustering)
const getBeachesByBounds = (
  northEast: { lat: number; lng: number },
  southWest: { lat: number; lng: number }
): Beach[] => {
  const allBeaches = getAllBeaches();
  
  return allBeaches.filter(beach => 
    beach.coordinates.lat <= northEast.lat &&
    beach.coordinates.lat >= southWest.lat &&
    beach.coordinates.lng <= northEast.lng &&
    beach.coordinates.lng >= southWest.lng
  );
};

// Get statistics
const getDatasetStatistics = () => {
  const allBeaches = getAllBeaches();
  const states = getAllStates();
  const cities = getAllCities();
  
  const totalReviews = allBeaches.reduce((sum, beach) => sum + beach.reviewCount, 0);
  const averageRating = allBeaches.reduce((sum, beach) => sum + beach.rating, 0) / allBeaches.length;
  
  return {
    totalBeaches: allBeaches.length,
    totalStates: states.length,
    totalCities: cities.length,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10
  };
};