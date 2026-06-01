import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import COLORS from '../constants/colors';
import AppImage from '../components/AppImage'
import { recipeCardStyles as styles } from '../constants/styles';
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



export default RecipeCard;