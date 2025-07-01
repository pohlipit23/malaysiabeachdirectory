export interface ContentData {
  country: {
    name: string;
    states: State[];
  };
}

export interface State {
  name: string;
  districts: District[];
}

export interface District {
  name: string;
  cities: City[];
}

export interface City {
  name: string;
  beaches: ContentBeach[];
}

export interface ContentBeach {
  id: string;
  name: string;
  location: {
    city: string;
    district: string;
    state: string;
    island_group?: string;
  };
  headline: string;
  sub_headline: string;
  detailed_description: string;
  images: Array<{
    url: string;
    caption: string;
  }>;
  geolocation: {
    latitude: number;
    longitude: number;
  };
  links: {
    Maps: string;
    social_media: {
      instagram_tag: string;
      facebook_page?: string | null;
    };
  };
  user_content: {
    comments: any[];
    ratings: {
      average: number;
      count: number;
    };
  };
  attributes: {
    activities: string[];
    amenities: string[];
    best_for: string[];
    is_public: boolean;
  };
  meta: {
    last_updated: string;
    source_retrieved: string;
  };
}

// Beach dataset interface (from beach_dataset.json)
export interface BeachDatasetItem {
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

// Transformed beach interface for UI components
export interface Beach {
  id: string;
  name: string;
  location: string;
  state: string;
  description: string;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  activities: string[];
  vibe: string[];
  accessibility: string[];
  waterTemp: number;
  bestSeason: string;
  safetyRating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
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

export interface FilterOptions {
  activities: string[];
  amenities: string[];
  vibe: string[];
  accessibility: string[];
  rating: number;
  state: string[];
}