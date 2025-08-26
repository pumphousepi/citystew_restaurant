import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import RestaurantCard from '@/components/RestaurantCard';
import SearchBar from '@/components/SearchBar';
import CuisineFilter from '@/components/CuisineFilter';
import LocationHeader from '@/components/LocationHeader';
import Colors from '@/constants/colors';
import { useRestaurants } from '@/hooks/restaurant-store';

export default function HomeScreen() {
  const { restaurants, isLoading } = useRestaurants();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRestaurantPress = (id: string) => {
    router.push(`/(home)/${id}`);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LocationHeader />
      <SearchBar />
      <CuisineFilter />
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
      />
    </SafeAreaView>
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
});