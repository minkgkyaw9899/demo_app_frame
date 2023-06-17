import {StyleSheet, Text} from 'react-native'
import {Container} from 'components/common/Container'
import React from 'react'

export const SplashContainer = () => (
  <Container style={styles.container}>
    <Text style={styles.text}>Splash Screen</Text>
  </Container>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
})
