import { Body } from '@components/typography'
import { type ConfigKey, useConfig } from '@providers/JsonConfigProvider'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'

// types
type ConfigOptionProps = {
  option: ConfigKey
  label: string
}

// component
export function ConfigOption({ option, label }: ConfigOptionProps) {

  // bind hooks + props
  const { id, swapConfig } = useConfig()
  const isActive = option === id

  // helpers
  const onConfigSet = async () => {
    swapConfig(option)
    router.dismiss()
  }

  // render
  return (
    <Pressable key={option} onPress={onConfigSet}>
      <View
        style={{
          borderRadius: 6,
          backgroundColor: isActive ? '#C0FF33' : '#FFF',
          width: '100%',
          padding: 24,
        }}
      >
        <Body size="lg">{label}</Body>
      </View>
    </Pressable>
  )
}
