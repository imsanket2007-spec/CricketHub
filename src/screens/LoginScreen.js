import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/FirebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password)
      return alert('Please enter email and password');

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('Main');
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.logo}>🏏</Text>
      <Text style={s.title}>CricketHub</Text>
      <Text style={s.subtitle}>Your cricket world, all in one place.</Text>

      <View style={s.card}>
        <Text style={s.heading}>Welcome Back!</Text>
        <Text style={s.info}>Login to continue</Text>

        <TextInput
          label="Email Address"
          mode="outlined"
          left={<TextInput.Icon icon="email-outline" />}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          textColor="#183B2D"
          placeholderTextColor="#888888"
          outlineColor="#CCCCCC"
          activeOutlineColor="#16845B"
          style={s.input}
        />

        <TextInput
          label="Password"
          mode="outlined"
          left={<TextInput.Icon icon="lock-outline" />}
          right={
            <TextInput.Icon
              icon={show ? 'eye-off' : 'eye'}
              onPress={() => setShow(!show)}
            />
          }
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!show}
          textColor="#183B2D"
          placeholderTextColor="#888888"
          outlineColor="#CCCCCC"
          activeOutlineColor="#16845B"
          style={s.input}
        />

        <Button
          mode="contained"
          onPress={login}
          loading={loading}
          disabled={loading}
          style={s.button}
          contentStyle={{ height: 48 }}
        >
          LOGIN
        </Button>

        <Divider style={s.divider} />

        <Text style={s.footer}>New to CricketHub?</Text>
        <Button
          textColor="#16845B"
          onPress={() => navigation.navigate('Register')}
        >
          Create an Account
        </Button>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    padding: 22, backgroundColor: '#F7FAF8'
  },
  logo: { fontSize: 55, textAlign: 'center' },
  title: {
    fontSize: 30, fontWeight: 'bold',
    textAlign: 'center', color: '#183B2D'
  },
  subtitle: {
    textAlign: 'center', color: '#888',
    marginBottom: 28, marginTop: 5
  },
  card: {
    backgroundColor: '#FFF', padding: 22,
    borderRadius: 18, elevation: 3
  },
  heading: {
    fontSize: 23, fontWeight: 'bold',
    color: '#183B2D', textAlign: 'center'
  },
  info: {
    textAlign: 'center', color: '#888',
    marginBottom: 24, marginTop: 5
  },
  input: { marginBottom: 16, backgroundColor: '#FFF' },
  button: { backgroundColor: '#16845B', borderRadius: 8 },
  divider: { marginTop: 22, marginBottom: 15 },
  footer: { textAlign: 'center', color: '#777' }
});