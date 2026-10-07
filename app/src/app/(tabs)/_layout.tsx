import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { colors } from '../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
const icon = (name: IconName) =>
  function TabIcon({ color, size }: { color: string; size: number }) {
    return <Ionicons name={name} color={color} size={size} />;
  };

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.wine,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Today', tabBarIcon: icon('calendar-outline') }} />
      <Tabs.Screen name="grapes" options={{ title: 'Grapes', tabBarIcon: icon('leaf-outline') }} />
      <Tabs.Screen name="map" options={{ title: 'Map', tabBarIcon: icon('map-outline') }} />
      <Tabs.Screen name="notes" options={{ title: 'Taste', tabBarIcon: icon('wine-outline') }} />
    </Tabs>
  );
}
