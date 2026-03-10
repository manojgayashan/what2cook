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
    collapseArea,
    stickyContent,        // ← new prop
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

    // Total top offset for the sticky bar = header height (animated)
    const stickyTop = collapseArea ? headerHeight : HEADER_MIN_HEIGHT;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Animated Header */}
            <Animated.View style={[styles.header, { height: collapseArea ? headerHeight : HEADER_MIN_HEIGHT }]}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={onLeftPress}>
                        {leftIcon}
                    </TouchableOpacity>

                    <Text style={styles.title}>{title}</Text>

                    <TouchableOpacity onPress={onRightPress}>
                        {rightIcon}
                    </TouchableOpacity>
                </View>

                {collapseArea && (
                    <Animated.View style={[styles.collapseArea, { opacity: collapseOpacity }]}>
                        {collapseArea}
                    </Animated.View>
                )}
            </Animated.View>

            {/* Sticky content bar — sits below the header, above the scroll */}
            {stickyContent && (
                <Animated.View style={[styles.stickyBar, { top: stickyTop }]}>
                    {stickyContent}
                </Animated.View>
            )}

            {/* Scroll Content */}
            <Animated.ScrollView
                contentContainerStyle={{
                    paddingTop: collapseArea
                        ? HEADER_MAX_HEIGHT + (stickyContent ? 52 : 0)
                        : 70 + (stickyContent ? 52 : 0),
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                nestedScrollEnabled
                style={{ backgroundColor: COLORS.gray100 }}
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
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: COLORS.gray300,
    },
    stickyBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 99,                         // just below header
        backgroundColor: COLORS.whiteMain,
        borderBottomWidth: 1,
        borderColor: COLORS.gray300,
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
});