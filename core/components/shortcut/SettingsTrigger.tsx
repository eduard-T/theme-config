import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

// constants
const BUTTON_SIZE = 48

// component
export function SettingsTrigger() {
  return (
    <Link href='/settings' style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="settings" size={24} />
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
