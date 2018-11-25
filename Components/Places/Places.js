import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'native-base'
import { fetchRecent, fetchNearby } from '../store/places-reducer'
import SinglePlace from './SinglePlace'
import SinglePlaceRecent from './SinglePlaceRecent'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class Places extends React.Component {
  state = {
    view: '',
    data: this.props.recent
  }

  recentButton = () => {
    this.setState({
      view: 'recent',
      data: this.props.recent
    })
  }

  nearbyButton = () => {
    this.setState({
      view: 'nearby',
      data: this.props.nearby
    })
  }

  getRecentButtonColor = () => {
    if (this.state.data === this.props.recent) {
      return {
        width: '50%',
        zIndex: 100,
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
      }
    } else {
      return {
        width: '50%',
        zIndex: 100,
        alignItems: 'center',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
      }
    }
  }

  getNearbyButtonColor = () => {
    if (this.state.data === this.props.nearby) {
      return {
        width: '50%',
        zIndex: 100,
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
      }
    } else {
      return {
        width: '50%',
        zIndex: 100,
        alignItems: 'center',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
      }
    }
  }

  getNearbyButtonTextColor = () => {
    if (this.state.data === this.props.nearby) {
      return {
        color: 'red',
        fontWeight: 'bold'
      }
    } else {
      return {}
    }
  }

  getRecentButtonTextColor = () => {
    if (this.state.data === this.props.recent) {
      return {
        color: 'red',
        fontWeight: 'bold'
      }
    } else {
      return {}
    }
  }

  componentDidMount() {
    let nearby = this.props.nearby
    this.setState({
      view: 'nearby',
      data: nearby
    })
  }
  render() {
    return this.state.data ? (
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
              style={this.getRecentButtonColor()}
              onPress={this.recentButton}
            >
              <Text style={this.getRecentButtonTextColor()}>RECENT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.getNearbyButtonColor()}
              onPress={this.nearbyButton}
            >
              <Text style={this.getNearbyButtonTextColor()}>NEARBY</Text>
            </TouchableOpacity>
          </View>
        </Header>
        <View style={styles.cardContainer}>
          {this.state.view === 'nearby' ? (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <SinglePlace data={item} />}
            />
          ) : (
            <FlatList
              data={this.state.data[0]}
              renderItem={({ item }) => <SinglePlaceRecent data={item} />}
            />
          )}
        </View>
        {/* Navigator buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 15,
            alignItems: 'flex-end'
          }}
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            style={{ color: 'red', fontSize: 36 }}
            onPress={this.props.goToPlaces}
          />

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.changePage(1)}>
              <MaterialCommunityIcons
                name="circle-outline"
                style={{
                  color: 'black',
                  fontSize: 60,
                  marginBottom: 5
                }}
              />
            </TouchableOpacity>
            {/* <Icon
                    name="ios-images"
                    style={{ color: 'white', fontSize: 36 }}
                  /> */}
          </View>
          <MaterialCommunityIcons
            name="google-circles-communities"
            style={{ color: 'black', fontSize: 36 }}
            onPress={() => this.props.changePage(2)}
          />
        </View>
      </View>
    ) : (
      <View />
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
    width: '100%',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
