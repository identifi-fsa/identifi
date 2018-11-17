import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Header } from 'native-base'
import { fetchRecent, fetchNearby } from '../store/places-reducer'
import SinglePlace from './SinglePlace'

class Places extends React.Component {
  state = {
    data: this.props.recent
  }

  recentButton = () => {
    let recent = this.props.recent[0]
    this.setState({
      data: recent
    })
  }

  nearbyButton = () => {
    // let nearby = []
    // if (this.props.nearby.length) {
    //   let results = this.props.nearby[0].results
    //   results.forEach(place => {
    //     let placeObj = {}
    //     placeObj.lat = place.geometry.location.lat
    //     placeObj.lng = place.geometry.location.lng
    //     placeObj.icon = place.icon
    //     placeObj.place_id = place.place_id
    //     placeObj.name = place.name
    //     placeObj.types = place.types
    //     placeObj.vicinity = place.vicinity
    //     if (place.rating) placeObj.rating = place.rating
    //     if (place.photos) placeObj.photo = place.photos[0].photo_reference
    //     if (place.photos) placeObj.price_level = place.price_level
    //     nearby.push(placeObj)
    //   })
    // }
    this.setState({
      data: this.props.nearby
    })
  }

  async componentDidMount() {
    let lat = this.props.location.coords.latitude
    let lng = this.props.location.coords.longitude
    await this.props.fetchRecent()
    await this.props.fetchNearby(lat, lng)
    console.log('NEARBYYY', this.props.nearby)
    let recent = this.props.recent[0]
    this.setState({
      data: recent
    })
  }
  render() {
    return (
      <View>
        <Header
          searchBar
          rounded
          style={{
            backgroundColor: 'transparent',
            height: 70,
            zIndex: 100,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              height: 35,
              width: '60%',
              zIndex: 100,
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{
                width: '50%',
                zIndex: 100,
                alignItems: 'center'
              }}
              onPress={this.recentButton}
            >
              <Text>RECENT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '50%',
                zIndex: 100,
                alignItems: 'center'
              }}
              onPress={this.nearbyButton}
            >
              <Text>NEARBY</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <View style={styles.cardContainer}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => <SinglePlace data={item} />}
          />
        </View>
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

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: '95%',
    backgroundColor: '#9DD6EB',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
