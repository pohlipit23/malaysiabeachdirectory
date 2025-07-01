import { ContentData, ContentBeach, Beach } from '../types/Content';
import contentData from '../data/content.json' assert { type: 'json' };

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
        if (city.beaches) {
          city.beaches.forEach(beach => {
            if (beach.images && beach.images.length > 0) {
              beaches.push(beach);
            }
          });
        }
      });
    });
  });
  
  return beaches;
};

// Transform content beach to UI beach format
const transformBeachForUI = (contentBeach: ContentBeach): Beach => {
  const safeGet = (obj: any, path: string, defaultValue: any) => {
    const result = path.split('.').reduce((acc: any, key: string) => {
      if (typeof acc === 'undefined' || typeof acc[key] === 'undefined') {
        return undefined;
      }
      return acc[key];
    }, obj);
    return typeof result === 'undefined' ? defaultValue : result;
  };

  return {
    id: contentBeach.id,
    name: contentBeach.name,
    location: `${safeGet(contentBeach, 'location.city', '')}, ${safeGet(contentBeach, 'location.state', '')}`,
    state: safeGet(contentBeach, 'location.state', ''),
    description: contentBeach.detailed_description,
    rating: safeGet(contentBeach, 'user_content.ratings.average', 0),
    reviewCount: safeGet(contentBeach, 'user_content.ratings.count', 0),
    images: (contentBeach.images || []).map(img => img.url),
    amenities: safeGet(contentBeach, 'attributes.amenities', []),
    activities: safeGet(contentBeach, 'attributes.activities', []),
    vibe: safeGet(contentBeach, 'attributes.best_for', []),
    accessibility: [], // This information is not in content.json
    waterTemp: 0, // This information is not in content.json
    bestSeason: '', // This information is not in content.json
    safetyRating: 0, // This information is not in content.json
    coordinates: {
      lat: safeGet(contentBeach, 'geolocation.latitude', 0),
      lng: safeGet(contentBeach, 'geolocation.longitude', 0)
    },
    nearbyHotels: [], // This information is not in content.json
    tours: [], // This information is not in content.json
    reviews: [], // This information is not in content.json
    gettingThere: { // This information is not in content.json
      bycar: '',
      byPublicTransport: '',
      parking: ''
    },
    knowBeforeYouGo: { // This information is not in content.json
      whatToBring: [],
      safety: [],
      tips: []
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
    if (beach.attributes && beach.attributes.amenities) {
      beach.attributes.amenities.forEach(amenity => amenities.add(amenity));
    }
  });
  
  return Array.from(amenities).sort();
};

export const getAllVibes = (): string[] => {
  const contentBeaches = getAllContentBeaches();
  const vibes = new Set<string>();

  contentBeaches.forEach(beach => {
    if (beach.attributes && beach.attributes.best_for) {
      beach.attributes.best_for.forEach(vibe => vibes.add(vibe));
    }
  });

  return Array.from(vibes).sort();
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