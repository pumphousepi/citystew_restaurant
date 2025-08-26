import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Heart } from 'lucide-react-native';
import RestaurantCard from '@/components/RestaurantCard';
import Colors from '@/constants/colors';
import { useRestaurants } from '@/hooks/restaurant-store';

export default function FavoritesScreen() {
  const { favoriteRestaurants } = useRestaurants();

  const handleRestaurantPress = (id: string) => {
    router.push(`/(home)/${id}`);
  };

  if (favoriteRestaurants.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Heart size={48} color={Colors.gray[300]} />
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptyText}>
          Start adding restaurants to your favorites and they'll appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteRestaurants}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
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
    backgroundColor: Colors.backgroundSecondary,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});