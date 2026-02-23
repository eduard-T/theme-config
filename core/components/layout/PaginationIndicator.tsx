import { useCallback, useDeferredValue, useLayoutEffect, useMemo, useRef } from 'react'
import { FlatList, ListRenderItemInfo, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Animated, { Easing, LinearTransition } from 'react-native-reanimated'

// types
type PaginationIndicatorProps = {
  currentPage: number
  numOfPages: number
}

// constants
const DEFAULT_DOT_SIZE = 8
const DotStyle = {
  ACTIVE: { size: DEFAULT_DOT_SIZE, opacity: 1 },
  INACTIVE: { size: DEFAULT_DOT_SIZE * 0.9, opacity: 0.8 },
  MEDIUM: { size: DEFAULT_DOT_SIZE * 0.75, opacity: 0.7 },
  SMALL: { size: DEFAULT_DOT_SIZE * 0.5, opacity: 0.5 },
} as const

// component
export function PaginationIndicator({
  currentPage,
  numOfPages,
}: PaginationIndicatorProps) {

  // bind hooks
  const flatListRef = useRef<FlatList>(null)
  const prevPage = useDeferredValue(currentPage)
  const dots = useMemo(() => [...Array(numOfPages).keys()], [numOfPages])

  // scroll lifecycle
  useLayoutEffect(() => {
    const scrollFrameId = requestAnimationFrame(() => {
      if (numOfPages > 4 && prevPage !== currentPage) {
        flatListRef.current?.scrollToIndex({ index: currentPage, viewPosition: 0.5 })
      }
    })

    // unmount
    return cancelAnimationFrame(scrollFrameId)
  }, [prevPage, currentPage, numOfPages])

  const renderDotIndicator = useCallback(({ index }: ListRenderItemInfo<number>) => (
    <Dot
      key={index}
      style={{ backgroundColor: currentPage === index
          ? '#DEDEDE'
          : '#676767'
      }}
      position={index}
      currentPage={currentPage}
      numOfPages={numOfPages}
    />
  ), [currentPage, numOfPages])

  // render
  const dotLayout = DEFAULT_DOT_SIZE + 8 // dot size + margin
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        pointerEvents="none"
        scrollEnabled={false}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        itemLayoutAnimation={LinearTransition.easing(Easing.out(Easing.quad)).duration(200)}
        renderToHardwareTextureAndroid
        horizontal
        windowSize={15}
        data={dots}
        getItemLayout={(_, index) => ({
          length: dotLayout,
          offset: dotLayout * index,
          index,
        })}
        renderItem={renderDotIndicator}
      />
    </View>
  )
}

// utility elements
const Dot = ({ style, position, currentPage, numOfPages }: {
  style: StyleProp<ViewStyle>
  position: number
  currentPage: number
  numOfPages: number
}) => {

  // bind hooks + props
  const prevDotThreshold = currentPage <= 2 ? 6 : currentPage + 3
  const nextDotThreshold = currentPage >= numOfPages - 3 ? numOfPages - 7 : currentPage - 3

  // show nothing if outside of render window
  if (position > prevDotThreshold || position < nextDotThreshold) {
    return null
  }

  // otherwise, generate dot style
  const { size, opacity } = dotStyleFor({
    position,
    currentPage,
    numOfPages,
  })

  // render
  return (
    <View
      style={[{
        flexShrink: 0,
        borderRadius: 9999,
        marginHorizontal: 4,
        width: size,
        height: size,
        opacity,
      }, style]}
    />
  )
}

// utility functions
function dotStyleFor({
  position,
  currentPage,
  numOfPages,
}: {
  position: number
  currentPage: number
  numOfPages: number
}) {

  // calculate distances
  const distanceToEnd = Math.abs((numOfPages - 1) - position)
  const currentDistance = Math.abs(position - currentPage)

  // active state
  if (position === currentPage) {
    return DotStyle.ACTIVE
  }

  // when not scrollable, show all as inactive
  if (numOfPages < 5) {
    return DotStyle.INACTIVE
  }

  // handle first 3 positions when current page is early
  if (currentPage < 3) {
    if (position < 5) {
      return DotStyle.INACTIVE
    } else if (position < 6) {
      return DotStyle.MEDIUM
    }
  }

  // handle last 3 positions when current page is late
  if (currentPage >= numOfPages - 3) {
    if (distanceToEnd < 5) {
      return DotStyle.INACTIVE
    } else if (distanceToEnd < 6) {
      return DotStyle.MEDIUM
    }
  }

  // dots one position away
  if (currentDistance === 1) {
    return DotStyle.INACTIVE
  }

  // dots two positions away
  if (currentDistance === 2) {
    return DotStyle.MEDIUM
  }

  return DotStyle.SMALL
}

// stylesheet
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
  },
  list: {
    maxWidth: 100,
    height: 8,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
