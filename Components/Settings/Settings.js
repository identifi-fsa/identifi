import React from 'react'
import { Platform, StyleSheet, Text, View, Image } from 'react-native'
import SettingsList from 'react-native-settings-list'

class Settings extends React.Component {
  constructor() {
    super()
    this.onValueChange = this.onValueChange.bind(this)
    this.state = { switchValue: false }
  }
  render() {
    var bgColor = '#DCE3F4'
    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: '#f7f7f8',
            borderColor: '#c8c7cc'
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 40,
              marginBottom: 10,
              fontWeight: 'bold',
              fontSize: 50
            }}
          />
        </View>
        <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
          <SettingsList borderColor="#c8c7cc" defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              icon={
                <Image
                  style={{
                    height: 80,
                    width: 80,
                    marginLeft: 10,
                    marginTop: 10,
                    marginBottom: 10
                  }}
                  source={require('../../assets/fakeuser.png')}
                />
              }
              title="Profile Picture"
              onPress={() => alert('Route to Picture Page')}
            />
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />

            <SettingsList.Item
              icon={
                <Image
                //style={styles.imageStyle}
                //source={require('./images/wifi.png')}
                />
              }
              title="Name"
              titleInfo="Auto Populate UserName"
              //titleInfoStyle={styles.titleInfoStyle}
              onPress={() => alert('Route to Name Page')}
            />
            <SettingsList.Item
              icon={
                <Image
                //style={styles.imageStyle}
                //source={require('./images/cellular.png')}
                />
              }
              title="Email"
              titleInfo="Auto Populate Email"
              onPress={() => alert('Route To Email Page')}
            />
            <SettingsList.Item
              icon={
                <Image
                //style={styles.imageStyle}
                //source={require('./images/cellular.png')}
                />
              }
              title="Password"
              titleInfo="***********"
              onPress={() => alert('Route To Password Page')}
            />
            <SettingsList.Item
              icon={
                <Image
                //style={styles.imageStyle}
                //source={require('./images/cellular.png')}
                />
              }
              title="Phone Number"
              titleInfo="Auto Populate Number"
              onPress={() => alert('Route To Phone Number Page')}
            />
            <SettingsList.Item
              icon={
                <Image
                //style={styles.imageStyle}
                //source={require('./images/cellular.png')}
                />
              }
              title="Logout"
              onPress={() => alert('Route To Logout Page')}
            />
          </SettingsList>
        </View>
      </View>
    )
  }
  onValueChange(value) {
    this.setState({ switchValue: value })
  }
}

export default Settings
