import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  Alert,
  Linking
} from 'react-native'
import { connect } from 'react-redux'

import { ImagePicker, Permissions } from 'expo'
import { putAvatar } from '../../store/auth-reducer'

class ProfilePicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      imageUri: null,
      base64: null,
      cameraRollStatus: '',
      cameraRollGranted: true
    }
    this.setCameraRollStatus()
  }
  submitPicture = () => {
    console.log('this is the image', this.state.imageUri)
    this.props.updateAvatar({ base64: JSON.stringify(this.state.base64) })
    this.props.toggle()
    console.log('submitting picture to backend')
  }
  setCameraRollStatus = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    console.log('camera status:', status)
    this.setState({
      cameraRollStatus: status,
      cameraRollGranted: status === 'granted'
    })
  }
  onPickImageButtonPress = async () => {
    if (
      this.state.cameraRollStatus === 'denied' ||
      this.state.cameraRollStatus === 'undetermined'
    ) {
      await Permissions.askAsync(Permissions.CAMERA_ROLL)
        .then(data => {
          if (data.status === 'denied') {
            Alert.alert('Please give access to camera roll in device settings.')
            Linking.openURL('app-settings:')
            return
          }
        })
        .catch(err => console.error('askAsync camera roll error', err))
      this.setCameraRollStatus()
    }
    console.log('PERMISSION GRANTED')
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3.5, 2],
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (!result.cancelled) {
      this.setState({ image: result.uri, base64: result.base64 })
    }
  }

  render() {
    let { image } = this.state

    return (
      <Modal visible={this.props.visibility} transparent={true}>
        <View style={styles.container}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 250,
                height: 250,
                borderRadius: 250 / 2,
                marginBottom: 70
              }}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="Choose Profile Picture"
              onPress={this.onPickImageButtonPress.bind(this)}
            />
            <Button title="Submit" onPress={this.submitPicture} />
            <Button title="Cancel" onPress={this.props.toggle} />
          </View>
        </View>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAvatar: image => dispatch(putAvatar(image))
  }
}
export default connect(
  null,
  mapDispatchToProps
)(ProfilePicture)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderColor: 'black',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: '20%',
    marginBottom: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    width: '101%'
  }
})
