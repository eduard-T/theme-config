import { Body, Heading } from '@components/typography'
import { Feather } from '@expo/vector-icons'
import type { ConfigKey } from '@providers/JsonConfigProvider'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ConfigOption } from './components/ConfigOption'

// constants
const CONFIG_OPTIONS: [ConfigKey, string][] = [
  ['brandA', 'Brand A'],
  ['brandB', 'Brand B'],
  ['brandC', 'Brand C'],
]

// screen
export function SettingsScreen() {

  // render
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={Platform.select({ ios: 'light', android: 'dark' })} />
      <Pressable style={styles.dismissButton} onPress={() => router.dismiss()}>
        <Feather name='x' size={32} />
      </Pressable>
      <Heading>Configuration Settings</Heading>
      <Body>Select an option to swap the configuration file being used by the application. The changes will apply automatically and dismiss this modal.</Body>
      <ScrollView style={styles.optionContainer} contentContainerStyle={styles.optionContent}>
        {CONFIG_OPTIONS.map(([key, label]) => (
          <ConfigOption
            key={key}
            option={key}
            label={label}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  dismissButton: {
    alignSelf: 'flex-end',
    paddingRight: 8,
    paddingBottom: 16,
  },
  optionContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
  },
  optionContent: {
    paddingTop: 24,
    gap: 16,
  },
})
