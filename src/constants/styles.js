import { StyleSheet, Platform, Dimensions } from 'react-native';
import COLORS from './colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteMain,
    },

    card: {
        backgroundColor: COLORS.whiteMain,
        borderRadius: 16,
        padding: 16,
        shadowColor: COLORS.blackMain,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.gray900,
    },

    primaryTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.primaryMain,
    },

    subtitle: {
        fontSize: 16,
        color: COLORS.gray700,
    },

    bodyText: {
        fontSize: 14,
        color: COLORS.grayMain,
    },

    primaryButton: {
        backgroundColor: COLORS.primaryMain,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    primaryButtonText: {
        color: COLORS.whiteMain,
        fontSize: 16,
        fontWeight: '600',
    },

    secondaryButton: {
        backgroundColor: COLORS.primary100,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: COLORS.primary700,
        fontSize: 16,
        fontWeight: '600',
    },

    input: {
        backgroundColor: COLORS.gray100,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 14 : 10,
        color: COLORS.gray900,
    },

    chip: {
        backgroundColor: COLORS.whiteMain,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight:4,
        marginBottom:4,
        borderWidth:1,
        borderColor:COLORS.primaryMain
    },

    chipActive: {
        backgroundColor: COLORS.primaryMain,
    },

    chipText: {
        color: COLORS.gray700,
        fontSize: 13,
    },

    chipTextActive: {
        color: COLORS.whiteMain,
    },

    list: {
        paddingHorizontal: 12,
        paddingBottom: 24,
    },

    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    searchInput:{
        backgroundColor:COLORS.whiteMain,
        width:windowWidth-88,
        borderRadius:16,
        paddingHorizontal:16,
        height:40,
        borderColor:COLORS.gray200,
        borderWidth:1
    },

    searchButton:{
        backgroundColor:COLORS.whiteMain,
        height:40,
        width:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        borderColor:COLORS.gray200,
        borderWidth:1
    },

    recipeSheet:{
        position:'absolute',
        bottom:66,
        left:16,
        backgroundColor:COLORS.whiteMain,
        padding:16,
        width:windowWidth-32,
        borderRadius:16,
        shadowColor: COLORS.blackMain,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        borderColor:COLORS.gray200,
        borderWidth:1
    }
});

export default globalStyles;