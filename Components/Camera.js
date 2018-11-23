import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Camera, Permissions } from 'expo'
import { connect } from 'react-redux'
import ResultModal from './ResultModal'
import { compareToHash } from '../utils'
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
import { getNearby } from './store/places-reducer'
import LoadingScreen from './ResultLoadingScreen'

let displayTimeout

class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageUri: null,
    base64: null,
    imageData: null,
    text: null,
    resultModal: false,
    loading: false,
    displayDelayCount: 0
  }

  cancelButton = () => {
    this.setState({ imageUri: null })
  }

  submitPicture = async () => {
    console.log('PICTURE SUBMITTED')
    this.setState({ loading: true })
    if (this.state.imageData) {
      this.displayResult(this.state.imageData)
      this.setState({ loading: false, displayDelayCount: 0 })
      clearTimeout(displayTimeout)
    } else {
      this.setState({ displayDelayCount: this.state.displayDelayCount + 1 })
      console.log(
        'TRYING AGAIN IN 1 SECOND... count: ',
        this.state.displayDelayCount
      )
      displayTimeout = setTimeout(() => {
        if (this.state.displayDelayCount >= 8) {
          this.setState({
            loading: false,
            displayDelayCount: 0,
            imageUri: null
          })
          console.log('No match found. Please take a better picture next time')
          // alert('No match found. Please take a better picture next time')
        } else if (this.state.displayDelayCount >= 4) {
          console.log('Taking longer than expected....')
          this.submitPicture()
        } else {
          this.submitPicture()
        }
      }, 1000)
    }
  }

  displayResult = () => {
    this.setState({ imageUri: null, resultModal: true })
  }

  closeResultModal = () => {
    this.setState({ resultModal: false })
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
      this.setState({
        imageUri: photo.uri,
        base64: photo.base64,
        imageData: null
      })
      if (photo.base64) {
        const body = {
          requests: [
            {
              image: {
                content: photo.base64
              },
              features: [
                {
                  type: 'DOCUMENT_TEXT_DETECTION',
                  maxResults: 1
                }
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

        let key = 'AIzaSyBSHdWwlSe6xZ0U6dYy3osqRo6248mhpaU'

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
        this.setState({
          text: parsed.responses[0].textAnnotations[0].description
        })
        console.log('here is what we found: ')
        const res = compareToHash(
          this.state.text,
          this.props.hashMap,
          this.props.nearby
        )

        if (res) this.setState({ imageData: res })
      }
    }
  }

  render() {
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
              <TouchableOpacity
                style={styles.submitButtonContainer}
                onPress={this.submitPicture}
              >
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

              {/* Navigator buttons */}
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
                  name="crosshairs-gps"
                  style={{ color: 'white', fontSize: 36 }}
                  onPress={() => this.props.changePage(-1)}
                />

                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={this.takePicture.bind(this)}>
                    <MaterialCommunityIcons
                      name="circle-outline"
                      style={{
                        color: 'white',
                        fontSize: 100,
                        marginBottom: 50
                      }}
                    />
                  </TouchableOpacity>
                  {/* <Icon
                    name="ios-images"
                    style={{ color: 'white', fontSize: 36 }}
                  /> */}
                </View>
                <MaterialCommunityIcons
                  name="google-circles-communities"
                  style={{ color: 'white', fontSize: 36 }}
                  onPress={() => this.props.changePage(1)}
                />
              </View>
            </Camera>
          )}
          <ResultModal
            visibility={this.state.resultModal}
            closeModal={this.closeResultModal}
            data={this.state.imageData}
          />
          <LoadingScreen visibility={this.state.loading} />
        </View>
      )
    }
  }
}
// export default CameraComponent

const mapStateToProps = state => ({
  nearby: state.places.nearby,
  hashMap: state.places.hashMap,
  user: state.auth
})

const mapDispatchToProps = dispatch => {
  return {
    loadInitialUserData: () => dispatch(me())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CameraComponent)

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
