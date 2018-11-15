import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera, Permissions } from 'expo'

import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Button
} from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageUri: null,
    label: null
  }

  //look at Expo camera docs
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  async takePicture() {
    console.log('picture initiated')
    if (this.camera) {
      let { base64 } = await this.camera.takePictureAsync({
        base64: true
      })
      console.log('after take picture async')
      if (base64) {
        const body = {
          requests: [
            {
              image: {
                content: base64
              },
              features: [
                {
                  type: 'WEB_DETECTION',
                  maxResults: 5
                }
                // {
                //   type: 'TEXT_DETECTION',
                //   maxResults: 5
                // }
              ]
            }
          ]
        }
        console.log('awaiting google')
        const key = `<PLACE_KEY_HERE>`
        const response = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=${key}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        )
        const parsed = await response.json()
        console.log('parsed', parsed)
        this.setState({
          label: parsed.responses[0].labelAnnotations[0].description
        })
      }
    }
  }

  render() {
    console.log('current State', this.state)
    const { hasCameraPermission } = this.state

    //if user has not set permission yet
    if (hasCameraPermission === null) {
      return (
        <View>
          <Text>Hey Loren, if you see this. We know why!</Text>
        </View>
      )
    } else if (hasCameraPermission === false) {
      return <Text> No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1, justifyContent: 'space-between' }}
            //this is setting camera to the back camera
            type={this.state.type}
            ref={ref => {
              this.camera = ref
            }}
          >
            <Header
              searchBar
              rounded
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                left: 0,
                top: 0,
                right: 0,
                zIndex: 100,
                alignItems: 'center'
              }}
            >
              {/* <View style={{ flexDirection: 'row', flex: 4 }}>
                <Icon name="logo-snapchat" style={{ color: 'white' }} />
                <Item style={{ backgroundColor: 'transparent' }}>
                  <Icon
                    name="ios-search"
                    style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                  />

                  <Input placeholder="Search" placeholderTextColor="white" />
                </Item>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 2,
                  justifyContent: 'space-around'
                }}
              >
                <Icon
                  name="ios-flash"
                  style={{ color: 'white', fontWeight: 'bold' }}
                />
                <Icon
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                    })
                  }}
                  name="ios-reverse-camera"
                  style={{ color: 'white', fontWeight: 'bold' }}
                />
              </View> */}
            </Header>

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
                name="message-reply"
                style={{ color: 'white', fontSize: 36 }}
              />

              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={this.takePicture.bind(this)}>
                  <MaterialCommunityIcons
                    name="circle-outline"
                    style={{ color: 'white', fontSize: 100 }}
                  />
                </TouchableOpacity>
                <Icon
                  name="ios-images"
                  style={{ color: 'white', fontSize: 36 }}
                />
              </View>
              <MaterialCommunityIcons
                name="google-circles-communities"
                style={{ color: 'white', fontSize: 36 }}
              />
            </View>
          </Camera>
        </View>
      )
    }
  }
}
export default CameraComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
