import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Text } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import COLORS from '../constants/colors';

const { width: windowWidth } = Dimensions.get('window');

const Marquee = ({
  children,
  duration = 800,
  interval = 2000,
  reverse = false,
}) => {
  const translateX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const childrenArray = React.Children.toArray(children);
  const total = childrenArray.length;

  const startAnimation = () => {
    const nextIndex =
      currentIndex === total - 1 ? 0 : currentIndex + 1;

    const direction = reverse ? 1 : -1;

    translateX.value = withSequence(
      withDelay(
        interval,
        withTiming(direction * windowWidth * nextIndex, {
          duration: duration,
          easing: Easing.out(Easing.ease),
        })
      )
    );

    setTimeout(() => {
      setCurrentIndex(nextIndex);
    }, interval + duration);
  };

  useEffect(() => {
    const loop = setInterval(() => {
      startAnimation();
    }, interval + duration);

    return () => clearInterval(loop);
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.row, animatedStyle]}>
        {childrenArray.map((child, index) => (
          <View key={index} style={{ width: windowWidth }}>
            {child}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default function AppMarquee({
    texts
}) {
  return (
    <View style={styles.screen}>
      <Marquee duration={600} interval={6000}>
        {
            texts&&texts.map((text,index)=>{
                return(
                    <Text key={index} style={styles.text}>{text}</Text>
                )
            })
        }
      </Marquee>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    justifyContent: 'center',
  },
  container: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    width: windowWidth-64,
    textAlign: 'center',
    fontSize: 20,
    color:COLORS.whiteMain,
    fontWeight:'700',
    paddingVertical:8
  },
});