import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import Camera from './Camera'
import { Content } from 'native-base'
import Swiper from 'react-native-swiper'
import Places from './Places/Places'
import Settings from './Settings/Settings'

const styles = StyleSheet.create({
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#9DD6EB' // <-- was creating a blue background
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      location: null,
      errorMessage: null,
      outerScrollEnabled: true,
      pageIndex: 1
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

  goToPlaces = () => {
    this.setState({
      pageIndex: 0
    })
  }

  goToCamera = () => {
    this.setState({
      pageIndex: 1
    })
  }

  goToSettings = () => {
    this.setState({
      pageIndex: 2
    })
  }

  render() {
    let text = 'Waiting..'
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
    }
    return (
      <Content>
        <Swiper
          loop={false}
          showsPagination={false}
          index={this.state.pageIndex}
          scrollEnabled={this.state.outerScrollEnabled}
          // dot={{ color: 'white' }}
        >
          <View style={styles.slideDefault}>
            {this.state.location && (
              <Places
                location={this.state.location}
                goToPlaces={this.goToPlaces}
                goToCamera={this.goToCamera}
                goToSettings={this.goToSettings}
              />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Camera
              goToPlaces={this.goToPlaces}
              goToSettings={this.goToSettings}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Settings
              goToPlaces={this.goToPlaces}
              goToCamera={this.goToCamera}
              goToSettings={this.goToSettings}
            />
          </View>
        </Swiper>
      </Content>
    )
  }
}