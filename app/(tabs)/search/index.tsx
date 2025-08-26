import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Filter, SlidersHorizontal } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import Colors from '@/constants/colors';
import { useRestaurants } from '@/hooks/restaurant-store';

export default function SearchScreen() {
  const { restaurants, filters, updateFilters, clearFilters } = useRestaurants();
  const [showFilters, setShowFilters] = useState(false);

  const handleRestaurantPress = (id: string) => {
    router.push(`/(home)/${id}`);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <View style={styles.container}>
      <SearchBar />
      
      <View style={styles.filterBar}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
          activeOpacity={0.7}
        >
          <SlidersHorizontal size={18} color={Colors.primary} />
          <Text style={styles.filterButtonText}>Filters</Text>
          {hasActiveFilters && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {Object.values(filters).filter(v => v !== undefined).length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        
        {hasActiveFilters && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearFilters}
            activeOpacity={0.7}
          >
            <Text style={styles.clearButtonText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {restaurants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No restaurants found</Text>
          <Text style={styles.emptyText}>Try adjusting your search or filters</Text>
        </View>
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              onPress={() => handleRestaurantPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
  filterBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.white,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});