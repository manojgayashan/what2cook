import { View, TextInput, Animated, TouchableOpacity, Text, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import CollapsibleHeader from '../components/CollapsibleHeader'
import COLORS from '../constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import INGREDIENTS from '../constants/INGREDIENTS'
import globalStyles from '../constants/styles'
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import IngredientItem from '../components/IngredientItem';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation()
  const [selected, setSelected] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = React.useState(0);
  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const [recipes, setRecipes] = useState([])

  const recipeList = require('../constants/recipes.json')

  const leftOpacity = scrollX.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const rightOpacity = scrollX.interpolate({
    inputRange: [
      contentWidth - layoutWidth - 20,
      contentWidth - layoutWidth,
    ],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const [filteredIngredients, setFilteredIngredients] = useState(INGREDIENTS);

  const toggleIngredient = (item) => {
    const selectedIngredients = selected.includes(item)? selected.filter((ingredient) => ingredient.id !== item.id): [...selected, item]

    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((ingredient) => ingredient.id !== item.id)
        : [...prev, item]
    );
    setRecipes(getMatchingRecipes(selectedIngredients))
    // console.log(getMatchingRecipes(selectedIngredients).length)
  };


  const search = (text) => {
    setSearchInput(text);

    if (!text.trim()) {
      setFilteredIngredients(INGREDIENTS);
      return;
    }

    const filtered = INGREDIENTS.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredIngredients(filtered);
  }

function getMatchingRecipes(selectedIngredients) {
  if (!selectedIngredients?.length) return []

  const selectedIng = selectedIngredients.map(i =>
    i.name.toLowerCase().trim()
  )

  return recipeList.filter(recipe => {
    const recipeSet = new Set(
      recipe.ingredients.map(i =>
        i.name.toLowerCase().trim()
      )
    )

    return selectedIng.every(ing => recipeSet.has(ing))
  })
}

  return (
    <View style={{ flex: 1 }}>
      <CollapsibleHeader
        title="What2Cook"
        leftIcon={<Ionicons name="menu" size={24} color={COLORS.black900} />}
        rightIcon={<Ionicons name="filter" size={24} color={COLORS.black900} />}
        collapseArea={
          <View style={[globalStyles.row, { paddingBottom: 16 }]}>
            <TextInput
              placeholder='Search ingredient here'
              style={globalStyles.searchInput}
              value={searchInput}
              onChangeText={(text) => { setSearchInput(text); search(text) }}
            />
            <TouchableOpacity style={globalStyles.searchButton} onPress={() => search('')}>
              <Ionicons name="close" size={20} color={COLORS.black900} />
            </TouchableOpacity>
          </View>}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 12, paddingBottom: 200 }}>
          {
            filteredIngredients.map((item, index) => (
              <IngredientItem
                key={index}
                item={item}
                selected={selected.includes(item)}
                onPress={toggleIngredient}
              />
            ))
          }
        </View>
      </CollapsibleHeader>

      {selected.length !== 0 &&
        <Animatable.View key={1} style={globalStyles.recipeSheet} animation={'fadeInUp'}>
          {
            recipes.length==0?
            <Text style={globalStyles.title}>No recipes found</Text>
            :
            <Text style={globalStyles.title} key={recipes.length}>{recipes.length} Recipe{recipes.length==1?'':'s'} Found </Text>
          }
          {/* left gradient */}
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              left: 16,
              top: 60,
              zIndex: 10,
              opacity: leftOpacity,
            }}
          >
            <LinearGradient
              colors={[COLORS.whiteMain, 'rgba(255,255,255,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: 40, width: 80 }}
            />
          </Animated.View>

          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 12 }}
            scrollEventThrottle={16}
            onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
            onContentSizeChange={(w) => setContentWidth(w)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          >
            {selected.map((item, index) => (
              <View key={index} style={globalStyles.chip}>
                <Text style={globalStyles.chipText}>{item.name}</Text>
              </View>
            ))}
          </Animated.ScrollView>

          {/* right gradient */}
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              right: 16,
              top: 60,
              opacity: rightOpacity,
            }}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0)', COLORS.whiteMain]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: 40, width: 80 }}
            />
          </Animated.View>

          <Button
            icon="arrow-right"
            mode="contained"
            contentStyle={{ flexDirection: 'row-reverse' }}
            onPress={() => navigation.navigate('SearchPointer',{data:recipes})}
            buttonColor={COLORS.primaryMain}
            disabled={recipes.length==0}
          >
            Show Recipe{recipes.length==1?'':'s'}
          </Button>

        </Animatable.View>}

    </View>
  )
}