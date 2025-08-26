import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Star, MapPin, Clock, Phone, DollarSign, Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRestaurants } from '@/hooks/restaurant-store';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const { allRestaurants, favorites, toggleFavorite } = useRestaurants();
  
  const restaurant = allRestaurants.find(r => r.id === id);
  const isFavorite = favorites.includes(id as string);

  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Restaurant not found</Text>
      </View>
    );
  }

  const handleCall = () => {
    if (restaurant.phone) {
      const phoneNumber = restaurant.phone.replace(/[^\d]/g, '');
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleDirections = () => {
    const address = encodeURIComponent(restaurant.address);
    const url = Platform.select({
      ios: `maps:0,0?q=${address}`,
      android: `geo:0,0?q=${address}`,
      default: `https://maps.google.com/?q=${address}`,
    });
    Linking.openURL(url);
  };

  const renderPriceLevel = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <DollarSign
        key={i}
        size={16}
        color={i < restaurant.priceLevel ? Colors.text : Colors.gray[300]}
      />
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.cuisine}>{restaurant.cuisineType}</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(restaurant.id)}
            activeOpacity={0.7}
          >
            <Heart
              size={24}
              color={isFavorite ? Colors.error : Colors.textSecondary}
              fill={isFavorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <View style={styles.ratingContainer}>
              <Star size={18} color={Colors.rating} fill={Colors.rating} />
              <Text style={styles.rating}>{restaurant.rating}</Text>
            </View>
            <Text style={styles.reviewCount}>({restaurant.reviewCount} reviews)</Text>
          </View>
          <View style={styles.stat}>
            <View style={styles.priceContainer}>{renderPriceLevel()}</View>
          </View>
        </View>

        <Text style={styles.description}>{restaurant.description}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Information</Text>
          
          <View style={styles.infoRow}>
            <MapPin size={18} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{restaurant.address}</Text>
          </View>
          
          {restaurant.hours && (
            <View style={styles.infoRow}>
              <Clock size={18} color={Colors.textSecondary} />
              <Text style={styles.infoText}>{restaurant.hours}</Text>
            </View>
          )}
          
          {restaurant.phone && (
            <View style={styles.infoRow}>
              <Phone size={18} color={Colors.textSecondary} />
              <Text style={styles.infoText}>{restaurant.phone}</Text>
            </View>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleDirections}
            activeOpacity={0.8}
          >
            <MapPin size={20} color={Colors.white} />
            <Text style={styles.primaryButtonText}>Get Directions</Text>
          </TouchableOpacity>
          
          {restaurant.phone && (
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleCall}
              activeOpacity={0.8}
            >
              <Phone size={20} color={Colors.primary} />
              <Text style={styles.secondaryButtonText}>Call</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  favoriteButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text,
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
});