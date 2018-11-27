import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native'
import { Container, Header, Content, Spinner } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class NothingModal extends Component {
  render() {
    return (
      <Modal visible={this.props.visibility} transparent={true}>
        <View style={styles.container}>
          <View style={styles.yelpContainer}>
            <View style={styles.yelpContainerHeader}>
              {/* <Text style={styles.boldWhiteText}>{`Powered By   `}</Text> */}
              <MaterialCommunityIcons
                name="cloud-question"
                style={{ color: 'white', fontSize: 36 }}
              />
              <MaterialCommunityIcons
                name="cloud-question"
                style={{ color: 'white', fontSize: 36 }}
              />
              <MaterialCommunityIcons
                name="cloud-question"
                style={{ color: 'white', fontSize: 36 }}
              />
              <MaterialCommunityIcons
                name="cloud-question"
                style={{ color: 'white', fontSize: 36 }}
              />
              <MaterialCommunityIcons
                name="cloud-question"
                style={{ color: 'white', fontSize: 36 }}
              />
              <MaterialCommunityIcons
                name="cloud-question"
                style={{ color: 'white', fontSize: 36 }}
              />
            </View>
            <View style={styles.yelpTitleContaier}>
              <Text style={styles.titleText}>Ooops</Text>

              <Text style={styles.keyInfoText}>
                Looks like you took a bad picture
              </Text>
              <Text style={styles.keyInfoText}>Please try again</Text>
            </View>
            <MaterialCommunityIcons
              name="alert-outline"
              style={{ color: 'red', fontSize: 130 }}
            />
            {/* <MaterialCommunityIcons
              name="emoticon-neutral"
              style={{ color: 'red', fontSize: 50 }}
            /> */}
            <View style={styles.yelpTopCardContainer} />
            <TouchableOpacity
              onPress={this.props.closeModal}
              style={styles.yelpContainerBottom}
            >
              <Text style={styles.boldWhiteText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%'
  },
  modal: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18
  },
  yelpContainer: {
    display: 'flex',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    // marginLeft: '2.5%',
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'white'
  },
  yelpContainerHeader: {
    height: '12%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'black',
    flexDirection: 'row'
  },
  yelpTitleContaier: {
    width: '90%',
    marginLeft: '5%',
    display: 'flex',
    justifyContent: 'center'
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25
  },
  yelpTopCardContainer: {
    width: '90%',
    marginLeft: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  yelpImageContainer: {
    display: 'flex',
    height: 130,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyInfoContainer: {
    display: 'flex',
    height: 130,
    width: '55%',
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column'
  },
  contactContainer: {
    display: 'flex',
    height: 100,
    width: '90%',
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column'
  },
  keyInfoText: {
    fontSize: 20,
    fontWeight: '400'
  },
  yelpContainerBottom: {
    height: '12%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'black',
    // borderWidth: 2,
    backgroundColor: 'black'
  },
  poweredByContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boldWhiteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
})
