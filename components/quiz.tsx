import React from 'react';
import { Text, View, Alert } from 'react-native';
import { CXStack, CYStack } from './views/CStack';
import CButton from './buttons/CButton';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as Updates from 'expo-updates';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export type Question = {
    text: string;
    answer: boolean;
};

type QuizProps = {
    questions: Question[];
    getNewQuestions?: () => void;
};

export default function Quiz({
    questions,
    getNewQuestions,
}: QuizProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState<Question>(questions[0]);
    const [userAnswer, setUserAnswer] = React.useState<boolean | null>(null);
    const [answers, setAnswers] = React.useState<(boolean | null)[]>(
        Array(questions.length).fill(null)
    );

    React.useEffect(() => {
        setCurrentQuestion(questions[currentIndex]);
        setUserAnswer(answers[currentIndex]);
    }, [currentIndex, answers, questions]);

    const onNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const onPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(questions.length - 1);
        }
    };

    let color = undefined;
    if (userAnswer !== null) {
        color = userAnswer === currentQuestion.answer ? 'green' : 'red';
    }

    function setAnswer(index: number, answer: boolean) {
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
        setUserAnswer(answer);
        const allCorrect =
            newAnswers.every((ans, idx) => ans === questions[idx].answer) &&
            newAnswers.every(ans => ans !== null);

        if (answer === currentQuestion.answer && !allCorrect) {
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

    React.useEffect(() => {
        if (
            answers.every((ans, idx) => ans === questions[idx].answer) &&
            answers.every(ans => ans !== null)
        ) {
            Alert.alert(
                'Congratulations!',
                'You answered all questions correctly!',
                [
                    {
                        text: 'Retry',
                        onPress: () => {
                            // Reload the app using Expo Updates for React Native
                            // and fallback to resetting state if Updates is unavailable
                            (async () => {
                                try {
                                    getNewQuestions?.();
                                    if (getNewQuestions) {
                                        getNewQuestions();
                                        setCurrentIndex(0);
                                        setAnswers(Array(questions.length).fill(null));
                                    }
                                    else if (Updates && Updates.reloadAsync) {
                                        await Updates.reloadAsync();
                                    } else if (Updates && Updates.reloadAsync) {
                                        await Updates.reloadAsync();
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
                    }
                ],
                { cancelable: false }
            );
        }
    }, [answers, questions]);

    return (
        <CYStack style={{ padding: 16 }}>
            <Text
                style={{
                    color: color,
                    fontWeight: 'bold',
                    marginBottom: 16,
                    fontSize: 18,
                    textAlign: 'center',
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
                    type="tertiary"
                    buttonText="Cheat"
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