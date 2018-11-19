import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Container, Content } from 'native-base'
import Swiper from 'react-native-swiper'
import Camera from './Components/Camera'
import Places from './Components/Places/Places'
import Settings from './Components/Settings/Settings'
import { Constants, Location, Permissions } from 'expo'
import { connect, Provider } from 'react-redux'
import store from './Components/store/index'

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
      location: null,
      errorMessage: null,
      outerScrollEnabled: true
      // pageIndex: 1,
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      this._getLocationAsync()
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }

    let location = await Location.getCurrentPositionAsync({})
    console.log('location', location.coords.latitude, location.coords.longitude)
    this.setState({ location })
  }

  render() {
    let text = 'Waiting..'
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
    }
    return (
      <Provider store={store}>
        <Container>
          <Content>
            <Swiper
              loop={false}
              showsPagination={false}
              index={1}
              scrollEnabled={this.state.outerScrollEnabled}
              // dot={{ color: 'white' }}
            >
              <View style={styles.slideDefault}>
                {this.state.location && (
                  <Places location={this.state.location} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Camera />
              </View>
              <View style={{ flex: 1 }}>
                <Settings />
              </View>
            </Swiper>
          </Content>
        </Container>
      </Provider>
    )
  }
}
