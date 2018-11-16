import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
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
import axios from 'axios'

class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageUri: null,
    imageData: null
  }
  cancelButton = () => {
    console.log('heyyy')
    this.setState({ imageUri: null })
  }
  //look at Expo camera docs
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  async takePicture() {
    console.log('picture initiated')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        base64: true
      })
      console.log('after take picture async')
      this.setState({ imageUri: photo.uri })
      if (photo.base64) {
        const body = {
          requests: [
            {
              image: {
                content: photo.base64
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
        console.log('fetch google vision initiated')

        // const fetchGoogleVision = async () => {
        //   try {
        //     const response = await fetch(
        //       `https://jubjub-server.herokuapp.com/api/visions`,
        //       {
        //         method: 'POST',
        //         headers: {
        //           Accept: 'application/json',
        //           'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(body)
        //       }
        //     )
        //     const parsed = await response.json()
        //     console.log('parsed vision received', parsed)
        //   } catch (err) {
        //     console.log('error in google vision request', err)
        //   }
        // }
        // console.log('fetch google vision invoked')
        // fetchGoogleVision()

        // let key = 'AIzaSyASmyqgTjTGcX1UoyVUf_gEsT7Vfazz4Tg'

        // const response = await fetch(
        //   `https://vision.googleapis.com/v1/images:annotate?key=${key}`,
        //   {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(body)
        //   }
        // )
        // const parsed = await response.json()
        // console.log('parsed', parsed)
        // this.setState({
        //   label: parsed.responses[0].labelAnnotations[0].description
        // })
      }
    }
  }

  render() {
    console.log('current State Image URI', this.state.imageUri)
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
          {this.state.imageUri ? (
            <View style={styles.latestImageContainer}>
              <Image
                style={styles.latestImage}
                resizeMode={'cover'}
                source={{ uri: this.state.imageUri }}
              />
              <TouchableOpacity
                style={styles.cancelButtonContainer}
                onPress={this.cancelButton}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  style={{ color: '#ec0606', fontSize: 50 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButtonContainer}>
                <MaterialCommunityIcons
                  name="send"
                  style={{
                    color: '#00f25a',
                    fontSize: 50,
                    alignSelf: 'flex-end'
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
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
                  height: 70,
                  // position: 'absolute',
                  backgroundColor: 'transparent',
                  // left: 0,
                  // top: 0,
                  // right: 0,
                  zIndex: 100,
                  alignItems: 'center'
                }}
              />

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
          )}
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
  },
  latestImageContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative'
  },
  latestImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  cancelButtonContainer: {
    bottom: 50,
    left: 50,
    height: 50,
    width: '30%',
    zIndex: 100,
    position: 'absolute',
    alignContent: 'center'
  },
  submitButtonContainer: {
    bottom: 50,
    right: 50,
    height: 50,
    width: '30%',
    zIndex: 100,
    position: 'absolute',
    alignContent: 'center'
  },
  text: {
    margin: 'auto',
    color: 'white',
    alignContent: 'center'
  }
})
