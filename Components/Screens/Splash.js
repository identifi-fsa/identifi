import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
import { colors } from '../../constants/colors'

//we can choose one of these or go with something different
const Splash = () => {
  return (
    <View style={styles.container}>
      <View>
        {/* <Bubbles size={10} color="red" />
        <Bars size={20} color="red" /> */}
        <Pulse size={30} color={colors.primary} />
        {/* <DoubleBounce size={40} color="red" /> */}
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
