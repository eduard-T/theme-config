import { useDebounce } from '@hooks/useDebounce'
import { ForwardedRef, forwardRef } from 'react'
import { Dimensions, FlatList, FlatListProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

// types
export type CarouselProps<TItem extends any> = Omit<FlatListProps<TItem>,
  | 'columnWrapperClassName'
  | 'columnWrapperStyle'
  | 'numColumns'
> & {
  itemWidth?: number
  onItemScroll?: (indexInView: number) => void
  onProgressChange?: (position: number) => void
  onItemViewed?: (index: number) => void
}

// constants
const SCREEN_WIDTH = Dimensions.get('screen').width

// component
function ICarousel<TItem>({
  data,
  renderItem,
  initialNumToRender = 3,
  windowSize,
  itemWidth = SCREEN_WIDTH,
  onProgressChange,
  onItemViewed,
  style,
  ...props
}: CarouselProps<TItem>, forwardRef: ForwardedRef<FlatList>) {

  // helpers
  const onObserve = useDebounce(visibleIndex => {
    onItemViewed?.(visibleIndex)
  }, 700)

  const handleVisibility = (event: NativeSyntheticEvent<NativeScrollEvent>, callback?: (visibleIndex: number) => void) => {
    const indexInView = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width)
    callback?.(indexInView)
  }

  // bail if not ready (should never happen)
  if (!data || !renderItem) {
    return null
  }

  // render
  return (
    <FlatList
      ref={forwardRef}
      style={[{ overflow: 'visible' }, style]}
      scrollEnabled={data.length > 1}
      scrollEventThrottle={64}
      horizontal
      windowSize={windowSize ?? ((initialNumToRender * 2) + 1)}
      bounces={false}
      bouncesZoom={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      pinchGestureEnabled={false}
      snapToInterval={itemWidth}
      snapToAlignment="center"
      decelerationRate="fast"
      overScrollMode="never"
      disableIntervalMomentum
      disableScrollViewPanResponder
      onScrollToIndexFailed={info =>
        console.debug('[Carousel] failed to scroll to index:', info.index)
      }
      onScroll={(event) => handleVisibility(event, onProgressChange)}
      onMomentumScrollEnd={(event) => handleVisibility(event, visibleIndex => {
        onObserve(visibleIndex)
      })}
      getItemLayout={(_, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
      })}
      data={data}
      initialNumToRender={initialNumToRender}
      renderItem={renderItem}
      {...props}
    />
  )
}

export const Carousel = forwardRef(ICarousel)
