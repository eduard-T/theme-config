import { Carousel, PaginationIndicator } from '@components/layout'
import { useConfig } from '@providers/JsonConfigProvider'
import { useCallback, useState } from 'react'
import { Dimensions, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { ImageCard } from './ImageCard'

// constants
const SCREEN_WIDTH = Dimensions.get('screen').width

// component
export function ImageCarousel() {

  // bind hooks + props
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const { content } = useConfig()
  const { display, images } = content.carousel

  // helpers
  const renderImageItem = useCallback(({ item }: ListRenderItemInfo<string>) => (
    <View key={item} style={styles.item}>
      <ImageCard uri={item} orientation={display} />
    </View>
  ), [display])

  // render
  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        onProgressChange={position => setCurrentIndex(position)}
        renderItem={renderImageItem}
      />
      <PaginationIndicator currentPage={currentIndex} numOfPages={images.length} />
    </View>
  )
}

// styling
const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  item: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    borderRadius: 8,
  }
})
