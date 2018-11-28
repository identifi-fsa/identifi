import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import { connect } from 'react-redux'
import HomePage from './HomePage'
import Auth from './Auth/Auth'
import Splash from './Screens/Splash'
import { me, asyncStorageLookup } from './store/auth-reducer'
import { fetchRecent, fetchNearby } from './store/places-reducer'
import { fetchStyles } from './store/style-reducer'

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

    let lat = this.state.location.coords.latitude
    let lng = this.state.location.coords.longitude

    console.log('lat, and lng', lat, lng)
    await this.props.fetchNearby(lat, lng)
    let nearby = this.props.nearby
    this.setState({
      data: nearby
    })
    //check to see if the user already has logged in or not
    await this._checkUser()
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
  _checkUser = async () => {
    try {
      const val = await AsyncStorage.getItem('USERID')
      console.log('inside the checkuser', val)
      if (val !== null) {
        this.props.asyncCheck(val)
        this.props.fetchStyle(val)
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.data) {
      return <Splash />
    } else if (!this.props.user.id) {
      return <Auth />
    } else {
      return (
        <HomePage
          fetchRecent={() => this.props.fetchRecent()}
          lat={this.state.location.coords.latitude}
          lng={this.state.location.coords.longitude}
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
    asyncCheck: id => dispatch(asyncStorageLookup(id)),
    fetchRecent: () => dispatch(fetchRecent()),
    fetchNearby: (lat, lng) => dispatch(fetchNearby(lat, lng)),
    fetchStyle: id => dispatch(fetchStyles(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)
