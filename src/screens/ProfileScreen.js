import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';

import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '../services/FirebaseConfig';

export default function ProfileScreen({ navigation }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // Get user information from Firebase
  const loadProfile = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Error', 'Please log in again.');
        return;
      }

      setEmail(user.email || '');

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setName(userSnap.data().name || 'Cricket Fan');
      } else {
        setName('Cricket Fan');
      }

    } catch (error) {
      Alert.alert('Profile Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#176B50" />
        <Text>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>My Profile</Text>

      <View style={styles.profileCard}>

        <Text style={styles.avatar}>👤</Text>

        <Text style={styles.name}>{name}</Text>

        <Text style={styles.email}>{email}</Text>

      </View>

      <View style={styles.infoCard}>

        <Text style={styles.sectionTitle}>
          Account Information
        </Text>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>Email Address</Text>
        <Text style={styles.value}>{email}</Text>

        <Text style={styles.label}>Account Status</Text>
        <Text style={styles.status}>Active</Text>

      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F7F5',
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#092C25',
    marginTop: 35,
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: '#092C25',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },

  avatar: {
    fontSize: 55,
  },

  name: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },

  email: {
    color: '#B8D8CA',
    marginTop: 7,
  },

  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#092C25',
    marginBottom: 15,
  },

  label: {
    color: '#777',
    marginTop: 12,
    fontSize: 13,
  },

  value: {
    color: '#092C25',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  status: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },

  logoutButton: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },

  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});