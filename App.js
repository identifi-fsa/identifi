import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Container, Content } from 'native-base'
import Swiper from 'react-native-swiper'
import HomePage from './Components/HomePage'
import Camera from './Components/Camera'
import Places from './Components/Places/Places'
import Settings from './Components/Settings/Settings'
import { Constants, Location, Permissions } from 'expo'
import { Provider } from 'react-redux'
import store from './Components/store/index'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <HomePage />
        </Container>
      </Provider>
    )
  }
}
