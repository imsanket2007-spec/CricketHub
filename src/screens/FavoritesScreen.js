import React, { useState, useEffect, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking
} from 'react-native';

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

import { auth, db } from '../services/FirebaseConfig';

export default function FavoritesScreen() {

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load favorite articles from Firestore
  const loadFavorites = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setFavorites([]);
        return;
      }

      const favoritesRef = collection(
        db,
        'users',
        user.uid,
        'favorites'
      );

      const snapshot = await getDocs(favoritesRef);

      const data = snapshot.docs.map(item => ({
        id: item.id,
        ...item.data()
      }));

      setFavorites(data);

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // Remove favorite article
  const removeFavorite = async (id) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Login Required', 'Please log in again.');
        return;
      }

      await deleteDoc(
        doc(db, 'users', user.uid, 'favorites', id)
      );

      setFavorites(previous =>
        previous.filter(item => item.id !== id)
      );

      Alert.alert('Success', 'Article removed from Favorites.');

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Open original article
  const openArticle = async (url) => {
    try {
      if (url) {
        await Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open article.');
    }
  };

  // Show loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#176B50" />
        <Text style={styles.loadingText}>
          Loading Favorites...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        ⭐ My Favorites
      </Text>

      <Text style={styles.subtitle}>
        Your saved cricket articles
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.description}>
              {item.description || 'No description available.'}
            </Text>

            <Text style={styles.source}>
              Source: {item.source || 'Cricket News'}
            </Text>

            <TouchableOpacity
              onPress={() => openArticle(item.url)}
            >
              <Text style={styles.readMore}>
                Read Full Article →
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFavorite(item.id)}
            >
              <Text style={styles.removeText}>
                Remove Favorite
              </Text>
            </TouchableOpacity>

          </View>
        )}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          loadFavorites();
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No favorite articles yet.
            {'\n'}Save articles from Cricket News!
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F7F5',
    padding: 15,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#555',
  },

  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#092C25',
    marginTop: 35,
  },

  subtitle: {
    color: '#666',
    marginTop: 5,
    marginBottom: 18,
  },

  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#092C25',
  },

  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },

  source: {
    fontSize: 12,
    color: '#777',
    marginTop: 10,
  },

  readMore: {
    color: '#176B50',
    fontWeight: 'bold',
    marginTop: 12,
  },

  removeButton: {
    backgroundColor: '#FDECEC',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },

  removeText: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
    lineHeight: 25,
  },

});