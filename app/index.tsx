import ParallaxScrollView from '@/components/ParallaxScrollView';
import Quiz, { Question } from '@/components/quiz';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';


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
const random5 = dinosaurQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);


export default function HomeScreen() {
  const [questionBank, setQuestionBank] = React.useState<Question[]>(random5);

  function getNewQuestions() {
    let new5 = dinosaurQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestionBank(new5);
  }

  return (
    <>
      <StatusBar />
      <ParallaxScrollView>
          <Quiz questions={questionBank} getNewQuestions={getNewQuestions} />
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
