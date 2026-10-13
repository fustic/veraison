import { Tabs } from 'expo-router';
import { GrapesIcon, MapIcon, TasteIcon, TodayIcon } from '../../TabIcons';
import { colors } from '../../theme';

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
      <Tabs.Screen name="index" options={{ title: 'Today', tabBarIcon: TodayIcon }} />
      <Tabs.Screen name="grapes" options={{ title: 'Grapes', tabBarIcon: GrapesIcon }} />
      <Tabs.Screen name="map" options={{ title: 'Map', tabBarIcon: MapIcon }} />
      <Tabs.Screen name="notes" options={{ title: 'Taste', tabBarIcon: TasteIcon }} />
    </Tabs>
  );
}
