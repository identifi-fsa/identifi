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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
    this.setState({
      data: this.props.nearby
    })
  }

  getRecentButtonColor = () => {
    if (this.state.data === this.props.recent[0]) {
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
    if (this.state.data === this.props.recent[0]) {
      return {
        color: 'red',
        fontWeight: 'bold'
      }
    } else {
      return {}
    }
  }

  async componentDidMount() {
    let lat = this.props.location.coords.latitude
    let lng = this.props.location.coords.longitude
    await this.props.fetchRecent()
    await this.props.fetchNearby(lat, lng)
    let nearby = this.props.nearby
    this.setState({
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
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => <SinglePlace data={item} />}
          />
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
