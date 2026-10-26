import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider } from '../data/DataProvider';
import { SyncProvider } from '../sync/SyncProvider';
import { colors, fonts } from '../theme';

// Pages opened straight from a URL (a shared link, or coming back from web sign-in) still
// get the tabs underneath, so they have a back button.
export const unstable_settings = { initialRouteName: '(tabs)' };

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [fonts.regular]: require('../../assets/fonts/IBMPlexSans-Regular.ttf'),
    [fonts.medium]: require('../../assets/fonts/IBMPlexSans-Medium.ttf'),
    [fonts.semibold]: require('../../assets/fonts/IBMPlexSans-SemiBold.ttf'),
    [fonts.bold]: require('../../assets/fonts/IBMPlexSans-Bold.ttf'),
    [fonts.display]: require('../../assets/fonts/BricolageGrotesque-Bold.ttf'),
    [fonts.mono]: require('../../assets/fonts/IBMPlexMono-Medium.ttf'),
  });
  // Fonts load from the app bundle in a few milliseconds; fall back to system fonts on error.
  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <DataProvider>
        <SyncProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerTintColor: colors.wine,
              headerStyle: { backgroundColor: colors.paper },
              headerTitleStyle: { fontFamily: error ? undefined : fonts.semibold },
              headerBackTitleStyle: { fontFamily: error ? undefined : fonts.medium },
              headerShadowVisible: false,
              // Chevron only: the tab group's route name, "(tabs)", is not a title to show.
              headerBackButtonDisplayMode: 'minimal',
              contentStyle: { backgroundColor: colors.paper },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="grape/[id]" options={{ title: '' }} />
            <Stack.Screen name="region/[id]" options={{ title: '' }} />
            <Stack.Screen name="compare" options={{ title: 'Compare' }} />
            <Stack.Screen name="account" options={{ title: '' }} />
            <Stack.Screen name="topic/[id]" options={{ title: '' }} />
            <Stack.Screen name="note/new" options={{ headerShown: false, presentation: 'fullScreenModal', gestureEnabled: false }} />
            <Stack.Screen name="note/[id]" options={{ title: 'Note' }} />
            <Stack.Screen name="note/reveal/[id]" options={{ title: 'What was it?' }} />
          </Stack>
        </SyncProvider>
      </DataProvider>
    </SafeAreaProvider>
  );
}
