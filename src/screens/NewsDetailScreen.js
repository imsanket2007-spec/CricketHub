import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert
} from 'react-native';

export default function NewsDetailScreen({ route, navigation }) {
  const article = route.params?.article;

  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Article not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openArticle = async () => {
    try {
      if (article.url) {
        await Linking.openURL(article.url);
      } else {
        Alert.alert('Error', 'Article link is unavailable.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open the article.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Back to News</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>
        {article.title || 'Cricket News'}
      </Text>

      <Text style={styles.source}>
        Source: {article.source?.name || 'Cricket News'}
      </Text>

      <Text style={styles.date}>
        Published: {article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString()
          : 'Date unavailable'}
      </Text>

      <View style={styles.line} />

      <Text style={styles.section}>Description</Text>
      <Text style={styles.description}>
        {article.description || 'No description available.'}
      </Text>

      <Text style={styles.section}>Full Content</Text>
      <Text style={styles.description}>
        {article.content || 'Open the original article to read the full news.'}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={openArticle}
      >
        <Text style={styles.buttonText}>Read Full Article ↗</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20
  },
  back: {
    color: '#1565C0',
    fontSize: 16,
    marginBottom: 25
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 15
  },
  source: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8
  },
  date: {
    fontSize: 13,
    color: '#777'
  },
  line: {
    height: 1,
    backgroundColor: '#CCC',
    marginVertical: 20
  },
  section: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#172554'
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    color: '#333',
    marginBottom: 25
  },
  button: {
    backgroundColor: '#1565C0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});