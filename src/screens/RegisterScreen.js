import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/FirebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!name.trim() || !email.trim() || !password)
      return Alert.alert('Error', 'Please fill all fields');

    if (password.length < 6)
      return Alert.alert('Error', 'Password must be at least 6 characters');

    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(
        auth, email.trim(), password
      );

      await setDoc(doc(db, 'users', user.user.uid), {
        name: name.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString()
      });

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
    } catch (e) {
      Alert.alert('Registration Failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.logo}>🏏</Text>
      <Text style={s.title}>CricketHub</Text>
      <Text style={s.subtitle}>Be part of the cricket community.</Text>

      <View style={s.card}>
        <Text style={s.heading}>Create Account</Text>
        <Text style={s.info}>Fill in your details to get started</Text>

        <TextInput
          label="Full Name"
          mode="outlined"
          left={<TextInput.Icon icon="account-outline" />}
          value={name}
          onChangeText={setName}
          textColor="#183B2D"
          placeholderTextColor="#888888"
          outlineColor="#CCCCCC"
          activeOutlineColor="#16845B"
          style={s.input}
        />

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
          onPress={register}
          loading={loading}
          disabled={loading}
          style={s.button}
          contentStyle={{ height: 48 }}
        >
          CREATE ACCOUNT
        </Button>

        <Divider style={s.divider} />

        <Text style={s.footer}>Already have an account?</Text>
        <Button
          textColor="#16845B"
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Button>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1, justifyContent: 'center',
    padding: 22, backgroundColor: '#F7FAF8'
  },
  logo: { fontSize: 55, textAlign: 'center' },
  title: {
    fontSize: 30, fontWeight: 'bold',
    textAlign: 'center', color: '#183B2D'
  },
  subtitle: {
    textAlign: 'center', color: '#888',
    marginBottom: 25, marginTop: 5
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
    marginBottom: 22, marginTop: 5
  },
  input: { marginBottom: 16, backgroundColor: '#FFF' },
  button: { backgroundColor: '#16845B', borderRadius: 8 },
  divider: { marginTop: 22, marginBottom: 15 },
  footer: { textAlign: 'center', color: '#777' }
});