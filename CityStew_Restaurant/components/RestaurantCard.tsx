import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, Star, Clock, MapPin } from 'lucide-react-native';
import { Restaurant } from '@/types/restaurant';
import Colors from '@/constants/colors';
import { useRestaurants } from '@/hooks/restaurant-store';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export default function RestaurantCard({ restaurant, onPress }: RestaurantCardProps) {
  const { favorites, toggleFavorite } = useRestaurants();
  const isFavorite = favorites.includes(restaurant.id);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(restaurant.id);
  };

  const renderPriceLevel = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <Text
        key={i}
        style={[
          styles.priceSymbol,
          i < restaurant.priceLevel ? styles.priceActive : styles.priceInactive,
        ]}
      >
        $
      </Text>
    ));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.8}
        >
          <Heart
            size={20}
            color={isFavorite ? Colors.error : Colors.white}
            fill={isFavorite ? Colors.error : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.rating} fill={Colors.rating} />
            <Text style={styles.rating}>{restaurant.rating}</Text>
            <Text style={styles.reviewCount}>({restaurant.reviewCount})</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <View style={styles.priceContainer}>{renderPriceLevel()}</View>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.cuisine}>{restaurant.cuisineType}</Text>
          <Text style={styles.dot}>•</Text>
          <View style={styles.timeContainer}>
            <Clock size={12} color={Colors.textSecondary} />
            <Text style={styles.time}>{restaurant.estimatedTime}</Text>
          </View>
        </View>
        
        {restaurant.distance && (
          <View style={styles.distanceContainer}>
            <MapPin size={12} color={Colors.textTertiary} />
            <Text style={styles.distance}>{restaurant.distance}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  priceSymbol: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceActive: {
    color: Colors.text,
  },
  priceInactive: {
    color: Colors.gray[300],
  },
  dot: {
    marginHorizontal: 8,
    color: Colors.textTertiary,
    fontSize: 12,
  },
  cuisine: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
});