import { ContentData, ContentBeach, Beach } from '../types/Content';
import contentData from '../data/content.json';
import beachDataset from '../beach_dataset.json';

// Beach dataset interface
interface BeachDatasetItem {
  id: string;
  name: string;
  state: string;
  city: string;
  description: string;
  lat: number;
  lng: number;
  images: string[];
  activities: string[];
  amenities: string[];
  vibe: string[];
  rating: number;
  reviewCount: number;
  waterTemp: number;
  bestSeason: string;
  safetyRating: number;
  accessibility: string[];
  nearbyHotels: Array<{
    name: string;
    rating: number;
    price: string;
    image: string;
  }>;
  tours: Array<{
    name: string;
    provider: string;
    price: string;
    duration: string;
  }>;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    images?: string[];
  }>;
  gettingThere: {
    bycar: string;
    byPublicTransport: string;
    parking: string;
  };
  knowBeforeYouGo: {
    whatToBring: string[];
    safety: string[];
    tips: string[];
  };
}

// Load beach dataset
export const getBeachDataset = (): BeachDatasetItem[] => {
  return beachDataset as BeachDatasetItem[];
};

// Transform beach dataset item to UI beach format
export const transformDatasetBeachForUI = (datasetBeach: BeachDatasetItem): Beach => {
  return {
    id: datasetBeach.id,
    name: datasetBeach.name,
    location: `${datasetBeach.city}, ${datasetBeach.state}`,
    state: datasetBeach.state,
    description: datasetBeach.description,
    rating: datasetBeach.rating,
    reviewCount: datasetBeach.reviewCount,
    images: datasetBeach.images,
    amenities: datasetBeach.amenities,
    activities: datasetBeach.activities,
    vibe: datasetBeach.vibe,
    accessibility: datasetBeach.accessibility,
    waterTemp: datasetBeach.waterTemp,
    bestSeason: datasetBeach.bestSeason,
    safetyRating: datasetBeach.safetyRating,
    coordinates: {
      lat: datasetBeach.lat,
      lng: datasetBeach.lng
    },
    nearbyHotels: datasetBeach.nearbyHotels,
    tours: datasetBeach.tours,
    reviews: datasetBeach.reviews,
    gettingThere: datasetBeach.gettingThere,
    knowBeforeYouGo: datasetBeach.knowBeforeYouGo
  };
};

// Load and parse content data (keeping for backward compatibility)
export const getContentData = (): ContentData => {
  return contentData as ContentData;
};

// Get all beaches from dataset
export const getAllBeaches = (): Beach[] => {
  const dataset = getBeachDataset();
  return dataset.map(transformDatasetBeachForUI);
};

// Get all beaches from original content data (for fallback)
export const getAllContentBeaches = (): ContentBeach[] => {
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

// Transform content beach to UI beach format (keeping for backward compatibility)
export const transformBeachForUI = (contentBeach: ContentBeach): Beach => {
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

// Get beaches by state from dataset
export const getBeachesByState = (stateName: string): Beach[] => {
  const dataset = getBeachDataset();
  return dataset
    .filter(beach => beach.state === stateName)
    .map(transformDatasetBeachForUI);
};

// Get beach by ID from dataset
export const getBeachById = (id: string): Beach | null => {
  const dataset = getBeachDataset();
  const beach = dataset.find(beach => beach.id === id);
  return beach ? transformDatasetBeachForUI(beach) : null;
};

// Search beaches in dataset
export const searchBeaches = (query: string): Beach[] => {
  const dataset = getBeachDataset();
  const lowercaseQuery = query.toLowerCase();
  
  const filteredBeaches = dataset.filter(beach => 
    beach.name.toLowerCase().includes(lowercaseQuery) ||
    beach.state.toLowerCase().includes(lowercaseQuery) ||
    beach.city.toLowerCase().includes(lowercaseQuery) ||
    beach.description.toLowerCase().includes(lowercaseQuery) ||
    beach.activities.some(activity => 
      activity.toLowerCase().includes(lowercaseQuery)
    ) ||
    beach.vibe.some(vibe => 
      vibe.toLowerCase().includes(lowercaseQuery)
    )
  );
  
  return filteredBeaches.map(transformDatasetBeachForUI);
};

// Get all unique states from dataset
export const getAllStates = (): string[] => {
  const dataset = getBeachDataset();
  const states = new Set<string>();
  
  dataset.forEach(beach => {
    states.add(beach.state);
  });
  
  return Array.from(states).sort();
};

// Get all unique cities from dataset
export const getAllCities = (): string[] => {
  const dataset = getBeachDataset();
  const cities = new Set<string>();
  
  dataset.forEach(beach => {
    cities.add(beach.city);
  });
  
  return Array.from(cities).sort();
};

// Get beaches by city from dataset
export const getBeachesByCity = (cityName: string): Beach[] => {
  const dataset = getBeachDataset();
  return dataset
    .filter(beach => beach.city.toLowerCase() === cityName.toLowerCase())
    .map(transformDatasetBeachForUI);
};

// Get all unique activities from dataset
export const getAllActivities = (): string[] => {
  const dataset = getBeachDataset();
  const activities = new Set<string>();
  
  dataset.forEach(beach => {
    beach.activities.forEach(activity => activities.add(activity));
  });
  
  return Array.from(activities).sort();
};

// Get all unique amenities from dataset
export const getAllAmenities = (): string[] => {
  const dataset = getBeachDataset();
  const amenities = new Set<string>();
  
  dataset.forEach(beach => {
    beach.amenities.forEach(amenity => amenities.add(amenity));
  });
  
  return Array.from(amenities).sort();
};

// Get featured beaches from dataset (top rated beaches from each state)
export const getFeaturedBeaches = (): Beach[] => {
  const dataset = getBeachDataset();
  const stateGroups = new Map<string, BeachDatasetItem[]>();
  
  // Group beaches by state
  dataset.forEach(beach => {
    if (!stateGroups.has(beach.state)) {
      stateGroups.set(beach.state, []);
    }
    stateGroups.get(beach.state)!.push(beach);
  });
  
  const featured: BeachDatasetItem[] = [];
  
  // Get top 2 highest rated beaches from each state
  stateGroups.forEach(beaches => {
    const sortedBeaches = beaches.sort((a, b) => b.rating - a.rating);
    featured.push(...sortedBeaches.slice(0, 2));
  });
  
  return featured.map(transformDatasetBeachForUI);
};

// Get beaches by coordinates (for map clustering)
export const getBeachesByBounds = (
  northEast: { lat: number; lng: number },
  southWest: { lat: number; lng: number }
): Beach[] => {
  const dataset = getBeachDataset();
  
  return dataset
    .filter(beach => 
      beach.lat <= northEast.lat &&
      beach.lat >= southWest.lat &&
      beach.lng <= northEast.lng &&
      beach.lng >= southWest.lng
    )
    .map(transformDatasetBeachForUI);
};

// Get statistics from dataset
export const getDatasetStatistics = () => {
  const dataset = getBeachDataset();
  const states = getAllStates();
  const cities = getAllCities();
  
  const totalReviews = dataset.reduce((sum, beach) => sum + beach.reviewCount, 0);
  const averageRating = dataset.reduce((sum, beach) => sum + beach.rating, 0) / dataset.length;
  
  return {
    totalBeaches: dataset.length,
    totalStates: states.length,
    totalCities: cities.length,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10
  };
};