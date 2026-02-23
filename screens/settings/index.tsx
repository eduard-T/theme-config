import { Body, Heading } from '@components/typography'
import type { ConfigKey } from '@providers/JsonConfigProvider'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
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
    <View style={styles.container}>
      <Heading>Configuration Settings</Heading>
      <Body>Select an option to swap the configuration file being used by the application. The changes will apply automatically and dismiss this modal.</Body>
      <Body>If you changed your mind and want to exit,{Platform.OS === 'android' && ' press the back button or'} simply swipe down.</Body>
      <ScrollView style={styles.optionContainer} contentContainerStyle={styles.optionContent}>
        {CONFIG_OPTIONS.map(([key, label]) => (
          <ConfigOption
            key={key}
            option={key}
            label={label}
          />
        ))}
      </ScrollView>
    </View>
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
  optionContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
  },
  optionContent: {
    paddingTop: 24,
    gap: 16,
  },
})
