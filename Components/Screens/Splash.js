import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'

//we can choose one of these or go with something different
const Splash = () => {
  return (
    <View style={styles.container}>
      <View>
        <Bubbles size={10} color="#FFF" />
        <Bars size={10} color="#FDAAFF" />
        <Pulse size={10} color="#52AB42" />
        <DoubleBounce size={10} color="#1CAFF6" />
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
