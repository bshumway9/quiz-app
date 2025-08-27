import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CButton from '@/components/buttons/CButton';
import CXStack, { CYStack } from '@/components/views/CStack';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import Quiz, {Question} from '@/components/quiz';


const dinosaurQuestions: Question[] = [
  { text: "The Tyrannosaurus rex lived during the Jurassic period.", answer: false },
  { text: "Stegosaurus had plates on its back for defense.", answer: true },
  { text: "All dinosaurs were cold-blooded.", answer: false },
  { text: "Triceratops had three horns on its face.", answer: true },
  { text: "Velociraptors were about the size of a turkey.", answer: true },
  { text: "Dinosaurs and humans lived at the same time.", answer: false },
  { text: "Brachiosaurus had longer front legs than back legs.", answer: true },
  { text: "Pterodactyls were flying dinosaurs.", answer: false },
  { text: "The word 'dinosaur' means 'terrible lizard'.", answer: true },
  { text: "Some dinosaurs had feathers.", answer: true },
  { text: "Apatosaurus was once called Brontosaurus.", answer: true },
  { text: "Dinosaurs laid eggs.", answer: true },
  { text: "Spinosaurus could swim.", answer: true },
  { text: "All dinosaurs were huge.", answer: false },
  { text: "The extinction of dinosaurs happened about 65 million years ago.", answer: true },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  let random5 = dinosaurQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
  return (
    <>
    <StatusBar backgroundColor='yellow' />
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.header, dark: Colors.dark.header }}
      headerImage={
        <></>
      }
      headerHeight={insets.top}
      >
      <CYStack gap={40}>
        <Quiz questions={random5} />
      </CYStack>
    </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
