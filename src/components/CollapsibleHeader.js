import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import COLORS from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 64;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function CollapsibleHeader({
    title,
    leftIcon,
    rightIcon,
    onLeftPress,
    onRightPress,
    children,
    collapseArea
}) {
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const collapseOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <Animated.View style={[styles.header, { height: collapseArea&&headerHeight }]}>
                {/* Top Row */}
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={onLeftPress}>
                        {leftIcon}
                    </TouchableOpacity>

                    <Text style={styles.title}>{title}</Text>

                    <TouchableOpacity onPress={onRightPress}>
                        {rightIcon}
                    </TouchableOpacity>
                </View>

                {collapseArea &&

                    <Animated.View style={[styles.collapseArea, { opacity: collapseOpacity }]}>
                        {collapseArea}
                    </Animated.View>
                }
            </Animated.View>

            {/* Scroll Content */}
            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: collapseArea?HEADER_MAX_HEIGHT:70 }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                nestedScrollEnabled
                
            >
                {children}
            </Animated.ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteMain,
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.whiteMain,
        zIndex: 100,
        elevation: 6,
        paddingHorizontal: 16,
    },

    topRow: {
        height: HEADER_MIN_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.black900,
    },

    collapseArea: {
        paddingBottom: 12,
    },

    subtitle: {
        fontSize: 14,
        color: COLORS.gray700,
    },
});