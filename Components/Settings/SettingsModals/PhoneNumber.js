import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

class PhoneNumber extends React.Component {
  state = {
    phoneNumber: ''
  }

  putPhoneNumber = () => {
    // this.updatePhoneNumber(this.state.phoneNumber)
    this.props.toggle()
  }

  phoneNumberChangeHandler = event => {
    this.setState({
      phoneNumber: event
    })
  }

  render() {
    console.log('phoneNumber', this.props)
    return (
      <Modal visible={this.props.visibility}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`PhoneNumber`}
              dataDetectorTypes="phoneNumber"
              placeholderTextColor="#2f95dc"
              value={this.state.phoneNumber}
              onChangeText={this.phoneNumberChangeHandler}
              keyboardType="numeric"
              returnKeyType="next"
              textContentType="telephoneNumber"
              autoFocus={true}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={this.props.toggle}
                style={styles.cancelButtonContainer}
              >
                <View>
                  <Text style={styles.buttonText}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.putPhoneNumber}
                disabled={!this.state.phoneNumber.includes('@')}
                style={styles.submitButtonContainer}
              >
                <View>
                  <Text style={styles.buttonText}>Update</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.space} />
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    height: '100%'
  },
  input: {
    height: 30,
    width: '70%',
    fontSize: 15,
    backgroundColor: 'white',
    color: '#2f95dc',
    paddingLeft: 10
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center'
  },
  inputLabel: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    height: 100,
    width: '70%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  submitButtonContainer: {
    height: 40,
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#32FA8F',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2
  },
  cancelButtonContainer: {
    height: 40,
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FF4C4C',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2
  },
  space: {
    height: '40%',
    backgroundColor: '#2f95dc'
  }
})

// const mapStateToProps = state => {
//   return {
//     phoneNumber: state.user.phoneNumber
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     updatePhoneNumber: phoneNumber => dispatch(updatePhoneNumber(phoneNumber))
//   }
// }

export default connect()(PhoneNumber)
// mapStateToProps,
// mapDispatchToProps
