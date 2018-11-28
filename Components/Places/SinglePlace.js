import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import ResultModal from '../ResultModal'
import { colors } from '../../constants/colors'

export default class SinglePlace extends Component {
  state = {
    resultModal: false
  }

  displayResult = () => {
    this.setState({ resultModal: true })
  }

  closeResultModal = () => {
    this.setState({ resultModal: false })
  }

  render() {
    let imageUrl
    let name
    let address
    let isClosed
    if (this.props.data) {
      imageUrl = this.props.data.image_url
      name = this.props.data.name
      isClosed = this.props.data.isClosed ? 'Closed' : 'Open'
      if (this.props.data.location) {
        address = this.props.data.location.display_address
      }
    }

    return (
      <View>
        <TouchableOpacity onPress={this.displayResult}>
          <View style={styles.cardContainer}>
            <View style={styles.cardIconContainer}>
              <Image
                // style={{ width: 90, height: 90 }}
                style={styles.cardIcon}
                source={{ uri: imageUrl }}
              />
            </View>
            <View style={styles.cardDesc}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.text}>{address}</Text>
              <Text style={styles.text}>Currently {isClosed}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <ResultModal
          visibility={this.state.resultModal}
          closeModal={this.closeResultModal}
          data={this.props.data}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 100,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.text
  },
  text: {
    color: colors.text
  }
})
