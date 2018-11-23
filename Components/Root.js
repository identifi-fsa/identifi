import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import { connect } from 'react-redux'
import HomePage from './HomePage'
import Auth from './Auth/Auth'
import Splash from './Screens/Splash'
import { me } from './store/auth-reducer'
import { fetchRecent, fetchNearby } from './store/places-reducer'

class Root extends Component {
  state = {
    data: false,
    location: null,
    errorMessage: null
  }

  async componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      await this._getLocationAsync()
    }

    // let lat = this.props.location.coords.latitude
    // let lng = this.props.location.coords.longitude
    let lat = this.state.location.coords.latitude
    let lng = this.state.location.coords.longitude

    console.log('lat, and lng', lat, lng)
    await this.props.fetchRecent()
    await this.props.fetchNearby(lat, lng)
    let nearby = this.props.nearby
    this.setState({
      data: nearby
    })
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
    console.log('this is the most up to date state', this.state)
    if (!this.state.data) {
      //render splash screen
      return <Splash />
    } else if (!this.props.user.id) {
      return <Auth />
    } else {
      return (
        <HomePage
        // errorMessage={this.state.errorMessage}
        // location={this.state.location}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    nearby: state.places.nearby,
    recent: state.places.recent,
    user: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialUserData: () => dispatch(me()),
    fetchRecent: () => dispatch(fetchRecent()),
    fetchNearby: (lat, lng) => dispatch(fetchNearby(lat, lng))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
