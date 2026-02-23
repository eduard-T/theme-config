import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'
import brandA from '../../configs/brandA.json'
import brandB from '../../configs/brandB.json'
import brandC from '../../configs/brandC.json'

// types
export type ConfigKey = 'brandA' | 'brandB' | 'brandC'
interface ConfigContent {
  carousel: {
    images: string[]
    display: string
  }
  textArea: {
    title: string
    description: string
    titleColor: string
    descriptionColor: string
  }
  callToAction: {
    label: string
    link: string
    buttonColor: string
    labelColor: string
  }
}
interface Config {
  id: ConfigKey,
  content: ConfigContent
  swapConfig: (option: ConfigKey) => void
}

// constants
const CONFIG_FILES: Record<ConfigKey, ConfigContent> = {
  brandA,
  brandB,
  brandC,
}

// context
const ConfigContext = createContext<Config | undefined>(undefined)

// provider
export function JsonConfigProvider ({ children }: PropsWithChildren) {

  // bind hooks
  const [activeConfig, setActiveConfig] = useState<ConfigKey>('brandA')

  // memoize context value
  const contextValue = useMemo(() => ({
    id: activeConfig,
    content: CONFIG_FILES[activeConfig],
    swapConfig: setActiveConfig,
  }), [activeConfig])

  // render
  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  )
}

// hook
export const useConfig = () => {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('[JsonConfigProvider] hook must be used within its provider!')
  }
  return context
}
