import { ColorValue, StyleSheet, Text, TextProps } from 'react-native'

// types
type BodySize = 'sm' | 'lg'
type BodyProps = TextProps & {
  size?: BodySize
  color?: ColorValue
}

// component
export function Body({
  children,
  style,
  size = 'sm',
  color = 'black',
  ...props
}: BodyProps) {

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
const sizingStyles: Record<BodySize, object> = StyleSheet.create({
  sm: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0
  },
  lg: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0
  },
})
