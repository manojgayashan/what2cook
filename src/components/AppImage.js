import React, { useState } from 'react'
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native'

const AppImage = ({
  source,
  style,
  resizeMode = 'cover',
  dummyImage,
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <View style={[style, styles.container]}>
      {loading && (
        <ActivityIndicator
          size="small"
          style={styles.loader}
        />
      )}

      <Image
        source={error ? dummyImage : source}
        style={[StyleSheet.absoluteFill, style]}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
      />
    </View>
  )
}

export default AppImage

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
    // resizeMode:'contain'
  },
})