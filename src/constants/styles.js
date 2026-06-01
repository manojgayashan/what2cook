import { StyleSheet, Platform, Dimensions } from 'react-native';
import COLORS from './colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const globalStyles = StyleSheet.create({
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
        marginRight: 4,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: COLORS.primaryMain,
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

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    searchInput: {
        backgroundColor: COLORS.whiteMain,
        width: windowWidth - 88,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 40,
        borderColor: COLORS.gray200,
        borderWidth: 1,
    },

    searchButton: {
        backgroundColor: COLORS.whiteMain,
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray200,
        borderWidth: 1,
    },

    recipeSheet: {
        position: 'absolute',
        bottom: 66,
        left: 16,
        backgroundColor: COLORS.whiteMain,
        padding: 16,
        width: windowWidth - 32,
        borderRadius: 16,
        shadowColor: COLORS.blackMain,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        borderColor: COLORS.gray200,
        borderWidth: 1,
    },
});

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteMain,
  },
  logoRing: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: COLORS.primaryMain + '14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 20,
    height: 20,
    tintColor: COLORS.primaryMain,
  },
  headerClearBtn: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: '#0B1A2B' + '08',
  },
  headerClearText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B1A2B' + '55',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9,
    backgroundColor: COLORS.primaryMain + '10',
    borderWidth: 1,
    borderColor: COLORS.primaryMain + '22',
  },
  headerBadgeNum: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryMain,
    letterSpacing: -0.3,
  },
  headerBadgeLabel: {
    fontSize: 11,
    color: COLORS.primaryMain + 'AA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 14,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    marginBottom: 8,
    shadowColor: '#0B1A2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 6,
  },
  searchBarFocused: {
    borderColor: COLORS.primaryMain + '18',
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0B1A2B',
    padding: 0,
  },
  searchClear: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0B1A2B' + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: '#F4F7FB',
  },
  categoryScroll: {
    paddingLeft: 16,
    gap: 6,
    paddingRight: 6,
    alignItems: 'center',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
    shadowColor: '#0B1A2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 4,
  },
  categoryEmoji: { fontSize: 12 },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#0B1A2B' + '06',
  },
  controlBtn: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnActive: { backgroundColor: COLORS.primaryMain + '14' },
  controlDivider: {
    width: 1,
    height: 15,
    backgroundColor: '#0B1A2B' + '0E',
    marginHorizontal: 3,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flatCount: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B1A2B' + '30',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingTop: 72,
    gap: 8,
  },
  emptyCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0B1A2B' + '06',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B1A2B' + '50',
  },
  emptySub: {
    fontSize: 13,
    color: '#0B1A2B' + '28',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  groupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  groupEmoji: { fontSize: 16 },
  groupLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B1A2B',
    letterSpacing: -0.1,
  },
  groupPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: COLORS.primaryMain + '14',
  },
  groupPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryMain,
  },
  groupSeeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryMain,
  },
  groupDivider: {
    height: 1,
    backgroundColor: '#0B1A2B' + '07',
    marginBottom: 4,
    marginTop: 4,
  },
  sheet: {
    position: 'absolute',
    bottom: 58,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    shadowColor: '#0B1A2B',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
    elevation: 28,
  },
  sheetMinimized: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
  },
  handleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.white100,
    flex: 1,
  },
  toggleBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    backgroundColor: '#0B1A2B' + '06',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIconActive: { backgroundColor: COLORS.primaryMain },
  statusIconEmpty: { backgroundColor: '#0B1A2B' + '08' },
  statusTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B1A2B',
    letterSpacing: -0.1,
  },
  statusSub: {
    fontSize: 12,
    color: '#0B1A2B' + '45',
    marginTop: 1,
  },
  sheetClearBtn: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: '#0B1A2B' + '07',
  },
  sheetClearText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B1A2B' + '55',
  },
  chipsOuter: {
    position: 'relative',
    marginBottom: 16,
  },
  chipsScroll: {
    gap: 8,
    paddingVertical: 3,
    paddingRight: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 10,
    borderRadius: 22,
    backgroundColor: COLORS.primaryMain + '0F',
    borderWidth: 0,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryMain,
  },
  chipX: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primaryMain + '1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadeEdge: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 44,
  },
  fadeLeft: { left: 0 },
  fadeRight: { right: 0 },
  ctaBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 56,
  },
  ctaBtnDisabled: { opacity: 0.45 },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  ctaLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.15,
  },
  ctaLabelOff: { color: '#0B1A2B' + '40' },
  ctaArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const recipeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 10,
  },
  headerImage: {
    width: windowWidth,
    height: windowWidth,
  },
  topButtons: {
    position: 'absolute',
    top: 62,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 4,
  },
  content: {
    padding: 16,
    paddingBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 2,
  },
  text: {
    fontSize: 14,
    color: COLORS.black700,
  },
  text15: {
    fontSize: 15,
    color: COLORS.blackMain,
    fontWeight: '500',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.98)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 4,
  },
  stickyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black900,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: COLORS.primaryMain + '08',
    color: COLORS.primaryMain,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    
  },
  ingredientsView: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  title2: {
    fontSize: 20,
    color: COLORS.blackMain,
    fontWeight: '500',
  },
  step: {
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  ingredientsImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  ingredient: {
    height: 36,
    width: 36,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primaryMain + '18',
    marginVertical: 4,
    marginRight: 8,
    borderRadius: 10,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const recipeCardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  image: {
    width: windowWidth / 5.5,
    height: windowWidth / 5.5,
    borderRadius: 100,
  },
  infoContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginLeft: -50,
    height: windowWidth / 4.5,
    width: windowWidth - (windowWidth / 8) - 32,
    borderColor: COLORS.gray200,
    borderWidth: 1,
    paddingLeft: (windowWidth / 8) + 16,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    width: windowWidth / 2,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  plate: {
    backgroundColor: COLORS.whiteMain,
    height: windowWidth / 4,
    width: windowWidth / 4,
    borderRadius: windowWidth / 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.gray200,
    borderWidth: 1,
  },
  chip: {
    backgroundColor: COLORS.primaryMain,
    borderRadius: 20,
    marginRight: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    alignItems: 'center',
  },
  chipText: {
    color: COLORS.whiteMain,
    fontSize: 12,
  },
});

export const ingredientItemStyles = StyleSheet.create({
  container: {
    borderRadius: 16,
    margin: 4,
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
});

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteMain,
    paddingTop: 40,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.black900,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.white100,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: COLORS.black900,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black700,
    marginBottom: 12,
  },
  item: {
    fontSize: 16,
    color: COLORS.gray700,
    marginBottom: 10,
  },
});

const HEADER_MIN_HEIGHT = 64;

export const collapsibleHeaderStyles = StyleSheet.create({
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
    // borderBottomWidth: 1,
    // borderColor: COLORS.gray300,
  },
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 99,
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

export const recipeSheetStyles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    shadowColor: '#141414',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.09,
    shadowRadius: 20,
    elevation: 22,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#141414' + '16',
    alignSelf: 'center',
    marginBottom: 18,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  statusIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  statusIconActive: { backgroundColor: COLORS.primaryMain },
  statusIconEmpty: { backgroundColor: '#141414' + '08' },
  statusTitle: { fontSize: 15, fontWeight: '700', color: '#141414', letterSpacing: -0.1 },
  statusSub: { fontSize: 12, color: '#141414' + '45', marginTop: 2 },
  clearBtn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: '#141414' + '07' },
  clearBtnText: { fontSize: 12, fontWeight: '700', color: '#141414' + '55' },
  chipsOuter: { position: 'relative', marginBottom: 16 },
  chipsScroll: { gap: 8, paddingVertical: 3, paddingRight: 16 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 7, paddingLeft: 13, paddingRight: 9,
    borderRadius: 20,
    backgroundColor: COLORS.primaryMain + '0D',
    borderWidth: 1.5, borderColor: COLORS.primaryMain + '2E',
  },
  chipText: { fontSize: 12, fontWeight: '600', color: COLORS.primaryMain },
  chipX: { width: 16, height: 16, borderRadius: 8, backgroundColor: COLORS.primaryMain + '1A', alignItems: 'center', justifyContent: 'center' },
  fadeEdge: { position: 'absolute', top: 0, bottom: 0, width: 40 },
  fadeLeft: { left: 0 },
  fadeRight: { right: 0 },
  ctaBtn: { borderRadius: 16, overflow: 'hidden' },
  ctaBtnDisabled: { opacity: 0.5 },
  ctaGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 17, paddingHorizontal: 24, gap: 12 },
  ctaLabel: { fontSize: 15, fontWeight: '700', color: '#fff', letterSpacing: 0.15 },
  ctaLabelDisabled: { color: '#141414' + '40' },
  ctaArrow: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
});

export const appMarqueeStyles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
  },
  container: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    width: windowWidth - 64,
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.whiteMain,
    fontWeight: '700',
    paddingVertical: 8,
  },
});

export const appImageStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default globalStyles;
