import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import COLORS from '../constants/colors';
import AppImage from '../components/AppImage'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const RecipeCard = ({ recipe }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.plate}>
        <AppImage
          source={{ uri: recipe.image }}
          dummyImage={{ uri: 'https://images.pexels.com/photos/6941027/pexels-photo-6941027.jpeg' }}
          style={styles.image}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{recipe.name}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{recipe.rating}</Text>
          </View>
          <Ionicons name="heart-outline" size={20} color="#FF6B6B" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16
  },
  image: {
    width: windowWidth / 5,
    height: windowWidth / 5,
    borderRadius: 100
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginLeft: -50,
    height: windowWidth / 5,
    width: windowWidth - (windowWidth / 8) - 32,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingLeft: (windowWidth / 8) + 16,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  plate: {
    backgroundColor: COLORS.whiteMain,
    height: windowWidth / 4,
    width: windowWidth / 4,
    borderRadius: windowWidth / 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RecipeCard;