import {
  View, Text, FlatList, TouchableOpacity,
  ScrollView, Modal, ActivityIndicator, TextInput
} from 'react-native'
import React, { useState, useCallback, useMemo, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import CollapsibleHeader from '../components/CollapsibleHeader'
import Ionicons from '@react-native-vector-icons/ionicons'
import COLORS from '../constants/colors'
import RecipeCard from '../components/RecipeCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { session } from '../../session'
import { useFocusEffect } from '@react-navigation/native'
import globalStyles from '../constants/styles'

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack']
const RATINGS = ['All', '4.5+', '4.7+', '4.9+']
const COOK_TIMES = ['All', 'Under 15 min', 'Under 30 min', 'Under 45 min']
const PAGE_SIZE = 15

const recipeList = require('../constants/recipes.json')

export default function Explore() {

  const navigation = useNavigation()
  const flatListRef = useRef(null)

  const [favourites, setFavourites] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  // Applied filters
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [vegetarianOnly, setVegetarianOnly] = useState(false)
  const [selectedRating, setSelectedRating] = useState('All')
  const [selectedTime, setSelectedTime] = useState('All')

  // Temp filters (inside modal before apply)
  const [tempCategory, setTempCategory] = useState('All')
  const [tempVegetarian, setTempVegetarian] = useState(false)
  const [tempRating, setTempRating] = useState('All')
  const [tempTime, setTempTime] = useState('All')

  useFocusEffect(
    useCallback(() => {
      session('favourites').then((response) => {
        if (response) setFavourites(JSON.parse(response))
      })
    }, [])
  )

  // ─── Reset page & scroll to top ───────────────────────────────────────────

  const resetPage = useCallback(() => {
    setPage(1)
    flatListRef.current?.scrollToOffset({ offset: 0, animated: false })
  }, [])

  // ─── Search ───────────────────────────────────────────────────────────────

  const handleSearch = useCallback((text) => {
    setSearchInput(text)
    resetPage()
  }, [resetPage])

  const clearSearch = useCallback(() => {
    setSearchInput('')
    resetPage()
  }, [resetPage])

  // ─── Filter + Search combined ─────────────────────────────────────────────

  const filteredData = useMemo(() => {
    const query = searchInput.trim().toLowerCase()
    return recipeList.filter(item => {

      // Search — matches name or any ingredient name
      if (query) {
        const nameMatch = item.name.toLowerCase().includes(query)
        const ingMatch = item.ingredients.some(ing =>
          ing.name.toLowerCase().includes(query)
        )
        if (!nameMatch && !ingMatch) return false
      }

      // Filters
      if (selectedCategory !== 'All' && !item.category.includes(selectedCategory)) return false
      if (vegetarianOnly && !item.isVegetarian) return false
      if (selectedRating === '4.5+' && item.rating < 4.5) return false
      if (selectedRating === '4.7+' && item.rating < 4.7) return false
      if (selectedRating === '4.9+' && item.rating < 4.9) return false
      if (selectedTime === 'Under 15 min' && item.time_minutes >= 15) return false
      if (selectedTime === 'Under 30 min' && item.time_minutes >= 30) return false
      if (selectedTime === 'Under 45 min' && item.time_minutes >= 45) return false

      return true
    })
  }, [searchInput, selectedCategory, vegetarianOnly, selectedRating, selectedTime])

  // ─── Pagination ───────────────────────────────────────────────────────────

  const paginatedData = useMemo(() => {
    return filteredData.slice(0, page * PAGE_SIZE)
  }, [filteredData, page])

  const loadMore = useCallback(() => {
    if (loadingMore || paginatedData.length >= filteredData.length) return
    setLoadingMore(true)
    setTimeout(() => {
      setPage(prev => prev + 1)
      setLoadingMore(false)
    }, 300)
  }, [loadingMore, paginatedData.length, filteredData.length])

  // ─── Filter Actions ───────────────────────────────────────────────────────

  const openFilter = useCallback(() => {
    setTempCategory(selectedCategory)
    setTempVegetarian(vegetarianOnly)
    setTempRating(selectedRating)
    setTempTime(selectedTime)
    setShowFilterModal(true)
  }, [selectedCategory, vegetarianOnly, selectedRating, selectedTime])

  const applyFilters = useCallback(() => {
    setSelectedCategory(tempCategory)
    setVegetarianOnly(tempVegetarian)
    setSelectedRating(tempRating)
    setSelectedTime(tempTime)
    setShowFilterModal(false)
    resetPage()
  }, [tempCategory, tempVegetarian, tempRating, tempTime, resetPage])

  const resetTempFilters = useCallback(() => {
    setTempCategory('All')
    setTempVegetarian(false)
    setTempRating('All')
    setTempTime('All')
  }, [])

  const clearAllFilters = useCallback(() => {
    setSelectedCategory('All')
    setVegetarianOnly(false)
    setSelectedRating('All')
    setSelectedTime('All')
    setSearchInput('')
    resetPage()
  }, [resetPage])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedCategory !== 'All') count++
    if (vegetarianOnly) count++
    if (selectedRating !== 'All') count++
    if (selectedTime !== 'All') count++
    return count
  }, [selectedCategory, vegetarianOnly, selectedRating, selectedTime])

  // ─── FlatList helpers ─────────────────────────────────────────────────────

  const keyExtractor = useCallback((item) => item.id.toString(), [])

  const renderItem = useCallback(({ item }) => (
    <RecipeCard
      recipe={item}
      selectedIng={item.ingredients}
      onPress={() => navigation.navigate('Recipe', { recipe: item })}
    />
  ), [navigation])

  const renderFooter = useCallback(() => {
    if (!loadingMore) return <View style={{ height: 100 }} />
    return (
      <View style={{ paddingVertical: 24, alignItems: 'center' }}>
        <ActivityIndicator size="small" color={COLORS.primaryMain} />
      </View>
    )
  }, [loadingMore])

  const getItemLayout = useCallback((_, index) => ({
    length: 120,
    offset: 120 * index,
    index,
  }), [])

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.whiteMain }}>
      <CollapsibleHeader
        title={`Recipes (${filteredData.length})`}
        onLeftPress={() => navigation.goBack()}
        rightIcon={
          <View>
            <Ionicons name="filter" size={24} color={COLORS.black900} />
            {activeFilterCount > 0 && (
              <View style={{
                position: 'absolute', top: -4, right: -4,
                backgroundColor: COLORS.primaryMain,
                borderRadius: 8, width: 16, height: 16,
                alignItems: 'center', justifyContent: 'center'
              }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                  {activeFilterCount}
                </Text>
              </View>
            )}
          </View>
        }
        onRightPress={openFilter}
        collapseArea={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TextInput
              placeholder="Search by name or ingredient..."
              style={[globalStyles.searchInput, { flex: 1 }]}
              value={searchInput}
              onChangeText={handleSearch}
              returnKeyType="search"
              clearButtonMode="never"
            />
            {searchInput.length > 0 && (
              <TouchableOpacity style={globalStyles.searchButton} onPress={clearSearch}>
                <Ionicons name="close" size={20} color={COLORS.black900} />
              </TouchableOpacity>
            )}
          </View>
        }
      >
        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, gap: 8 }}
          >
            {selectedCategory !== 'All' && (
              <FilterChip
                label={selectedCategory}
                onRemove={() => { setSelectedCategory('All'); resetPage() }}
              />
            )}
            {vegetarianOnly && (
              <FilterChip
                label="🥦 Vegetarian"
                onRemove={() => { setVegetarianOnly(false); resetPage() }}
              />
            )}
            {selectedRating !== 'All' && (
              <FilterChip
                label={`⭐ ${selectedRating}`}
                onRemove={() => { setSelectedRating('All'); resetPage() }}
              />
            )}
            {selectedTime !== 'All' && (
              <FilterChip
                label={selectedTime}
                onRemove={() => { setSelectedTime('All'); resetPage() }}
              />
            )}
          </ScrollView>
        )}

        {/* List or empty state */}
        {filteredData.length !== 0 ? (
          <FlatList
            ref={flatListRef}
            data={paginatedData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
            removeClippedSubviews={true}
            maxToRenderPerBatch={8}
            updateCellsBatchingPeriod={50}
            initialNumToRender={8}
            windowSize={5}
            getItemLayout={getItemLayout}
            onEndReached={loadMore}
            onEndReachedThreshold={0.4}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="search-outline" size={48} color={COLORS.black900} style={{ opacity: 0.2 }} />
            <Text style={{ marginTop: 12, color: COLORS.black900, opacity: 0.4, fontSize: 15 }}>
              No recipes found
            </Text>
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={{ marginTop: 8, color: COLORS.primaryMain, fontSize: 14, fontWeight: '600' }}>
                Clear search & filters
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </CollapsibleHeader>

      {/* ─── Filter Modal ─────────────────────────────────────────────────── */}
      <Modal visible={showFilterModal} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <View style={{
            backgroundColor: COLORS.whiteMain,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            paddingBottom: 40
          }}>

            <View style={{
              flexDirection: 'row', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 24
            }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.black900 }}>
                Filters
              </Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color={COLORS.black900} />
              </TouchableOpacity>
            </View>

            <FilterSection title="Category">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {CATEGORIES.map(cat => (
                  <OptionChip
                    key={cat}
                    label={cat}
                    active={tempCategory === cat}
                    onPress={() => setTempCategory(cat)}
                  />
                ))}
              </ScrollView>
            </FilterSection>

            <FilterSection title="Diet">
              <TouchableOpacity
                onPress={() => setTempVegetarian(!tempVegetarian)}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 10,
                  paddingVertical: 10, paddingHorizontal: 16,
                  borderRadius: 20, borderWidth: 1.5,
                  borderColor: tempVegetarian ? COLORS.primaryMain : COLORS.black900 + '30',
                  backgroundColor: tempVegetarian ? COLORS.primaryMain + '18' : 'transparent',
                  alignSelf: 'flex-start'
                }}
              >
                <Text style={{ fontSize: 15 }}>🥦</Text>
                <Text style={{
                  fontWeight: '600', fontSize: 13,
                  color: tempVegetarian ? COLORS.primaryMain : COLORS.black900
                }}>
                  Vegetarian Only
                </Text>
                {tempVegetarian && <Ionicons name="checkmark" size={16} color={COLORS.primaryMain} />}
              </TouchableOpacity>
            </FilterSection>

            <FilterSection title="Min Rating">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {RATINGS.map(r => (
                  <OptionChip key={r} label={r} active={tempRating === r} onPress={() => setTempRating(r)} />
                ))}
              </ScrollView>
            </FilterSection>

            <FilterSection title="Cook Time">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {COOK_TIMES.map(t => (
                  <OptionChip key={t} label={t} active={tempTime === t} onPress={() => setTempTime(t)} />
                ))}
              </ScrollView>
            </FilterSection>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
              <TouchableOpacity
                onPress={resetTempFilters}
                style={{
                  flex: 1, paddingVertical: 14, borderRadius: 12,
                  borderWidth: 1.5, borderColor: COLORS.black900 + '30',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontWeight: '600', color: COLORS.black900, fontSize: 15 }}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={applyFilters}
                style={{
                  flex: 2, paddingVertical: 14, borderRadius: 12,
                  backgroundColor: COLORS.primaryMain, alignItems: 'center'
                }}
              >
                <Text style={{ fontWeight: '700', color: '#fff', fontSize: 15 }}>Apply Filters</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

// ─── Helper Components ────────────────────────────────────────────────────────

function FilterSection({ title, children }) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{
        fontSize: 13, fontWeight: '600', marginBottom: 10,
        color: COLORS.black900, opacity: 0.5,
        textTransform: 'uppercase', letterSpacing: 0.5
      }}>
        {title}
      </Text>
      {children}
    </View>
  )
}

function OptionChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20,
        borderWidth: 1.5,
        borderColor: active ? COLORS.primaryMain : COLORS.black900 + '30',
        backgroundColor: active ? COLORS.primaryMain : 'transparent',
      }}
    >
      <Text style={{ fontWeight: '600', fontSize: 13, color: active ? '#fff' : COLORS.black900 }}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

function FilterChip({ label, onRemove }) {
  return (
    <TouchableOpacity
      onPress={onRemove}
      style={{
        flexDirection: 'row', alignItems: 'center', gap: 6,
        paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20,
        backgroundColor: COLORS.primaryMain + '18',
        borderWidth: 1, borderColor: COLORS.primaryMain
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.primaryMain }}>
        {label}
      </Text>
      <Ionicons name="close" size={13} color={COLORS.primaryMain} />
    </TouchableOpacity>
  )
}