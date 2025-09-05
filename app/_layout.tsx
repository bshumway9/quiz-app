import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import 'react-native-reanimated';

import { CYStack } from '@/components/views/CStack';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <>
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
    </>
  );
}
