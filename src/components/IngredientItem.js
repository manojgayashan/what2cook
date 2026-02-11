import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import COLORS from '../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function IngredientItem({ item, selected, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(item)}
      style={[
        styles.container,
        selected && styles.activeContainer,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected && styles.activeText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 4,
    height: (windowWidth-56) / 4,
    width: (windowWidth-56) / 4,
    alignItems:'center',
    justifyContent:'center'
  },

  activeContainer: {
    backgroundColor: COLORS.primaryMain,
  },

  text: {
    fontSize: 10,
    color: COLORS.gray700,
    fontWeight: '500',
    textAlign:'center'
  },

  activeText: {
    color: COLORS.whiteMain,
  },
});