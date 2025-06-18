import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import * as Analytics from 'expo-firebase-analytics';

const categories = [
  { name: 'Men', products: Array.from({length: 10}, (_, i) => `Men Item ${i+1}`) },
  { name: 'Women', products: Array.from({length: 10}, (_, i) => `Women Item ${i+1}`) },
  { name: 'Kids', products: Array.from({length: 10}, (_, i) => `Kids Item ${i+1}`) },
  { name: 'Accessories', products: Array.from({length: 10}, (_, i) => `Accessory Item ${i+1}`) }
];

const articles = Array.from({length: 5}, (_, i) => `Reading Content ${i+1}`);

export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      Analytics.logEvent('location_obtained', {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      });
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Apparel EC Sample</Text>
      <Text style={styles.subHeader}>Articles</Text>
      {articles.map((a, idx) => (
        <Text key={idx} style={styles.article}>{a}</Text>
      ))}
      {categories.map((cat, idx) => (
        <View key={idx} style={styles.category}>
          <Text style={styles.categoryTitle}>{cat.name}</Text>
          {cat.products.map((p, i) => (
            <Text key={i} style={styles.product}>{p}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  article: {
    marginVertical: 4
  },
  category: {
    marginTop: 20
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  product: {
    marginLeft: 10,
    marginVertical: 2
  }
});
