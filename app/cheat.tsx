import CButton from '@/components/buttons/CButton';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { CYStack } from '@/components/views/CStack';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function CheatScreen() {
  const params = useLocalSearchParams<{ answer?: string; question?: string }>();
  const [revealed, setRevealed] = React.useState(false);

  const answerBool = (params.answer ?? '').toString().toLowerCase() === 'true';
  const answerLabel = answerBool ? 'True' : 'False';
  const question = params.question ?? 'Question';

  return (
    <ParallaxScrollView>
        <CYStack style={styles.container} gap={20} align="center" justify="center">
            <CYStack style={{backgroundColor: Colors.light.header, padding: 32, borderRadius: 8, marginBottom: 16}} gap={20} align="center" justify='center' >
            <Text style={styles.title}>Cheat</Text>
            <Text style={styles.question}>{question}</Text>
            </CYStack>

            <CButton
                type="primary"
                buttonText="Show Answer"
                onPress={() => {
                    // Show alert with answer
                    // Use React Native's Alert API
                        Alert.alert(
                            question,
                            answerLabel.toLocaleUpperCase(),
                            [
                                { text: 'OK', style: 'cancel', onPress: () => {} }
                            ],
                            { cancelable: true }
                        );
                }}
            />
        </CYStack>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', color: 'white' },
  question: { fontSize: 18, textAlign: 'center', color: 'white' },
  answerBox: { alignItems: 'center' },
  answerLabel: { fontSize: 16, opacity: 0.7, marginBottom: 4 },
  answer: { fontSize: 22, fontWeight: 'bold' },
});
