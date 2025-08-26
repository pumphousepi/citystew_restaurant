import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function LocationHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>CityStew</Text>
      </View>
      <TouchableOpacity style={styles.locationButton} activeOpacity={0.7}>
        <MapPin size={16} color={Colors.primary} />
        <Text style={styles.locationText}>San Francisco</Text>
        <ChevronDown size={16} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  logoContainer: {
    marginBottom: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
});