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
import NoPlaces from './NoPlaces'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker } from 'react-native-maps'

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

        {/********* NEARBY MAP VIEW *********/}
        {this.state.view === 'nearby' && (
          <MapView
            style={{ flex: 0.3, margin: '2.5%', borderRadius: 10 }}
            initialRegion={{
              latitude: this.props.lat, //40.7047584413614
              longitude: this.props.lng, //-74.0085431188345
              latitudeDelta: 0.0025, //zoom
              longitudeDelta: 0.0025 //zoom
            }}
          >
            {this.state.data.map(marker => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.coordinates.latitude,
                  longitude: marker.coordinates.longitude
                }}
                title={marker.name}
                description={marker.description}
              />
            ))}
          </MapView>
        )}

        {/********* RECENT MAP VIEW *********/}
        {this.state.view === 'recent' && (
          <MapView
            style={{ flex: 0.3, margin: '2.5%', borderRadius: 10 }}
            initialRegion={{
              latitude: this.props.lat, //40.7047584413614
              longitude: this.props.lng, //-74.0085431188345
              latitudeDelta: 0.0025, //zoom
              longitudeDelta: 0.0025 //zoom
            }}
          >
            {this.state.data.map(marker => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.lng
                }}
                // title={marker.name}
                // description={marker.description}
              />
            ))}
          </MapView>
        )}
        <View style={styles.cardContainer}>
          {this.state.view === 'nearby' ? (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <SinglePlace data={item} />}
            />
          ) : this.state.data.length !== 0 ? (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <SinglePlaceRecent data={item} />}
            />
          ) : (
            <FlatList
              data={[{ blurb: 'NOTHING TO SEE HERE' }]}
              renderItem={({ item }) => <NoPlaces data={item} />}
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
