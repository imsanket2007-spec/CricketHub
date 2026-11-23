import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';

import { signOut } from 'firebase/auth';
import { auth } from '../services/FirebaseConfig';

export default function HomeScreen({ navigation }) {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const MenuCard = ({ emoji, title, subtitle, screen }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (screen) {
          navigation.navigate(screen);
        } else {
          Alert.alert('Coming Soon', 'This feature will be available soon.');
        }
      }}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.cardText}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>CRICKET HUB</Text>
          <Text style={styles.welcome}>Welcome, Cricket Fan!</Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerEmoji}>🏏</Text>
        <Text style={styles.bannerTitle}>Your World of Cricket</Text>
        <Text style={styles.bannerSubtitle}>
          Stay connected with the game you love!
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Explore Cricket</Text>

      <MenuCard
        emoji="📰"
        title="Cricket News"
        subtitle="Read the latest cricket updates"
        screen="News"
      />

      <MenuCard
        emoji="⭐"
        title="Favorites"
        subtitle="View your saved articles"
        screen="Favorites"
      />

      <MenuCard
        emoji="👤"
        title="My Profile"
        subtitle="View your account details"
        screen="Profile"
      />

      <MenuCard
        emoji="🏆"
        title="Cricket Discover"
        subtitle="Explore the world of cricket"
        screen="News"
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          CRICKET HUB
        </Text>
        <Text style={styles.footerSub}>
          Live • News • Cricket
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7F5',
  },
  header: {
    backgroundColor: '#092C25',
    padding: 22,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  welcome: {
    color: '#B8D8CA',
    marginTop: 5,
  },
  logout: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#092C25',
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#176B50',
    margin: 18,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  bannerEmoji: {
    fontSize: 55,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bannerSubtitle: {
    color: '#E0F2E9',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#092C25',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 18,
    marginVertical: 7,
    padding: 17,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  emoji: {
    fontSize: 30,
    marginRight: 15,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#092C25',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  arrow: {
    fontSize: 28,
    color: '#176B50',
  },
  footer: {
    alignItems: 'center',
    padding: 25,
  },
  footerText: {
    color: '#092C25',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerSub: {
    color: '#777777',
    marginTop: 5,
  },
});