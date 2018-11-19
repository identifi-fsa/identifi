import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image } from 'react-native'
import { Container, Content, Card, CardItem, Body } from 'native-base'

export default class SinglePlace extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let image_url
    let name
    let address
    if (this.props.data) {
      image_url = this.props.data.image_url
      name = this.props.data.name
      if (this.props.data.location) {
        address = this.props.data.location.display_address
      }
    }
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardIconContainer}>
          <View style={styles.cardIcon}>
            <Image
              style={{ width: 90, height: 90 }}
              source={{ uri: image_url }}
            />
          </View>
        </View>
        <View style={styles.cardDesc}>
          <Text>{name}</Text>
          <Text>{address}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#9DD6EB',
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center'
    // paddingLeft: '2.5%'
  },
  cardIconContainer: {
    display: 'flex',
    height: 90,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  cardIcon: {
    height: 90,
    width: 90,
    borderWidth: 1,
    borderColor: 'black'
  },
  cardDesc: {
    width: '75%',
    height: 90,
    backgroundColor: '#9DD6EB',
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'column'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
