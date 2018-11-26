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
import { putUser } from '../../store/auth-reducer'

class Password extends React.Component {
  state = {
    password: ''
  }

  putPassword = () => {
    this.props.updatepassword('password', this.state.password)
    this.props.toggle()
  }

  passwordChangeHandler = event => {
    this.setState({
      password: event
    })
  }

  render() {
    console.log('password', this.props)
    return (
      <Modal visible={this.props.visibility}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Password`}
              placeholderTextColor="#2f95dc"
              value={this.state.password}
              onChangeText={this.passwordChangeHandler}
              keyboardType="default"
              returnKeyType="go"
              textContentType="password"
              autoFocus={true}
              secureTextEntry={true}
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
                onPress={this.putPassword}
                disabled={!this.state.password}
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

const mapDispatchToProps = dispatch => {
  return {
    updatepassword: (field, password) => dispatch(putUser(field, password))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Password)
