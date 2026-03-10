import React from 'react';
import { Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import COLORS from '../constants/colors';
import AppImage from './AppImage';

const MARGIN = 4
const GRID_PADDING = 32 // 16px each side from parent

export default function IngredientItem({ item, selected, onPress, columns = 4 }) {

  const { width: screenWidth } = useWindowDimensions()
  const itemSize = (screenWidth - GRID_PADDING - MARGIN * 2 * columns) / columns

  const imageSize = itemSize * 0.45
  const fontSize = columns <= 3 ? 12 : columns === 4 ? 10 : 9

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item)}
      style={[
        styles.container,
        {
          width: itemSize,
          height: itemSize,
          borderColor: selected ? COLORS.primaryMain : COLORS.gray200,
          backgroundColor: selected ? COLORS.primaryMain : COLORS.whiteMain,
        }
      ]}
    >
      <AppImage
        source={item.image}
        style={{ width: imageSize, height: imageSize }}
      />
      <Text
        style={[
          styles.text,
          { fontSize },
          selected && styles.activeText,
        ]}
        numberOfLines={2}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    margin: MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  text: {
    color: COLORS.gray700,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  activeText: {
    color: COLORS.whiteMain,
  },
})