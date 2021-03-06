import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import { authSignUp } from '../store/auth-reducer'

class SignupForm extends React.Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  onSubmit = () => {
    this.props.signup(
      this.state.email,
      this.state.password,
      this.state.firstName,
      this.state.lastName
    )
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

  firstNameChangeHandler = event => {
    this.setState({
      firstName: event
    })
  }
  lastNameChangeHandler = event => {
    this.setState({
      lastName: event
    })
  }

  render() {
    console.log('state', this.props)
    return (
      <Modal visible={this.props.modalVisibility} animation="slide">
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter First Name</Text>

            <TextInput
              style={styles.input}
              placeholder={`First Name`}
              placeholderTextColor="black"
              value={this.state.firstName}
              onChangeText={this.firstNameChangeHandler}
              keyboardType="default"
              returnKeyType="next"
              textContentType="givenName"
              autoFocus={true}
            />

            <Text style={styles.inputLabel}>Enter Last Name</Text>

            <TextInput
              style={styles.input}
              placeholder={`Last Name`}
              placeholderTextColor="black"
              value={this.state.lastName}
              onChangeText={this.lastNameChangeHandler}
              keyboardType="default"
              returnKeyType="next"
              textContentType="familyName"
              autoFocus={true}
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
                  <Text style={styles.buttonText}>Sign Up</Text>
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
    signup: (email, password, firstName, lastName) =>
      dispatch(authSignUp(email, password, firstName, lastName))
  }
}

const connected = connect(
  null,
  mapDispatchToProps
)(SignupForm)

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
