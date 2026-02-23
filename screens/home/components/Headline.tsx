import { Body, Heading } from '@components/typography'
import { useConfig } from '@providers/JsonConfigProvider'
import { View } from 'react-native'

// component
export function Headline() {

  // bind hooks + props
  const { content } = useConfig()
  const { title, description, titleColor, descriptionColor } = content.textArea

  // render
  return (
    <View style={{ gap: 4 }}>
      <Heading size="lg" color={titleColor}>
        {title}
      </Heading>
      <Body size="lg" color={descriptionColor}>
        {description}
      </Body>
    </View>
  )
}
