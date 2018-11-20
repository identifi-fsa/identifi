import React, { Component } from 'react'
import { Modal, Text } from 'react-native'
import { Container, Header, Content, Spinner } from 'native-base'
export default class LoadingScreen extends Component {
  render() {
    console.log('loading', this.props.loading)
    return (
      <Modal visible={this.props.visibility}>
        <Text>Comparing Image to Google Cloud</Text>
        <Spinner color="red" />
        <Spinner color="green" />
        <Spinner color="blue" />
      </Modal>
    )
  }
}
