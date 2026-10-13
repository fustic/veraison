import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider } from '../data/DataProvider';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DataProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerTintColor: colors.wine,
            headerStyle: { backgroundColor: colors.paper },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colors.paper },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="grape/[id]" options={{ title: '' }} />
          <Stack.Screen name="note/new" options={{ headerShown: false, presentation: 'fullScreenModal', gestureEnabled: false }} />
          <Stack.Screen name="note/[id]" options={{ title: 'Note' }} />
          <Stack.Screen name="note/reveal/[id]" options={{ title: 'What was it?' }} />
        </Stack>
      </DataProvider>
    </SafeAreaProvider>
  );
}
