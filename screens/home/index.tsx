import { FloatingModalButton } from '@components/actions'
import { useConfig } from '@providers/JsonConfigProvider'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Headline } from './components/Headline'
import { ImageCarousel } from './components/ImageCarousel'
import { LinkButton } from './components/LinkButton'

// screen
export function HomeScreen() {

  // bind hooks + props
  const { id, content } = useConfig()
  const { label, link, labelColor, buttonColor } = content.callToAction

  // render
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroContainer}>
          <Headline />
          <LinkButton
            label={label}
            href={link}
            labelColor={labelColor}
            backgroundColor={buttonColor}
          />
        </View>
        <ImageCarousel key={id} />
      </ScrollView>
      <FloatingModalButton icon="settings" route='/settings' />
    </SafeAreaView>
  )
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8
  },
  scrollContainer: {
    overflow: 'visible',
  },
  scrollContent: {
    gap: 24,
  },
  heroContainer: {
    gap: 24,
    paddingHorizontal: 16,
  }
})
