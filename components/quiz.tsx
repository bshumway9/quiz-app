import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text } from 'react-native';
import CButton from './buttons/CButton';
import { CXStack, CYStack } from './views/CStack';

export type Question = {
    text: string;
    answer: boolean;
};

type QuizProps = {
    questions: Question[];
    getNewQuestions: () => void;
};

export default function Quiz({
    questions,
    getNewQuestions,
}: QuizProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState<(boolean | null)[]>(
        Array(questions.length).fill(null)
    );

    const currentQuestion = questions[currentIndex];
    const userAnswer = answers[currentIndex];

    const onNext = () => {
        // Go to Next Question. Wrap around to the first question if at the end
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const onPrev = () => {
        // Go to Previous Question. Wrap around to the last question if at the beginning
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(questions.length - 1);
        }
    };

    let color = 'white';
    if (userAnswer !== null) {
        color = userAnswer === currentQuestion.answer ? Colors.light.tabIconSelected : 'red';
    }

    function setAnswer(index: number, answer: boolean) {
        // Update the answers array with the user's answer
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);

        const allCorrect =
            newAnswers.every((ans, idx) => ans === questions[idx].answer) &&
            newAnswers.every(ans => ans !== null);
        // Check if all answers are correct to show congratulations alert
        if (allCorrect) {
            Alert.alert(
                'Congratulations!',
                'You answered all questions correctly!',
                [
                    {
                        text: 'Retry',
                        onPress: () => {
                            (async () => {
                                try {
                                    if (getNewQuestions) {
                                        await Promise.resolve(getNewQuestions());
                                        setCurrentIndex(0);
                                        setAnswers(Array(questions.length).fill(null));
                                    } else {
                                        setCurrentIndex(0);
                                        setAnswers(Array(questions.length).fill(null));
                                    }
                                } catch (e) {
                                    setCurrentIndex(0);
                                    setAnswers(Array(questions.length).fill(null));
                                }
                            })();
                        },
                    },
                ],
                { cancelable: false }
            );
            return;
        }
        // Show alert for correct answer and move to next question
        if (answer === currentQuestion.answer) {
            Alert.alert(
                'Correct!',
                'You chose the right answer.',
                [
                    {
                        text: currentIndex < questions.length - 1 ? 'Next' : 'OK',
                        onPress: () => {
                            if (currentIndex < questions.length - 1) {
                                setCurrentIndex(currentIndex + 1);
                            } else {
                                setCurrentIndex(0);
                            }
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <CYStack style={{ padding: 16, marginTop: 32 }} gap={20}>
            <Text
                style={{
                    color: color,
                    fontWeight: 'bold',
                    marginBottom: 16,
                    fontSize: 18,
                    textAlign: 'center',
                    backgroundColor: Colors.light.header,
                    padding: 32,
                    borderRadius: 8,
                }}
            >
                {currentQuestion.text}
            </Text>
            <CXStack justify="center" gap={20} style={{ marginBottom: 16 }}>
                <CButton
                    onPress={() => setAnswer(currentIndex, true)}
                    type="primary"
                    buttonText="TRUE"
                    disabled={userAnswer === currentQuestion.answer}
                />
                <CButton
                    onPress={() => setAnswer(currentIndex, false)}
                    type="primary"
                    buttonText="FALSE"
                    disabled={userAnswer === currentQuestion.answer}
                />
            </CXStack>
            <CXStack justify="center" gap={20}>
                <CButton
                    onPress={onPrev}
                    type="secondary"
                    buttonText="PREV"
                    leftIcon={<AntDesign name="caretleft" size={24} color={Colors.light.button} />}
                    
                />
                <CButton
                    onPress={onNext}
                    type="secondary"
                    buttonText="NEXT"
                    rightIcon={<AntDesign name="caretright" size={24} color={Colors.light.button} />}
                    
                />
            </CXStack>
            <CXStack justify="center" style={{ marginTop: 16 }}>
                <CButton
                    type="primary"
                    buttonText="CHEAT"
                    onPress={() =>
                        router.push({
                            pathname: '/cheat',
                            params: {
                                answer: String(currentQuestion.answer),
                                question: currentQuestion.text,
                            },
                        } as any)
                    }
                />
            </CXStack>
        </CYStack>
    );
};