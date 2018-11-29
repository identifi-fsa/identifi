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
import {
  fetchRecent,
  fetchNearby,
  getRecentInfo
} from '../store/places-reducer'
import SinglePlace from './SinglePlace'
import SinglePlaceRecent from './SinglePlaceRecent'
import ResultModal from '../ResultModal'
import NoPlaces from './NoPlaces'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker } from 'react-native-maps'
// import { colors } from '../../constants/colors'

let colors

class Places extends React.Component {
  state = {
    view: '',
    data: this.props.recent,
    mapResultModalVisibility: false,
    mapResult: {}
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
        borderColor: colors.primary,
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
        borderColor: colors.primary,
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
        color: colors.primary,
        fontWeight: 'bold'
      }
    } else {
      return { color: colors.text }
    }
  }

  getRecentButtonTextColor = () => {
    if (this.state.data === this.props.recent) {
      return {
        color: colors.primary,
        fontWeight: 'bold'
      }
    } else {
      return { color: colors.text }
    }
  }

  showSinglePlace = markerPlace => {
    this.setState({
      mapResult: markerPlace,
      mapResultModalVisibility: true
    })
  }

  showSinglePlaceRecent = async markerPlace => {
    try {
      await this.props.getRecentInfo(markerPlace.yelpId)
      this.setState({
        mapResult: this.props.recentPlaceView,
        mapResultModalVisibility: true
      })
    } catch (err) {
      console.err('ERROR IN PLACES GETTING RECENT INFO (Places.js)...', err)
    }
  }

  closeMapResultModal = () => {
    this.setState({ mapResultModalVisibility: false, mapResult: {} })
  }

  randomSelection = async () => {
    console.log('LOOOOOONG PRESS. Randmized selection of Data')
    try {
      const randomIndex = Math.floor(Math.random() * 21)
      await this.props.getRecentInfo(this.props.nearby[randomIndex].id)
      this.setState({
        mapResult: this.props.recentPlaceView,
        mapResultModalVisibility: true
      })
    } catch (err) {
      console.err('ERROR RANDOMIZING (Places.js)...', err)
    }
  }

  componentDidMount = () => {
    let nearby = this.props.nearby
    this.setState({
      view: 'nearby',
      data: nearby
    })
  }
  render() {
    colors = this.props.styles
    return this.state.data ? (
      <View>
        <Header
          searchBar
          rounded
          style={{
            backgroundColor: colors.backgroundColor,
            height: 70,
            zIndex: 100,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              backgroundColor: colors.backgroundColor,
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
            <TouchableOpacity onLongPress={() => this.randomSelection()}>
              <MaterialCommunityIcons
                name="dice-multiple"
                style={{
                  color: colors.primary,
                  fontSize: 36,
                  marginLeft: 40
                }}
              />
            </TouchableOpacity>
          </View>
        </Header>

        {/********* NEARBY MAP VIEW *********/}
        {this.state.view === 'nearby' && (
          <MapView
            style={{ flex: 0.3, margin: '1%', borderRadius: 10 }}
            initialRegion={{
              latitude: this.props.lat, //40.7047584413614,
              longitude: this.props.lng, //-74.0085431188345,
              latitudeDelta: 0.0025, //zoom
              longitudeDelta: 0.0025 //zoom
            }}
          >
            <Marker
              coordinate={{
                latitude: this.props.lat,
                longitude: this.props.lng
              }}
              title={'YOU ARE HERE'}
              pinColor={colors.primary}
            >
              <MaterialCommunityIcons
                name="map-marker-outline"
                style={{ color: colors.primary, fontSize: 36 }}
              />
            </Marker>
            {this.state.data.length &&
              this.state.data.map(marker => (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.coordinates.latitude,
                    longitude: marker.coordinates.longitude
                  }}
                  // title={marker.name}
                  // description={marker.description}
                  onPress={() => this.showSinglePlace(marker)}
                  pinColor={colors.primary}
                />
              ))}
          </MapView>
        )}

        {/********* RECENT MAP VIEW *********/}
        {this.state.view === 'recent' && (
          <MapView
            style={{ flex: 0.3, borderRadius: 10 }}
            initialRegion={{
              latitude: this.props.lat, //40.7047584413614,
              longitude: this.props.lng, //-74.0085431188345,
              latitudeDelta: 0.0025, //zoom
              longitudeDelta: 0.0025 //zoom
            }}
          >
            <Marker
              coordinate={{
                latitude: this.props.lat,
                longitude: this.props.lng
              }}
              title={'YOU ARE HERE'}
              pinColor={colors.primary}
            >
              <MaterialCommunityIcons
                name="map-marker-outline"
                style={{ color: colors.primary, fontSize: 36 }}
              />
            </Marker>
            {this.state.data.map(marker => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: +marker.lat,
                  longitude: +marker.lng
                }}
                // title={marker.name}
                // description={marker.description}
                onPress={() => this.showSinglePlaceRecent(marker)}
                pinColor={colors.primary}
              />
            ))}
          </MapView>
        )}
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            backgroundColor: colors.backgroundColor
          }}
        >
          {this.state.view === 'nearby' ? (
            <View>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => <SinglePlace data={item} />}
              />
            </View>
          ) : this.state.data.length !== 0 ? (
            <View>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => <SinglePlaceRecent data={item} />}
              />
            </View>
          ) : (
            <View>
              <FlatList
                data={[{ blurb: 'NOTHING TO SEE HERE' }]}
                renderItem={({ item }) => <NoPlaces data={item} />}
              />
            </View>
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
            style={{ color: colors.primary, fontSize: 36 }}
            onPress={this.props.goToPlaces}
          />

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.changePage(1)}>
              <MaterialCommunityIcons
                name="circle-outline"
                style={{
                  color: colors.disabledNavButton,
                  fontSize: 60,
                  marginBottom: 5
                }}
              />
            </TouchableOpacity>
          </View>
          <MaterialCommunityIcons
            name="google-circles-communities"
            style={{ color: colors.disabledNavButton, fontSize: 36 }}
            onPress={() => this.props.changePage(2)}
          />
        </View>
        <ResultModal
          visibility={this.state.mapResultModalVisibility}
          closeModal={this.closeMapResultModal}
          data={this.state.mapResult}
        />
      </View>
    ) : (
      <View />
    )
  }
}

const mapStateToProps = state => {
  return {
    nearby: state.places.nearby,
    recent: state.places.recent,
    recentPlaceView: state.places.recentPlaceView,
    styles: state.styles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecent: () => dispatch(fetchRecent()),
    fetchNearby: (lat, lng) => dispatch(fetchNearby(lat, lng)),
    getRecentInfo: yelpId => dispatch(getRecentInfo(yelpId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Places)

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
