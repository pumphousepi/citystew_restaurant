import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function FavoritesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Favorites',
        }} 
      />
    </Stack>
  );
}