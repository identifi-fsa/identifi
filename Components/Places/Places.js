import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content } from 'native-base'
import { fetchRecent, fetchNearby } from '../store/places-reducer'

class Places extends React.Component {
  async componentDidMount() {
    let lat = this.props.location.coords.latitude
    let lng = this.props.location.coords.longitude
    await this.props.fetchRecent()
    await this.props.fetchNearby(lat, lng)
  }
  render() {
    console.log('nearby!!!', this.props.nearby)
    return (
      <View>
        <Text>Hey</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    nearby: state.places.nearby,
    recent: state.places.recent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecent: () => dispatch(fetchRecent()),
    fetchNearby: (lat, lng) => dispatch(fetchNearby(lat, lng))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Places)
