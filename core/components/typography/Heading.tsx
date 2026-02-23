import { ColorValue, StyleSheet, Text, TextProps } from 'react-native'

// types
type HeadingSize = 'sm' | 'md' | 'lg'
type HeadingProps = TextProps & {
  size?: HeadingSize
  color?: ColorValue
}

// component
export function Heading({
  children,
  style,
  size = 'md',
  color = 'black',
  ...props
}: HeadingProps) {

  // render
  return (
    <Text
      style={[
        style,
        sizingStyles[size],
        { color }
      ]}
      {...props}
    >
      {children}
    </Text>
  )
}

// styling
const sizingStyles: Record<HeadingSize, object> = StyleSheet.create({
  sm: {
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0
  },
  md: {
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: 0
  },
  lg: {
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: 0
  },
})
