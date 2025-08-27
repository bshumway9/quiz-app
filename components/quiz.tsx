import React from 'react';
import { Text, Button, View } from 'react-native';
import {CXStack, CYStack} from './views/CStack';
import CButton from './buttons/CButton';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export type Question = {
    text: string;
    answer: boolean;
};

type QuizProps = {
    questions: Question[];
};

export default function Quiz({
    questions,
}: QuizProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState<Question>(questions[0]);
    const [userAnswer, setUserAnswer] = React.useState<boolean | null>(null);
    const [answers, setAnswers] = React.useState<(boolean | null)[]>(
        Array(questions.length).fill(null)
    );
    const onNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentQuestion(questions[currentIndex + 1]);
            setUserAnswer(answers[currentIndex + 1]);
        }
    };
    const onPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentQuestion(questions[currentIndex - 1]);
            setUserAnswer(answers[currentIndex - 1]);
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
    }

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
                    buttonText="True"
                    disabled={userAnswer !== null}
                />
                <CButton
                    onPress={() => setAnswer(currentIndex, false)}
                    type="primary"
                    buttonText="False"
                    disabled={userAnswer !== null}
                />
            </CXStack>
            <CXStack justify="center" gap={20}>
                <CButton
                    onPress={onPrev}
                    type="secondary"
                    buttonText="Prev"
                    leftIcon={<AntDesign name="caretleft" size={24} color={Colors.light.button} />}
                    disabled={currentIndex === 0}
                />
                <CButton
                    onPress={onNext}
                    type="secondary"
                    buttonText="Next"
                    rightIcon={<AntDesign name="caretright" size={24} color={Colors.light.button} />}
                    disabled={currentIndex === questions.length - 1}
                />
            </CXStack>
        </CYStack>
    );
};