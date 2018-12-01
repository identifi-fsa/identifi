import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Camera, Permissions } from 'expo'
import { connect } from 'react-redux'
import ResultModal from './ResultModal'
import NothingModal from './NothingModal'
import Splash from './Screens/Splash'
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
import { fetchRecent } from './store/places-reducer'
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
    nothingModal: false,
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
        if (this.state.displayDelayCount >= 15) {
          this.setState({
            loading: false,
            displayDelayCount: 0,
            imageUri: null
          })
          console.log('No match found. Please take a better picture next time')
          this.setState({ nothingModal: true })
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

  closeNothingModal = () => {
    this.setState({ nothingModal: false })
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
        base64: true,
        exif: true,
        quality: 0.1
      })
      console.log('after take picture async')
      this.setState({
        imageUri: photo.uri,
        base64: photo.base64,
        imageData: null
      })
      if (photo.base64) {
        console.log('fetch google vision initiated')
        try {
          const response = await fetch(
            `https://jubjub-server.herokuapp.com/api/visions/`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(photo)
            }
          )
          console.log('this is the response', response)
          const parsed = await response.json()
          console.log('parsed', parsed)
          if (parsed) {
            this.setState({
              text: parsed
            })
          } else {
            this.setState({
              text: 'parse error'
            })
          }
        } catch (err) {
          this.setState({
            text: 'parse error'
          })
          console.log('Error trying to Parse(Camera.js)...', err)
        }

        let res = {}
        if (this.state.text === 'parse error') {
          console.log('PARSE ERROR... Defaulting to closest Place')
          res = this.props.nearby[0]
        } else {
          res = await compareToHash(
            this.state.text,
            this.props.hashMap,
            this.props.nearby,
            this.props.user.id
          )
        }

        console.log('THE RESPONSE: ', res)
        if (res) {
          this.setState({ imageData: res })
          try {
            await this.props.fetchRecent()
          } catch (err) {
            console.err('Failed to fetchRecent (Camera.js)...', err)
          }
        }
      }
    }
  }

  render() {
    const { hasCameraPermission } = this.state

    //if user has not set permission yet
    if (hasCameraPermission === null) {
      return <Splash />
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
          <NothingModal
            visibility={this.state.nothingModal}
            closeModal={this.closeNothingModal}
          />
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
    loadInitialUserData: () => dispatch(me()),
    fetchRecent: () => dispatch(fetchRecent())
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
