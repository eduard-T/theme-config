import { JsonConfigProvider } from '@providers/JsonConfigProvider'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

// layout
export default function RootLayout() {

  // render
  return (
    <ThemeProvider value={DarkTheme}>
      <JsonConfigProvider>
        <StatusBar style="light" />
        <Stack
          initialRouteName='index'
          screenOptions={{ contentStyle: { backgroundColor: '#14281E' }}}
        >
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings"
            options={{
              presentation: 'modal',
              headerShown: false,
              contentStyle: { backgroundColor: '#C7C7C7' }
            }}
          />
        </Stack>
      </JsonConfigProvider>
    </ThemeProvider>
  )
}
