import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CButton from '@/components/buttons/CButton';
import { CYStack } from '@/components/views/CStack';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export default function CheatScreen() {
    const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ answer?: string; question?: string }>();
  const [revealed, setRevealed] = React.useState(false);

  const answerBool = (params.answer ?? '').toString().toLowerCase() === 'true';
  const answerLabel = answerBool ? 'True' : 'False';
  const question = params.question ?? 'Question';

  return (
    <ParallaxScrollView>
        <CYStack style={styles.container} gap={20} align="center" justify="center">
            <Text style={styles.title}>Cheat</Text>
            <Text style={styles.question}>{question}</Text>

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
  title: { fontSize: 26, fontWeight: 'bold' },
  question: { fontSize: 18, textAlign: 'center' },
  answerBox: { alignItems: 'center' },
  answerLabel: { fontSize: 16, opacity: 0.7, marginBottom: 4 },
  answer: { fontSize: 22, fontWeight: 'bold' },
});
