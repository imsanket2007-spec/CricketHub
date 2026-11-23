import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert
} from 'react-native';

import {
  collection,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import { auth, db } from '../services/FirebaseConfig';

// Enter your existing NewsAPI key here
const API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

export default function NewsScreen({ navigation }) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=cricket&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`
      );

      const data = await response.json();

      if (data.status !== 'ok') {
        throw new Error(data.message || 'Unable to fetch news');
      }

      setArticles(data.articles || []);

    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const saveFavorite = async (item) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('Login Required', 'Please login first.');
        return;
      }

      if (!item.url) {
        Alert.alert('Error', 'Article link is unavailable.');
        return;
      }

      const articleId = encodeURIComponent(item.url);

      const favoriteRef = doc(
        collection(db, 'users', user.uid, 'favorites'),
        articleId
      );

      const existing = await getDoc(favoriteRef);

      if (existing.exists()) {
        Alert.alert('Already Saved', 'This article is already in Favorites.');
        return;
      }

      await setDoc(favoriteRef, {
        title: item.title || 'Cricket News',
        description: item.description || '',
        url: item.url,
        source: item.source?.name || 'Cricket News',
        savedAt: new Date().toISOString()
      });

      Alert.alert('Success', 'Article saved to Favorites!');

    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const openArticle = async (url) => {
    try {
      if (url) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Article link is unavailable.');
      }
    } catch (err) {
      Alert.alert('Error', 'Could not open article.');
    }
  };

  const renderNews = () => {
    return articles.map((item, index) => (
      <View style={styles.card} key={item.url || index}>

        <Text style={styles.title}>
          {item.title || 'Cricket News'}
        </Text>

        <Text style={styles.source}>
          Source: {item.source?.name || 'Unknown'}
        </Text>

        <Text style={styles.description}>
          {item.description || 'No description available.'}
        </Text>

        <View style={styles.buttonRow}>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveFavorite(item)}
          >
            <Text style={styles.buttonText}>⭐ Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.readButton}
            onPress={() => openArticle(item.url)}
          >
            <Text style={styles.buttonText}>Read Article</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() =>
            navigation.navigate('NewsDetails', {
              article: item
            })
          }
        >
          <Text style={styles.buttonText}>
            View Details
          </Text>
        </TouchableOpacity>

      </View>
    ));
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>🏏 Cricket News</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1565C0"
          style={styles.loader}
        />
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchNews}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {articles.length > 0 ? (
            renderNews()
          ) : (
            <Text style={styles.error}>No cricket news found.</Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>← Back to Home</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 15
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#172554',
    textAlign: 'center',
    marginVertical: 15
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 8
  },

  source: {
    fontSize: 13,
    color: '#1565C0',
    marginBottom: 10
  },

  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 21,
    marginBottom: 12
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  saveButton: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 7,
    flex: 1,
    marginRight: 5,
    alignItems: 'center'
  },

  readButton: {
    backgroundColor: '#1565C0',
    padding: 10,
    borderRadius: 7,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center'
  },

  detailsButton: {
    backgroundColor: '#673AB7',
    padding: 11,
    borderRadius: 7,
    marginTop: 10,
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },

  loader: {
    marginTop: 50
  },

  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 30
  },

  retryButton: {
    backgroundColor: '#1565C0',
    padding: 12,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 15
  },

  backButton: {
    backgroundColor: '#172554',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5
  }

});