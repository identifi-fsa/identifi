import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Container, Content } from 'native-base'
import Swiper from 'react-native-swiper'
import Camera from './Components/Camera'

const styles = StyleSheet.create({
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      outerScrollEnabled: true
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Swiper
            loop={false}
            showsPagination={false}
            index={1}
            scrollEnabled={this.state.outerScrollEnabled}
          >
            <View style={styles.slideDefault}>
              <Text style={styles.text}>Places Screen</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Camera />
            </View>
            <View style={styles.slideDefault}>
              <Text style={styles.text}>User Page</Text>
            </View>
          </Swiper>
        </Content>
      </Container>
    )
  }
}
