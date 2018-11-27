import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image
} from 'react-native'
import LoginForm from './Login'
import SignupForm from './Signup'

class Auth extends React.Component {
  state = {
    loginModalVisible: false,
    signupModalVisible: false
  }

  setLoginModalVisible = () => {
    this.setState({
      loginModalVisible: true
    })
  }

  closeLoginModalVisibile = () => {
    this.setState({
      loginModalVisible: false
    })
  }

  setSignupModalVisible = () => {
    this.setState({
      signupModalVisible: true
    })
  }

  closeSignupModalVisibile = () => {
    this.setState({
      signupModalVisible: false
    })
  }

  render() {
    return (
      <Modal>
        <View style={styles.container}>
          <Image source={require('../../assets/identifi-logo.png')} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.setSignupModalVisible}
              style={styles.signUpButton}
            >
              <View>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.setLoginModalVisible}
              style={styles.loginButton}
            >
              <View>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          <LoginForm
            modalVisibility={this.state.loginModalVisible}
            closeModal={this.closeLoginModalVisibile}
          />
          <SignupForm
            modalVisibility={this.state.signupModalVisible}
            closeModal={this.closeSignupModalVisibile}
          />
        </View>
      </Modal>
    )
  }
}

export default Auth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '97.5%',
    marginTop: 100
  },
  loginButton: {
    flex: 1,
    height: 25,
    borderColor: 'white',
    borderWidth: 1,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'red'
  },
  signUpButton: {
    flex: 1,
    height: 25,
    borderColor: 'red',
    borderWidth: 1,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  signUpButtonText: {
    color: 'red',
    fontWeight: 'bold'
  }
})
