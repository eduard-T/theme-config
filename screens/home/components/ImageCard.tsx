import { Image } from 'expo-image'

// types
type ImageOrientation = 'portrait' | 'landscape' | 'square' | (string & {})
type ImageCardProps = {
  uri: string
  orientation?: ImageOrientation
}

// component
export function ImageCard({ uri, orientation = 'landscape' }: ImageCardProps) {

  // render
  return (
    <>
      <Image
        style={{
          borderRadius: 8,
          aspectRatio: ratioFor(orientation)
        }}
        placeholder={require('@assets/gifs/spinner.gif')}
        source={{ uri }}
        contentFit="cover"
      />
    </>
  )
}

// utilities
function ratioFor(orientation: ImageOrientation) {
  switch (orientation) {
    case 'landscape':
      return 3/2
    case 'portrait':
      return 2/3
    case 'square':
      return 1
    default:
      console.warn(`Unknown orientation value of ${orientation} provided. Falling back to landscape.`)
      return 3/2
  }
}
