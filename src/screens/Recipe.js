import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons';
import Lucide from '@react-native-vector-icons/lucide';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import COLORS from '../constants/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import AppImage from '../components/AppImage';
import INGREDIENTS from '../constants/INGREDIENTS';
import LinearGradient from 'react-native-linear-gradient';
import { session } from '../../session'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HEADER_MAX_HEIGHT = windowWidth
const HEADER_MIN_HEIGHT = 120
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const adUnitId = 'ca-app-pub-9079412151911301/9869949564';


export default function Recipe() {

  const navigation = useNavigation()
  const route = useRoute()
  const recipe = route.params?.recipe
  const scrollY = useRef(new Animated.Value(0)).current

  const headerHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  })

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE / 2, SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  })

  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [SCROLL_DISTANCE / 2, SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  function getIngredientImage(name) {
    return INGREDIENTS.find(
      i => i.name.toLowerCase() === name.toLowerCase()
    )?.image
  }

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [favourites, setFavourites] = useState([])

  const getFavourites =()=>{

    session('favourites')
      .then((response) => {
        if(response){
          setFavourites(JSON.parse(response))
        }
      })
  }

  const toggleFavourite = () => {
    // console.log(recipe.id)
    session('favourites')
      .then((response) => {
        let fav = []
        if (response) {
          fav = JSON.parse(response)
          if (fav.includes(recipe.id)) {
            // fav.filter(item => item !== recipe.id)
            let index = fav.indexOf(recipe.id);
            fav.splice(index, 1)
            console.log('included', fav)
            session('favourites', JSON.stringify(fav))
          }
          else {
            fav.push(recipe.id)
            console.log('not included', fav)
            session('favourites', JSON.stringify(fav))

          }
        }
        else {
          fav.push(recipe.id)
          console.log('first', fav)
          session('favourites', JSON.stringify(fav))
        }
        getFavourites()
        // console.log(fav)
      })
  }

  useEffect(() => {
    getFavourites()
  
    return () => {
      getFavourites()
    }
  }, [])
  

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
      <LinearGradient
        colors={[COLORS.blackMain, 'rgba(255,255,255,0)']}
        style={{ height: 50, width: windowWidth, position: 'absolute', top: 0, zIndex: 9999 }}
      />
      {/* COLLAPSING IMAGE HEADER */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>

        <Animated.Image
          source={{ uri: error ? 'https://images.pexels.com/photos/6941027/pexels-photo-6941027.jpeg' : recipe.image }}
          style={[styles.headerImage, { opacity: imageOpacity }]}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false)
            setError(true)
          }}
        />

        {/* NAV BUTTONS */}
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.black900} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleBtn} onPress={() => toggleFavourite()}>
            <Ionicons name={favourites.includes(recipe.id)?"heart":"heart-outline"} size={24} color={COLORS.blackMain} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* STICKY HEADER */}
      <Animated.View style={[styles.stickyHeader, { opacity: stickyHeaderOpacity }]}>
        <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black900} />
        </TouchableOpacity>

        <Text style={styles.stickyTitle}>{recipe.name}</Text>

        <TouchableOpacity style={styles.circleBtn} onPress={() => toggleFavourite()}>
          <Ionicons name={favourites.includes(recipe.id)?"heart":"heart-outline"} size={24} color={COLORS.blackMain} />
        </TouchableOpacity>
      </Animated.View>

      {/* CONTENT */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>

          <View style={{ alignItems: 'center', marginBottom: 16, padding: 16, paddingHorizontal: 0, borderBottomWidth: 1, paddingTop: 0, borderColor: COLORS.gray300 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title}>{recipe.name}</Text>
              {/* <View style={styles.row}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={{ fontSize: 14 }}> {recipe.rating}</Text>
            </View> */}
            </View>

            <View style={[styles.row, { marginTop: 8 }]}>
              {
                recipe.category.map((cat, index) => {
                  return (
                    <Text key={index} style={styles.category}>{cat}</Text>
                  )
                })
              }
            </View>

            {/* <View> */}
            {/* <Text style={[styles.title2,{marginBottom:8}]}>About</Text> */}
            <Text style={[styles.text15, { fontWeight: '400' }]}>{recipe.about}</Text>
            {/* </View> */}

            <View style={[styles.row, { width: windowWidth, paddingHorizontal: 16, paddingTop: 12, justifyContent: 'space-between' }]}>
              <View style={[styles.row, { paddingRight: 12 }]}>
                <MaterialDesignIcons name="clock-outline" size={20} color={COLORS.primaryMain} />
                <Text style={styles.text}>  {recipe.time_minutes} mins</Text>
              </View>
              <View style={[styles.row, { paddingRight: 12 }]}>
                <MaterialDesignIcons name="fire" size={20} color={COLORS.primaryMain} />
                <Text style={styles.text}>  {recipe.calories} cal</Text>
              </View>
              <View style={[styles.row, { paddingRight: 12 }]}>
                <Image source={require('../assets/images/icons/plate.png')} style={{ width: 18, height: 18, tintColor: COLORS.primaryMain }} />
                <Text style={styles.text}>  {recipe.portion} serve</Text>
              </View>

              {recipe.isVegetarian && <View style={styles.row}>
                <Lucide name="vegan" size={16} color={COLORS.primaryMain} />
                <Text style={styles.text}> veg</Text>
              </View>}

            </View>


          </View>


          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.BANNER}
          />
          <View style={styles.ingredientsView}>
            <Text style={[styles.title2, { marginBottom: 8 }]}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, i) => (
              <View key={i} style={{ borderBottomWidth: 1, paddingVertical: 4, borderColor: COLORS.gray300 }}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                  <View style={styles.row}>
                    <View style={styles.ingredient}>
                      <AppImage source={getIngredientImage(ingredient.name) ? getIngredientImage(ingredient.name) : require('../assets/images/dummy.png')} style={[styles.ingredientsImage, { tintColor: getIngredientImage(ingredient.name) ? 'none' : COLORS.gray500 }]} />
                    </View>
                    <Text style={styles.text15}>{ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}</Text>
                  </View>
                  <Text style={styles.text15}>{ingredient.weight}</Text>
                </View>
              </View>
            ))}
          </View>


          <View>
            <Text style={[styles.title2, { marginBottom: 8 }]}>Steps</Text>
            {recipe.steps.map((step, i) => (
              <View key={i} style={styles.step}>
                <Text style={[styles.text15, { color: COLORS.primaryMain, paddingBottom: 6 }]}>Step {i + 1}</Text>
                <Text style={styles.text15}>{step}</Text>
              </View>
            ))}
          </View>


          <View style={{ paddingTop: 12, marginLeft: -16 }}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
            />
          </View>

        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 10,
  },
  headerImage: {
    width: windowWidth,
    height: windowWidth,
  },
  topButtons: {
    position: 'absolute',
    top: 65,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    color: COLORS.black700,
  },
  text15: {
    fontSize: 15,
    color: COLORS.blackMain,
    fontWeight: '500'
    // paddingTop: 4,

  },
  // STICKY HEADER STYLES
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    backgroundColor: COLORS.whiteMain,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50, // status bar padding
    zIndex: 20,
  },
  stickyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black900,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  category: {
    marginRight: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.primaryMain,
    color: COLORS.primaryMain,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8
  },
  ingredientsView: {
    padding: 16,
    backgroundColor: COLORS.gray100,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 16
  },
  title2: {
    fontSize: 20,
    color: COLORS.blackMain,
    fontWeight: '500',
  },
  step: {
    backgroundColor: COLORS.primary100,
    marginVertical: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary300
  },
  ingredientsImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  ingredient: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.primaryMain,
    marginVertical: 4,
    marginRight: 8,
    borderRadius: 8,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
})