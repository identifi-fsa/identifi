import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image } from 'react-native'
import { Container, Content, Card, CardItem, Body } from 'native-base'

export default class SinglePlace extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let icon
    let name
    let type
    let vicinity
    if (this.props.data) {
      // icon = this.props.data.icon
      name = this.props.data.name
      // vicinity = this.props.data.vicinity
    }
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardIconContainer}>
          <View style={styles.cardIcon}>
            <Image style={{ width: 40, height: 40 }} source={{ uri: icon }} />
          </View>
        </View>
        <View style={styles.cardDesc}>
          <Text>{name}</Text>
          <Text>{vicinity}</Text>
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
