import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏏</Text>
      <Text style={styles.title}>CRICKET HUB</Text>
      <Text style={styles.subtitle}>
        Your World of Cricket
      </Text>
      <Text style={styles.footer}>
        LIVE • NEWS • CRICKET
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#092C25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#B8D8CA',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 45,
    color: '#B8D8CA',
    letterSpacing: 2,
    fontSize: 12,
  },
});