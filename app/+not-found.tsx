import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={{
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  }}>This screen does not exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={{
              lineHeight: 30,
              fontSize: 16,
              color: '#0a7ea4',
            }} 
            >Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
