import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, CreditCard, HelpCircle, LogOut, ChevronRight, Star, Heart, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRestaurants } from '@/hooks/restaurant-store';

export default function ProfileScreen() {
  const { favoriteRestaurants } = useRestaurants();

  const menuItems = [
    { icon: CreditCard, label: 'Payment Methods', onPress: () => {} },
    { icon: MapPin, label: 'Addresses', onPress: () => {} },
    { icon: Settings, label: 'Settings', onPress: () => {} },
    { icon: HelpCircle, label: 'Help & Support', onPress: () => {} },
    { icon: LogOut, label: 'Sign Out', onPress: () => {}, isDestructive: true },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Heart size={20} color={Colors.primary} />
            <Text style={styles.statNumber}>{favoriteRestaurants.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.stat}>
            <Star size={20} color={Colors.primary} />
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.stat}>
            <MapPin size={20} color={Colors.primary} />
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Visited</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <item.icon
                size={22}
                color={item.isDestructive ? Colors.error : Colors.textSecondary}
              />
              <Text style={[
                styles.menuItemText,
                item.isDestructive && styles.menuItemTextDestructive
              ]}>
                {item.label}
              </Text>
            </View>
            <ChevronRight size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  profileSection: {
    backgroundColor: Colors.white,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  menuSection: {
    backgroundColor: Colors.white,
    marginTop: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
  },
  menuItemTextDestructive: {
    color: Colors.error,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  version: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
});