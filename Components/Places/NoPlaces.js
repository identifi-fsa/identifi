import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import ResultModal from '../ResultModal'
import { connect } from 'react-redux'
import { getRecentInfo } from '../store/places-reducer'

class SinglePlaceRecent extends Component {
  state = {
    resultModal: false
  }

  render() {
    return (
      <View>
        <View style={styles.cardContainer}>
          <View style={styles.cardDesc}>
            <Text style={styles.nameText}>{this.props.data.blurb}</Text>
            <Text>Nothin</Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    recentPlaceView: state.places.recentPlaceView
  }
}

const mapDispatchToProps = dispatch => ({
  getRecentInfo: yelpId => dispatch(getRecentInfo(yelpId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePlaceRecent)

const styles = StyleSheet.create({
  cardContainer: {
    width: '99%',
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardIconContainer: {
    display: 'flex',
    height: 90,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2.5%'
  },
  cardIcon: {
    height: 85,
    width: 85
  },
  cardDesc: {
    width: '100%',
    height: 90,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18
  }
})
