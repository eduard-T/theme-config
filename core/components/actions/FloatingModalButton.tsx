import { Feather } from '@expo/vector-icons'
import { Link, LinkProps } from 'expo-router'
import { StyleSheet, View } from 'react-native'

// types
type IconType = keyof typeof Feather.glyphMap
export type FloatingModalButtonProps = {
  icon: IconType
  route: LinkProps['href']
}

// constants
const BUTTON_SIZE = 48

// component
export function FloatingModalButton({ icon, route }: FloatingModalButtonProps) {
  return (
    <Link href={route} style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name={icon} size={24} />
      </View>
    </Link>
  )
}

// styling
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  iconContainer: {
    borderRadius: 9999,
    backgroundColor: '#E7E7E7',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
