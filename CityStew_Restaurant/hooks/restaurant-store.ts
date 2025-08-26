import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useMemo } from 'react';
import { mockRestaurants } from '@/mocks/restaurants';
import { Restaurant, SearchFilters } from '@/types/restaurant';

export const [RestaurantProvider, useRestaurants] = createContextHook(() => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (restaurantId: string) => {
    const newFavorites = favorites.includes(restaurantId)
      ? favorites.filter(id => id !== restaurantId)
      : [...favorites, restaurantId];
    
    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const updateFilters = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.cuisineType.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      );
    }

    if (filters.cuisine) {
      result = result.filter(r => r.cuisineType === filters.cuisine);
    }

    if (filters.priceLevel !== undefined) {
      result = result.filter(r => r.priceLevel <= filters.priceLevel!);
    }

    if (filters.rating !== undefined) {
      result = result.filter(r => r.rating >= filters.rating!);
    }

    return result;
  }, [restaurants, filters]);

  const favoriteRestaurants = useMemo(() => {
    return restaurants.filter(r => favorites.includes(r.id));
  }, [restaurants, favorites]);

  return {
    restaurants: filteredRestaurants,
    allRestaurants: restaurants,
    favoriteRestaurants,
    favorites,
    filters,
    isLoading,
    toggleFavorite,
    updateFilters,
    clearFilters,
  };
});