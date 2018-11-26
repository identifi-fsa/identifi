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

class Name extends React.Component {
  state = {
    firstName: this.props.first,
    lastName: this.props.last
  }

  putName = () => {
    this.props.updateName('name', this.state.name)
    this.props.toggle()
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
    return (
      <Modal visible={this.props.visibility}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter First Name</Text>
            <TextInput
              style={styles.input}
              placeholder={this.state.firstName}
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
              placeholder={this.state.lastName}
              placeholderTextColor="black"
              value={this.state.lastName}
              onChangeText={this.lastNameChangeHandler}
              keyboardType="default"
              returnKeyType="next"
              textContentType="familyName"
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
                onPress={this.putName}
                disabled={!this.state.firstName || !this.state.lastName}
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
    backgroundColor: 'black',
    justifyContent: 'center',
    height: '100%'
  },
  input: {
    height: 30,
    width: '70%',
    fontSize: 15,
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
    alignItems: 'center',
    marginBottom: 50
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
    updateName: (field, name) => dispatch(putUser(field, name))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Name)
