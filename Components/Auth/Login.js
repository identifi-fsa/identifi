import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import { authLogin } from '../store/auth-reducer'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onSubmit = () => {
    this.props.login(this.state.email, this.state.password)
    this.props.closeModal()
  }

  emailChangeHandler = event => {
    this.setState({
      email: event
    })
  }

  passwordChangeHandler = event => {
    this.setState({
      password: event
    })
  }

  render() {
    console.log('state', this.props)
    return (
      <Modal visible={this.props.modalVisibility} animation="slide">
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {/* once we have a logo.... */}
            <Image
              source={{
                uri: `https://identifi-jubjub.s3.amazonaws.com/assets/identifi-logo.png`
              }}
              style={{
                width: 275,
                height: 100
              }}
            />
            <Text style={styles.inputLabel}>Enter Email</Text>

            <TextInput
              style={styles.input}
              placeholder={`Email`}
              placeholderTextColor="black"
              value={this.state.email}
              onChangeText={this.emailChangeHandler}
              keyboardType="email-address"
              returnKeyType="next"
              textContentType="emailAddress"
              autoFocus={true}
              autoCapitalize="none"
            />
            <Text style={styles.inputLabel}>Enter Password</Text>
            <TextInput
              style={styles.input}
              placeholder={`Password`}
              placeholderTextColor="black"
              value={this.state.password}
              onChangeText={this.passwordChangeHandler}
              keyboardType="default"
              returnKeyType="go"
              textContentType="password"
              autoFocus={true}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButtonContainer}
                onPress={this.props.closeModal}
              >
                <View>
                  <Text style={styles.buttonText}>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onSubmit}
                disabled={!this.state.password && !this.state.email}
                style={styles.submitButtonContainer}
              >
                <View>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.space} />
        </View>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(authLogin(email, password))
  }
}

const connected = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default connected

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'black',
    justifyContent: 'center',
    height: '100%'
  },
  input: {
    height: 30,
    width: '70%',
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
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
    height: '20%',
    backgroundColor: 'black'
  }
})
