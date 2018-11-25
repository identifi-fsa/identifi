import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import ResultModal from '../ResultModal'
import { connect } from 'react-redux'
import { getRecentInfo } from '../store/places-reducer'

class SinglePlaceRecent extends Component {
  state = {
    resultModal: false
  }

  displayResult = async yelpId => {
    try {
      await this.props.getRecentInfo(yelpId)
      this.setState({ resultModal: true })
    } catch (err) {
      console.err('ERROR IN DISPLAY RESULT METHOD', err)
    }
  }

  closeResultModal = () => {
    this.setState({ resultModal: false })
  }

  render() {
    let yelpId
    let imageUrl
    let name
    let dateVisited
    if (this.props.data) {
      yelpId = this.props.data.yelpId
      imageUrl = this.props.data.imageUrl
      name = this.props.data.name
      dateVisited = this.props.data.dateVisited
      // if (this.props.recentPlaceView.location) {
      //   address = this.props.recentPlaceView.location.display_address
      // }
    }
    return (
      <View>
        <TouchableOpacity onPress={() => this.displayResult(yelpId)}>
          <View style={styles.cardContainer}>
            <View style={styles.cardIconContainer}>
              <Image style={styles.cardIcon} source={{ uri: imageUrl }} />
            </View>
            <View style={styles.cardDesc}>
              <Text style={styles.nameText}>{name}</Text>
              <Text>{dateVisited}</Text>
              {/* <Text>Currently {isClosed}</Text> */}
            </View>
          </View>
        </TouchableOpacity>

        <ResultModal
          visibility={this.state.resultModal}
          closeModal={this.closeResultModal}
          data={this.props.recentPlaceView}
        />
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
    borderWidth: 1,
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
    width: '70%',
    height: 90,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'column'
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
