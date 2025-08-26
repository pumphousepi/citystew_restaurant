import { Tabs } from "expo-router";
import { Home, Search, Heart, User } from "lucide-react-native";
import React from "react";
import Colors from "@/constants/colors";
import { RestaurantProvider } from "@/hooks/restaurant-store";

export default function TabLayout() {
  return (
    <RestaurantProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textTertiary,
          tabBarStyle: {
            backgroundColor: Colors.white,
            borderTopColor: Colors.borderLight,
            borderTopWidth: 1,
            paddingBottom: 4,
            paddingTop: 4,
            height: 52,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home size={size - 2} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => <Search size={size - 2} color={color} />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, size }) => <Heart size={size - 2} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User size={size - 2} color={color} />,
          }}
        />
      </Tabs>
    </RestaurantProvider>
  );
}