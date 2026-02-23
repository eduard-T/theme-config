import { Feather } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { useState } from 'react'
import { ColorValue, Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'

// types
export type ButtonProps = Omit<PressableProps, 'onPress'> & {
  label: string
  href: string,
  labelColor?: ColorValue
  backgroundColor?: ColorValue
}

// component
export function LinkButton({
  label,
  href,
  labelColor = 'black',
  backgroundColor = 'white',
  disabled,
  ...props
}: ButtonProps) {

  // bind hooks
  const [isOpening, setIsOpening] = useState(false)

  // helpers
  const handleNavigation = async () => {
    setIsOpening(true)
    try {
      await Linking.openURL(href)
    } catch (err) {
      console.error('[LinkButton] failed to open provided URL', err)
    } finally {
      setIsOpening(false)
    }
  }

  // render
  return (
    <Pressable
      disabled={disabled || isOpening}
      onPress={handleNavigation}
      {...props}
    >
      <View style={[styles.container, { backgroundColor }]}>

        {/* loader */}
        {isOpening && (
          <Animated.View style={styles.loader}>
            <Feather
              name="loader"
              size={24}
              color={labelColor}
            />
          </Animated.View>
        )}

        {/* label */}
        <Text style={[styles.label, { opacity: isOpening ? 0 : 1, color: labelColor }]}>
          {label}
        </Text>
      </View>
    </Pressable>
  )
}

// styling
const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    animationName: { to: { transform: [{ rotate: '360deg' }] }},
    animationDuration: 1500,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
  label: {
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0.25,
    fontWeight: '600'
  }
})
