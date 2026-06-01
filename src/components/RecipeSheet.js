/**
 * RecipeSheet.js
 *
 * Renders as a sibling of the Navigator in App.js so it sits above
 * the bottom tab bar without blocking touches on the screen behind it.
 *
 * Usage in App.js:
 *
 *   import { RecipeSheetProvider } from './context/RecipeSheetContext'
 *   import RecipeSheet from './components/RecipeSheet'
 *
 *   export default function App() {
 *     return (
 *       <RecipeSheetProvider>
 *         <NavigationContainer>
 *           <RootNavigator />
 *         </NavigationContainer>
 *         <RecipeSheet />   // <-- sibling of NavigationContainer, floats above tabs
 *       </RecipeSheetProvider>
 *     )
 *   }
 */

import React, { useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, Animated, StyleSheet, Platform,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../constants/colors'
import { useRecipeSheet } from '../context/RecipeSheetContext'
import { recipeSheetStyles as styles } from '../constants/styles'

const DARK = '#141414'

export default function RecipeSheet() {
  const { sheetData } = useRecipeSheet()
  const navigation    = useNavigation()

  const scrollX        = useRef(new Animated.Value(0)).current
  const [contentWidth, setContentWidth] = useState(0)
  const [layoutWidth,  setLayoutWidth]  = useState(0)

  if (!sheetData) return null

  const { selected, recipes, onRemove, onClear } = sheetData

  const leftOpacity = scrollX.interpolate({
    inputRange: [0, 24], outputRange: [0, 1], extrapolate: 'clamp',
  })
  const rightOpacity = scrollX.interpolate({
    inputRange: [contentWidth - layoutWidth - 24, contentWidth - layoutWidth],
    outputRange: [1, 0], extrapolate: 'clamp',
  })

  return (
    // pointerEvents="box-none" means THIS view won't catch touches,
    // but its children (the sheet itself) will.
    <View style={styles.root} pointerEvents="box-none">
      <Animatable.View
        animation="slideInUp"
        duration={360}
        easing="ease-out-quart"
        style={styles.sheet}
      >
        <View style={styles.handle} />

        {/* Status row */}
        <View style={styles.statusRow}>
          <View style={[styles.statusIcon, recipes.length > 0 ? styles.statusIconActive : styles.statusIconEmpty]}>
            <Ionicons
              name={recipes.length > 0 ? 'restaurant' : 'sad-outline'}
              size={17}
              color={recipes.length > 0 ? '#fff' : DARK + '40'}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>
              {recipes.length === 0
                ? 'No recipes found'
                : `${recipes.length} Recipe${recipes.length === 1 ? '' : 's'} Found`}
            </Text>
            <Text style={styles.statusSub}>
              {recipes.length === 0
                ? 'Try removing an ingredient'
                : `Matching ${selected.length} ingredient${selected.length !== 1 ? 's' : ''}`}
            </Text>
          </View>
          <TouchableOpacity onPress={onClear} activeOpacity={0.75} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Ingredient chips */}
        <View style={styles.chipsOuter}>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onLayout={e  => setLayoutWidth(e.nativeEvent.layout.width)}
            onContentSizeChange={w => setContentWidth(w)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            contentContainerStyle={styles.chipsScroll}
          >
            {selected.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => onRemove(item)}
                activeOpacity={0.75}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{item.name}</Text>
                <View style={styles.chipX}>
                  <Ionicons name="close" size={9} color={COLORS.primaryMain} />
                </View>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>

          <Animated.View pointerEvents="none" style={[styles.fadeEdge, styles.fadeLeft, { opacity: leftOpacity }]}>
            <LinearGradient colors={['#fff','rgba(255,255,255,0)']} start={{x:0,y:0}} end={{x:1,y:0}} style={StyleSheet.absoluteFill} />
          </Animated.View>
          <Animated.View pointerEvents="none" style={[styles.fadeEdge, styles.fadeRight, { opacity: rightOpacity }]}>
            <LinearGradient colors={['rgba(255,255,255,0)','#fff']} start={{x:0,y:0}} end={{x:1,y:0}} style={StyleSheet.absoluteFill} />
          </Animated.View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchPointer', { data: recipes, selectedIng: selected })}
          disabled={recipes.length === 0}
          activeOpacity={0.88}
          style={[styles.ctaBtn, recipes.length === 0 && styles.ctaBtnDisabled]}
        >
          <LinearGradient
            colors={recipes.length === 0 ? [DARK+'10', DARK+'10'] : [COLORS.primaryMain, COLORS.primaryMain+'E0']}
            start={{x:0,y:0}} end={{x:1,y:0}}
            style={styles.ctaGradient}
          >
            <Text style={[styles.ctaLabel, recipes.length === 0 && styles.ctaLabelDisabled]}>
              {recipes.length === 0 ? 'No Recipes Available' : `Show ${recipes.length} Recipe${recipes.length === 1 ? '' : 's'}`}
            </Text>
            {recipes.length > 0 && (
              <View style={styles.ctaArrow}>
                <Ionicons name="arrow-forward" size={15} color={COLORS.primaryMain} />
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

