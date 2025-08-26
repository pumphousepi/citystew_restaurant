export interface Restaurant {
    id: string;
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    priceLevel: number; // 1-4 for $-$$$$
    cuisineType: string;
    estimatedTime: string;
    distance?: string;
    address: string;
    description: string;
    isFavorite?: boolean;
    hours?: string;
    phone?: string;
  }
  
  export interface Cuisine {
    id: string;
    name: string;
    icon: string;
    color: string;
  }
  
  export interface SearchFilters {
    cuisine?: string;
    priceLevel?: number;
    rating?: number;
    searchQuery?: string;
  }