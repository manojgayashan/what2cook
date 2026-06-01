import React, { useRef, Children } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    StatusBar,
    FlatList,
} from 'react-native';
import COLORS from '../constants/colors';
import { collapsibleHeaderStyles as styles } from '../constants/styles';

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
            {/* <StatusBar barStyle="dark-content" /> */}

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
            {(() => {
                const child = Children.count(children) === 1 ? Children.only(children) : null;
                const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

                const paddingTop = collapseArea
                    ? HEADER_MAX_HEIGHT + (stickyContent ? 52 : 0)
                    : 70 + (stickyContent ? 52 : 0);

                // If the single child is a FlatList (VirtualizedList), render it directly as Animated.FlatList
                if (child && (child.type === FlatList || child.type?.displayName === 'FlatList' || child.type?.name === 'FlatList')) {
                    const childProps = child.props || {};

                    const mergedContentStyle = [
                        childProps.contentContainerStyle || {},
                        { paddingTop },
                    ];

                    // Merge onScroll handlers: our Animated.event + child's own onScroll
                    const childOnScroll = childProps.onScroll;
                    const animatedOnScroll = Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    );

                    const combinedOnScroll = (e) => {
                        animatedOnScroll(e);
                        if (typeof childOnScroll === 'function') childOnScroll(e);
                    };

                    return (
                        <AnimatedFlatList
                            {...childProps}
                            contentContainerStyle={mergedContentStyle}
                            onScroll={combinedOnScroll}
                            scrollEventThrottle={16}
                            nestedScrollEnabled
                            style={[{ backgroundColor: COLORS.gray100 }, childProps.style]}
                        />
                    );
                }

                // Fallback: use ScrollView for other children
                return (
                    <Animated.ScrollView
                        contentContainerStyle={{ paddingTop }}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        nestedScrollEnabled
                        style={{ backgroundColor: COLORS.white100 }}
                    >
                        {children}
                    </Animated.ScrollView>
                );
            })()}
        </View>
    );
}

