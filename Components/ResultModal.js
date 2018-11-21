import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native'

class ResultModal extends Component {
  state = {}
  render() {
    let name
    let rating
    let address
    let imageUrl
    let reviewCount
    let isClosed
    let price
    let phone
    if (this.props.data) {
      name = this.props.data.name
      rating = this.props.data.rating
      imageUrl = this.props.data.image_url
      reviewCount = this.props.data.review_count
      isClosed = this.props.data.isClosed ? 'Closed' : 'Open'
      price = this.props.data.price
      phone = this.props.data.phone
      if (this.props.data.location) {
        address = this.props.data.location.display_address
      }
    }

    return (
      <Modal visible={this.props.visibility} transparent={true}>
        <View style={styles.container}>
          <View style={styles.yelpContainer}>
            <View style={styles.yelpContainerHeader}>
              <Text style={styles.boldWhiteText}>{`Powered By   `}</Text>
              <Image
                style={{ height: 30, zIndex: 100 }}
                source={require('../assets/yelp.png')}
              />
            </View>
            <View style={styles.yelpTitleContaier}>
              <Text style={styles.titleText}>{name}</Text>

              <Text style={styles.keyInfoText}>{address}</Text>
            </View>
            <View style={styles.yelpTopCardContainer}>
              <View style={styles.yelpImageContainer}>
                <Image
                  style={{ height: 130, width: 130, zIndex: 100 }}
                  source={{
                    uri: imageUrl
                  }}
                />
              </View>
              <View style={styles.keyInfoContainer}>
                <Text style={styles.keyInfoText}>Price: {price}</Text>

                <Text style={styles.keyInfoText}>Rating: {rating}⭐</Text>
                <Text style={styles.keyInfoText}>
                  # of Reviews: {reviewCount}
                </Text>
                <Text style={styles.keyInfoText}>Currently {isClosed}</Text>
                <Text style={styles.keyInfoText}>{phone}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={this.props.closeModal}
              style={styles.yelpContainerBottom}
            >
              <Text style={styles.boldWhiteText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

export default ResultModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
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
