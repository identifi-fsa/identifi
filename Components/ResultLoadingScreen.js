import React, { Component } from 'react'
import { Modal, Text, StyleSheet, View } from 'react-native'
import { Container, Header, Content, Spinner } from 'native-base'
export default class LoadingScreen extends Component {
  render() {
    console.log('loading', this.props.loading)
    return (
      <Modal transparent={true} visible={this.props.visibility}>
        <View style={styles.container}>
          <Text style={styles.text}>Comparing Image to Google Cloud</Text>
          <Spinner color="red" />
          <Spinner color="green" />
          <Spinner color="blue" />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%'
  },
  modal: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18
  }
})
