import {
  View, TextInput, Animated, TouchableOpacity,
  Text, Image, ScrollView, StyleSheet, StatusBar, Platform,
} from 'react-native'
import React, {
  useRef, useState, useCallback, useMemo, useEffect,
} from 'react'
import CollapsibleHeader from '../components/CollapsibleHeader'
import COLORS from '../constants/colors'
import Ionicons from '@react-native-vector-icons/ionicons'
// import INGREDIENTS from '../constants/INGREDIENTS-old'
import getIngredients from '../services/ingredientsService'
import getRecipes from '../services/recipesService'
import * as Animatable from 'react-native-animatable'
import IngredientItem from '../components/IngredientItem'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { homeStyles as styles } from '../constants/styles'

// ─── Tokens ───────────────────────────────────────────────────────────────────

const DARK = '#0B1A2B'
const BG = '#F4F7FB'

// ─── Custom animation definitions ────────────────────────────────────────────

Animatable.initializeRegistryWithDefinitions({
  chipIn: {
    from: { opacity: 0, scale: 0.65, translateY: 8 },
    to: { opacity: 1, scale: 1, translateY: 0 },
  },
  sheetUp: {
    from: { opacity: 0, translateY: 90 },
    to: { opacity: 1, translateY: 0 },
  },
  fadeSlideIn: {
    from: { opacity: 0, translateY: -6 },
    to: { opacity: 1, translateY: 0 },
  },
  countPop: {
    0: { scale: 1 },
    0.3: { scale: 1.18 },
    0.6: { scale: 0.94 },
    1: { scale: 1 },
  },
})

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORY_META = {
  protein: { label: 'Protein', emoji: '🥩' },
  dairy: { label: 'Dairy', emoji: '🧀' },
  vegetable: { label: 'Vegetables', emoji: '🥕' },
  herb: { label: 'Herbs', emoji: '🌿' },
  spice: { label: 'Spices', emoji: '🌶️' },
  grain: { label: 'Grains', emoji: '🍚' },
  oil: { label: 'Oils', emoji: '🫒' },
  sauce: { label: 'Sauces', emoji: '🧂' },
  extra: { label: 'Extras', emoji: '🍄' },
}

const CATEGORY_KEYS = ['all', ...Object.keys(CATEGORY_META)]

const SIZE_CONFIG = { small: { columns: 5 }, medium: { columns: 4 }, large: { columns: 3 } }
const SIZE_OPTIONS = [
  { key: 'small', icon: 'grid' },
  { key: 'medium', icon: 'grid-outline' },
  { key: 'large', icon: 'stop-outline' },
]

// ─── Animated Category Chip ───────────────────────────────────────────────────

function CategoryChip({ cat, active, onPress }) {
  const scale = useRef(new Animated.Value(1)).current
  const anim = useRef(new Animated.Value(active ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(anim, { toValue: active ? 1 : 0, duration: 200, useNativeDriver: false }).start()
  }, [active])

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.86, duration: 70, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start()
    onPress(cat)
  }

  const bgColor = anim.interpolate({ inputRange: [0, 1], outputRange: ['transparent', DARK] })
  const borderColor = anim.interpolate({ inputRange: [0, 1], outputRange: [DARK + '18', DARK] })
  const textColor = anim.interpolate({ inputRange: [0, 1], outputRange: [DARK + '88', '#FFFFFF'] })
  const isAll = cat === 'all'
  const meta = CATEGORY_META[cat]

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Animated.View style={[styles.categoryChip, { backgroundColor: bgColor, borderColor }]}>
          {!isAll && <Text style={styles.categoryEmoji}>{meta.emoji}</Text>}
          <Animated.Text style={[styles.categoryLabel, { color: textColor }]}>
            {isAll ? 'All' : meta.label}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  )
}

// ─── Ingredient Chip (in sheet) ───────────────────────────────────────────────

function IngredientChip({ item, onRemove, delay }) {
  const scale = useRef(new Animated.Value(1)).current

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.82, duration: 70, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 70, useNativeDriver: true }),
    ]).start(() => onRemove(item))
  }

  return (
    <Animatable.View
      animation="chipIn"
      duration={300}
      delay={delay}
      easing="ease-out-back"
      useNativeDriver
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity onPress={handlePress} activeOpacity={1} style={styles.chip}>
          <Text style={styles.chipText}>{item.name}</Text>
          <View style={styles.chipX}>
            <Ionicons name="close" size={10} color={COLORS.primaryMain} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animatable.View>
  )
}

// ─── Recipe Count Badge ───────────────────────────────────────────────────────

function RecipeCountBadge({ count }) {
  const prevCount = useRef(count)
  const badgeRef = useRef(null)

  useEffect(() => {
    if (count !== prevCount.current && badgeRef.current) {
      badgeRef.current.animate('countPop', 350)
    }
    prevCount.current = count
  }, [count])

  return (
    <Animatable.View ref={badgeRef} useNativeDriver>
      <Text style={styles.statusTitle}>
        {count === 0
          ? 'No recipes found'
          : `${count} Recipe${count === 1 ? '' : 's'} Found`}
      </Text>
    </Animatable.View>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Home() {

  const navigation = useNavigation()

  const scrollX = useRef(new Animated.Value(0)).current
  const [contentWidth, setContentWidth] = useState(0)
  const [layoutWidth, setLayoutWidth] = useState(0)

  // CTA button animations
  const btnScale = useRef(new Animated.Value(1)).current

  const [selected, setSelected] = useState([])
  const [recipes, setRecipes] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [allRecipes, setAllRecipes] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [cardSize, setCardSize] = useState('medium')
  const [groupedView, setGroupedView] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [sheetExpanded, setSheetExpanded] = useState(true)

  // Pulse CTA whenever recipe count changes
  useEffect(() => {
    if (recipes.length > 0) {
      Animated.sequence([
        Animated.timing(btnScale, { toValue: 0.95, duration: 90, useNativeDriver: true }),
        Animated.spring(btnScale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]).start()
    }
  }, [recipes.length])

  // ─── Load ingredients from Firestore ────────────────────────────────────────
  useEffect(() => {
    let isMounted = true

    async function loadIngredients() {
      const data = await getIngredients()
      console.log('Fetched ingredients:', data)
      if (isMounted && Array.isArray(data) && data.length > 0) {
        setIngredients(data)
      }
    }

    loadIngredients()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    getRecipes()
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setAllRecipes(data)
        }
      })
      .catch((err) => console.log('Error loading recipes:', err))

    return () => {
      isMounted = false
    }
  }, [])

  const getMatchingRecipes = useCallback((sel) => {
    if (!sel?.length) return []

    const names = sel.map(i => i.name.toLowerCase().trim())
    return allRecipes.filter(r => {
      const s = new Set(r.ingredients.map(i => i.name.toLowerCase().trim()))
      return names.every(n => s.has(n))
    })
  }, [allRecipes])

  useEffect(() => {
    if (!selected?.length) {
      setRecipes([])
      return
    }
    setRecipes(getMatchingRecipes(selected))
  }, [allRecipes, selected, getMatchingRecipes])

  // ─── Derived ─────────────────────────────────────────────────────────────

  const filteredIngredients = useMemo(() => {
    const q = searchInput.trim().toLowerCase()
    return ingredients.filter(item => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false
      if (q && !item.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [ingredients, searchInput, activeCategory])

  const groupedIngredients = useMemo(() => {
    const g = {}
    filteredIngredients.forEach(item => {
      if (!g[item.category]) g[item.category] = []
      g[item.category].push(item)
    })
    return g
  }, [filteredIngredients])

  // ─── Chip scroll fades ───────────────────────────────────────────────────

  const leftOpacity = scrollX.interpolate({
    inputRange: [0, 24], outputRange: [0, 1], extrapolate: 'clamp',
  })
  const rightOpacity = scrollX.interpolate({
    inputRange: [contentWidth - layoutWidth - 24, contentWidth - layoutWidth],
    outputRange: [1, 0], extrapolate: 'clamp',
  })

  // ─── Actions ─────────────────────────────────────────────────────────────

  const search = useCallback((t) => setSearchInput(t), [])
  const clearSearch = useCallback(() => setSearchInput(''), [])

  const toggleIngredient = useCallback((item) => {
    setSelected(prev => {
      const next = prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
      setRecipes(getMatchingRecipes(next))
      return next
    })
  }, [])

  const removeIngredient = useCallback((item) => {
    setSelected(prev => {
      const next = prev.filter(i => i.id !== item.id)
      setRecipes(getMatchingRecipes(next))
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setSelected([])
    setRecipes([])
  }, [])

  // ─── Grid ────────────────────────────────────────────────────────────────

  const columns = SIZE_CONFIG[cardSize].columns

  const renderGrid = useCallback((items) => (
    <View style={styles.gridRow}>
      {items.map(item => {
        const isSelected = selected.some(s => s.id === item.id)
        return (
          <IngredientItem
            key={item.id}
            item={item}
            selected={isSelected}
            onPress={toggleIngredient}
            columns={columns}
          />
        )
      })}
    </View>
  ), [selected, toggleIngredient, columns])

  // ─── Toolbar ─────────────────────────────────────────────────────────────

  const StickyToolbar = useMemo(() => (
    <View style={styles.toolbar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
        style={{ flex: 1 }}
      >
        {CATEGORY_KEYS.map(cat => (
          <CategoryChip
            key={cat}
            cat={cat}
            active={activeCategory === cat}
            onPress={setActiveCategory}
          />
        ))}
      </ScrollView>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setGroupedView(v => !v)}
          activeOpacity={0.7}
          style={[styles.controlBtn, groupedView && styles.controlBtnActive]}
        >
          <Ionicons
            name={groupedView ? 'layers' : 'layers-outline'}
            size={15}
            color={groupedView ? COLORS.primaryMain : DARK + '45'}
          />
        </TouchableOpacity>

        <View style={styles.controlDivider} />

        {SIZE_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt.key}
            onPress={() => setCardSize(opt.key)}
            activeOpacity={0.7}
            style={[styles.controlBtn, cardSize === opt.key && styles.controlBtnActive]}
          >
            <Ionicons
              name={opt.icon}
              size={14}
              color={cardSize === opt.key ? COLORS.primaryMain : DARK + '45'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ), [activeCategory, groupedView, cardSize])

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* <StatusBar barStyle="dark-content" backgroundColor={BG} /> */}

      <CollapsibleHeader
        title="What2Cook"
        leftIcon={
          <View style={styles.logoRing}>
            <Image
              source={require('../assets/images/icons/logo.png')}
              style={styles.logo}
            />
          </View>
        }
        rightIcon={
          selected.length > 0 ? (
            <Animatable.View animation="fadeSlideIn" duration={220} useNativeDriver>
              <TouchableOpacity onPress={clearAll} activeOpacity={0.7} style={styles.headerClearBtn}>
                <Text style={styles.headerClearText}>Clear all</Text>
              </TouchableOpacity>
            </Animatable.View>
          ) : (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeNum}>{ingredients.length}</Text>
              <Text style={styles.headerBadgeLabel}> items</Text>
            </View>
          )
        }
        collapseArea={
          <View style={[styles.searchBar, searchFocused && styles.searchBarFocused]}>
            <Ionicons
              name="search-outline"
              size={16}
              color={searchFocused ? COLORS.primaryMain : DARK + '35'}
              style={{ marginRight: 8 }}
            />
            <TextInput
              placeholder="Search ingredients…"
              placeholderTextColor={DARK + '28'}
              style={styles.searchInput}
              value={searchInput}
              onChangeText={search}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              returnKeyType="search"
            />
            {searchInput.length > 0 && (
              <Animatable.View animation="chipIn" duration={180} useNativeDriver>
                <TouchableOpacity onPress={clearSearch} activeOpacity={0.7} style={styles.searchClear}>
                  <Ionicons name="close" size={12} color={DARK + '60'} />
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>
        }
        stickyContent={StickyToolbar}
      >

        {/* ── Ingredient Grid ── */}
        <View style={[
          styles.gridContainer,
          { paddingBottom: selected.length > 0 ? 280 : 100 }
        ]}>

          {filteredIngredients.length === 0 ? (

            <Animatable.View animation="fadeIn" duration={300} style={styles.emptyWrap} useNativeDriver>
              <View style={styles.emptyCircle}>
                <Ionicons name="leaf-outline" size={26} color={DARK + '1E'} />
              </View>
              <Text style={styles.emptyTitle}>Nothing here</Text>
              <Text style={styles.emptySub}>Try a different search or category</Text>
            </Animatable.View>

          ) : groupedView ? (

            Object.entries(groupedIngredients).map(([cat, items], gi) => (
              <Animatable.View
                key={cat}
                animation="fadeIn"
                duration={250}
                delay={gi * 45}
                useNativeDriver
              >
                <TouchableOpacity
                  onPress={() => { setActiveCategory(cat); setGroupedView(false) }}
                  activeOpacity={0.7}
                  style={styles.groupHeader}
                >
                  <View style={styles.groupLeft}>
                    <Text style={styles.groupEmoji}>{CATEGORY_META[cat]?.emoji}</Text>
                    <Text style={styles.groupLabel}>{CATEGORY_META[cat]?.label}</Text>
                    <View style={styles.groupPill}>
                      <Text style={styles.groupPillText}>{items.length}</Text>
                    </View>
                  </View>
                  <View style={styles.groupRight}>
                    <Text style={styles.groupSeeAllText}>See all</Text>
                    <Ionicons name="chevron-forward" size={11} color={COLORS.primaryMain} />
                  </View>
                </TouchableOpacity>

                {renderGrid(items)}
                <View style={styles.groupDivider} />
              </Animatable.View>
            ))

          ) : (

            <Animatable.View animation="fadeIn" duration={220} useNativeDriver>
              <Text style={styles.flatCount}>
                {filteredIngredients.length} ingredient{filteredIngredients.length !== 1 ? 's' : ''}
              </Text>
              {renderGrid(filteredIngredients)}
            </Animatable.View>

          )}
        </View>

      </CollapsibleHeader>

      {/* ─── Recipe Sheet ─────────────────────────────────────────────────── */}
      {selected.length > 0 && (
        <Animatable.View
          animation="sheetUp"
          duration={400}
          easing="ease-out-quart"
          useNativeDriver
          style={[styles.sheet, !sheetExpanded && styles.sheetMinimized]}
        >
          {/* Handle bar with minimize button */}
          <View style={styles.handleRow}>
            <View style={styles.handle} />
            <TouchableOpacity 
              onPress={() => setSheetExpanded(!sheetExpanded)} 
              activeOpacity={0.7}
              style={styles.toggleBtn}
            >
              <Ionicons 
                name={sheetExpanded ? 'chevron-down' : 'chevron-up'} 
                size={20} 
                color={DARK + '55'} 
              />
            </TouchableOpacity>
          </View>

          {/* Status row */}
          <View style={styles.statusRow}>
            <View style={[
              styles.statusIcon,
              recipes.length > 0 ? styles.statusIconActive : styles.statusIconEmpty,
            ]}>
              <Ionicons
                name={recipes.length > 0 ? 'restaurant' : 'sad-outline'}
                size={17}
                color={recipes.length > 0 ? '#fff' : DARK + '40'}
              />
            </View>

            <View style={{ flex: 1 }}>
              <RecipeCountBadge count={recipes.length} />
              {sheetExpanded && (
                <Text style={styles.statusSub}>
                  {recipes.length === 0
                    ? 'Try removing an ingredient'
                    : `Matching ${selected.length} selected ingredient${selected.length !== 1 ? 's' : ''}`}
                </Text>
              )}
            </View>

            {sheetExpanded && (
              <TouchableOpacity onPress={clearAll} activeOpacity={0.7} style={styles.sheetClearBtn}>
                <Text style={styles.sheetClearText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Ingredient chips - only show when expanded */}
          {sheetExpanded && (
          <View style={styles.chipsOuter}>
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onLayout={e => setLayoutWidth(e.nativeEvent.layout.width)}
              onContentSizeChange={w => setContentWidth(w)}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              contentContainerStyle={styles.chipsScroll}
            >
              {selected.map((item, idx) => (
                <IngredientChip
                  key={item.id}
                  item={item}
                  onRemove={removeIngredient}
                  delay={idx * 40}
                />
              ))}
            </Animated.ScrollView>

            {/* Scroll fade edges */}
            <Animated.View pointerEvents="none" style={[styles.fadeEdge, styles.fadeLeft, { opacity: leftOpacity }]}>
              <LinearGradient
                colors={['#fff', 'rgba(255,255,255,0)']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
            <Animated.View pointerEvents="none" style={[styles.fadeEdge, styles.fadeRight, { opacity: rightOpacity }]}>
              <LinearGradient
                colors={['rgba(255,255,255,0)', '#fff']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
          )}

          {/* CTA Button - only show when expanded */}
          {sheetExpanded && (
          <Animated.View style={{ transform: [{ scale: btnScale }] }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchPointer', { data: recipes, selectedIng: selected })}
              disabled={recipes.length === 0}
              activeOpacity={0.88}
              style={[styles.ctaBtn, recipes.length === 0 && styles.ctaBtnDisabled]}
            >
              <LinearGradient
                colors={
                  recipes.length === 0
                    ? [DARK + '0C', DARK + '0C']
                    : [COLORS.primaryMain, COLORS.primaryMain + 'DD']
                }
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.ctaGradient}
              >
                <Text style={[styles.ctaLabel, recipes.length === 0 && styles.ctaLabelOff]}>
                  {recipes.length === 0
                    ? 'No Recipes Available'
                    : `Show ${recipes.length} Recipe${recipes.length === 1 ? '' : 's'}`}
                </Text>
                {recipes.length > 0 && (
                  <View style={styles.ctaArrow}>
                    <Ionicons name="arrow-forward" size={15} color={COLORS.primaryMain} />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          )}

        </Animatable.View>
      )}

    </SafeAreaView>
  )
}

