import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '@/constants/colors';
import { mockCuisines } from '@/mocks/cuisines';
import { useRestaurants } from '@/hooks/restaurant-store';

export default function CuisineFilter() {
  const { filters, updateFilters } = useRestaurants();
  const selectedCuisine = filters.cuisine;

  const handleCuisinePress = (cuisineName: string) => {
    if (selectedCuisine === cuisineName) {
      updateFilters({ ...filters, cuisine: undefined });
    } else {
      updateFilters({ ...filters, cuisine: cuisineName });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockCuisines.map((cuisine) => {
          const isSelected = selectedCuisine === cuisine.name;
          return (
            <TouchableOpacity
              key={cuisine.id}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
                { borderColor: isSelected ? cuisine.color : Colors.border }
              ]}
              onPress={() => handleCuisinePress(cuisine.name)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{cuisine.icon}</Text>
              <Text style={[
                styles.chipText,
                isSelected && { color: cuisine.color }
              ]}>
                {cuisine.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: Colors.gray[50],
    borderWidth: 2,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
});