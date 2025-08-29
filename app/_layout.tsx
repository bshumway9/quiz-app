import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Text, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { CYStack } from '@/components/views/CStack';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'DinoQuiz',
            headerTitle: () => (
              <CYStack style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light.header }}>
                <Text style={{ color: Colors.light.tabIconSelected, fontSize: 24, fontWeight: 'bold' }}>DinoQuiz</Text>
              </CYStack>
            ),
            headerStyle: { backgroundColor: Colors.light.header },
          }}
        />
        <Stack.Screen
          name="cheat"
          options={{
            headerTitle: () => (
              <CYStack style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light.header }}>
                <Text style={{ color: Colors.light.tabIconSelected, fontSize: 24, fontWeight: 'bold' }}>DinoQuiz</Text>
              </CYStack>
            ),
            headerStyle: { backgroundColor: Colors.light.header },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
