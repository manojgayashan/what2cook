import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import COLORS from '../constants/colors';
import AppImage from '../components/AppImage'
import globalStyles from '../constants/styles';
import { session } from '../../session';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RecipeCard = ({ recipe, selectedIng, onPress }) => {

  const [favourites, setFavourites] = useState([])

  function prioritizeIngredients(ingredients, selectedIngredients) {
    const selectedNames = new Set(
      selectedIngredients.map(i => i.name.toLowerCase())
    )

    return [
      ...ingredients.filter(i =>
        selectedNames.has(i.name.toLowerCase())
      ),
      ...ingredients.filter(i =>
        !selectedNames.has(i.name.toLowerCase())
      ),
    ]
  }
  const getFavourites = () => {
    session('favourites')
      .then((response) => {
        if (response) {
          setFavourites(JSON.parse(response))
        }
      })
  }

  useEffect(() => {
    getFavourites()

    return () => {
      getFavourites()
    }
  }, [])


  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.plate}>
        <AppImage
          source={{ uri: recipe.image }}
          dummyImage={{ uri: 'https://images.pexels.com/photos/6941027/pexels-photo-6941027.jpeg' }}
          style={styles.image}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{recipe.rating}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {selectedIng &&
              prioritizeIngredients(recipe.ingredients, selectedIng).map((ing, index) => {
                return (
                  index < 2 &&
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{ing.name}</Text>
                  </View>
                )
              })
            }
            {
              selectedIng && recipe.ingredients.length > 2 &&
              <Text style={{ color: COLORS.gray700, fontSize: 12, }}> + {recipe.ingredients.length - 2}</Text>
            }

          </View>
          <Ionicons name={favourites && favourites.includes(recipe.id) ? 'heart' : "heart-outline"} size={20} color={COLORS.primaryMain} />
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
    width: windowWidth / 5.5,
    height: windowWidth / 5.5,
    borderRadius: 100,
    // borderColor: COLORS.gray200,
    // borderWidth: 1,
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginLeft: -50,
    height: windowWidth / 4.5,
    width: windowWidth - (windowWidth / 8) - 32,
    borderColor: COLORS.gray200,
    borderWidth: 1,
    paddingLeft: (windowWidth / 8) + 16,
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    width: windowWidth / 2
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
    justifyContent: 'center',
    borderColor: COLORS.gray200,
    borderWidth: 1,
  },
  chip: {
    backgroundColor: COLORS.primaryMain,
    borderRadius: 20,
    marginRight: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignItems: 'center'
  },
  chipText: {
    color: COLORS.whiteMain,
    fontSize: 12
  }
});

export default RecipeCard;