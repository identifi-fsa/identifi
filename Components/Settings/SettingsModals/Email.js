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

class Email extends React.Component {
  state = {
    email: ''
  }

  putEmail = () => {
    // this.updateEmail(this.state.email)
    this.props.toggle()
  }

  render() {
    console.log('email', this.props)
    return (
      <View>
        <Modal visible={this.props.visibility}>
          <View>
            <TextInput
              style={{ height: 40 }}
              placeholder="auto populated user email"
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <TouchableOpacity onPress={this.props.toggle}>
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.putEmail}>
            <Text>Update Email</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     email: state.user.email
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     updateEmail: email => dispatch(updateEmail(email))
//   }
// }

export default Email
// mapStateToProps,
// mapDispatchToProps
