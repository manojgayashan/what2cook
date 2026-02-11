import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './src/route/AppNavigator'
import {AppProvider} from './Context'

export default function App() {
  return (
    <AppProvider>
      <AppNavigator/>
    </AppProvider>
  )
}