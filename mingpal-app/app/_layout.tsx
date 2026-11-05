import { Newsreader_400Regular, Newsreader_500Medium, Newsreader_600SemiBold } from '@expo-google-fonts/newsreader';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LocaleProvider } from '../src/i18n';
import { colors } from '../src/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'MaruBuri-Bold': require('../assets/fonts/MaruBuri-Bold.ttf'),
    Newsreader_400Regular,
    Newsreader_500Medium,
    Newsreader_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <LocaleProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper } }}>
          <Stack.Screen name="(tabs)" />
          {/* AI help / feedback are sheets over the writing flow: tabs hidden (spec §10.1) */}
          <Stack.Screen name="help" options={{ presentation: 'transparentModal', animation: 'fade' }} />
          <Stack.Screen name="translate" options={{ presentation: 'transparentModal', animation: 'fade' }} />
          <Stack.Screen name="memo" options={{ presentation: 'transparentModal', animation: 'fade' }} />
          <Stack.Screen name="review" options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaProvider>
    </LocaleProvider>
  );
}
