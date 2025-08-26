import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useRestaurants } from '@/hooks/restaurant-store';

export default function SearchBar() {
  const { filters, updateFilters } = useRestaurants();
  const [searchText, setSearchText] = useState(filters.searchQuery || '');

  const handleSearch = (text: string) => {
    setSearchText(text);
    updateFilters({ ...filters, searchQuery: text });
  };

  const handleClear = () => {
    setSearchText('');
    updateFilters({ ...filters, searchQuery: undefined });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Search size={20} color={Colors.textTertiary} />
        <TextInput
          style={styles.input}
          placeholder="Search for food, drinks, or cuisines"
          placeholderTextColor={Colors.textTertiary}
          value={searchText}
          onChangeText={handleSearch}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear} activeOpacity={0.7}>
            <X size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
});