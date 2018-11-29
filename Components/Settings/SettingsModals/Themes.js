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
import { putUserStyle } from '../../store/style-reducer'

let colorsList = [
  { color: 'red' },
  { color: 'orange' },
  { color: 'yellow' },
  { color: 'green' },
  { color: 'blue' },
  { color: 'purple' }
]

class Themes extends React.Component {
  state = {
    color: 'red'
  }

  setColor = color => {
    this.setState({ color })
  }

  putUserTheme = () => {
    this.props.updateTheme('primary', this.props.user.id, {
      primary: this.state.color
    })
    this.props.toggle()
  }

  render() {
    console.log(this.state.color)
    return (
      <Modal visible={this.props.visibility}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.colorContainer}>
              {colorsList.map(color => {
                return (
                  <TouchableOpacity onPress={() => this.setColor(color.color)}>
                    <View
                      style={{
                        backgroundColor: color.color,
                        height: 100,
                        width: 100
                      }}
                    />
                  </TouchableOpacity>
                )
              })}
            </View>

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
                onPress={this.putUserTheme}
                style={styles.submitButtonContainer}
              >
                <View>
                  <Text style={styles.buttonText}>Update</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTheme: (field, userId, update) =>
      dispatch(putUserStyle(field, userId, update))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Themes)

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
  },
  colorContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'space-between'
  }
})
