import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import ResultModal from '../ResultModal'
import { connect } from 'react-redux'
import { getRecentInfo } from '../store/places-reducer'
import { colors } from '../../constants/colors'

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
    let colors = this.props.styles
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
          <View
            style={{
              width: '100%',
              height: 100,
              backgroundColor: colors.backgroundColor,
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: colors.border,
              alignItems: 'center'
            }}
          >
            <View style={styles.cardIconContainer}>
              <Image style={styles.cardIcon} source={{ uri: imageUrl }} />
            </View>
            <View
              style={{
                width: '70%',
                height: 90,
                backgroundColor: colors.backgroundColor,
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: colors.text
                }}
              >
                {name}
              </Text>
              <Text
                style={{
                  color: colors.text
                }}
              >
                {dateVisited}
              </Text>
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
    recentPlaceView: state.places.recentPlaceView,
    styles: state.styles
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
  }
})
