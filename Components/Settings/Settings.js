import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import SettingsList from 'react-native-settings-list'
import Email from './SettingsModals/Email'
import Name from './SettingsModals/Name'
import PhoneNumber from './SettingsModals/PhoneNumber'
import Password from './SettingsModals/Password'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'

class Settings extends React.Component {
  state = {
    emailViz: false,
    phoneViz: false,
    nameViz: false,
    passwordViz: false,
    logoutViz: false
  }
  toggleName = () => {
    this.setState({ nameViz: !this.state.nameViz })
  }

  toggleEmail = () => {
    this.setState({ emailViz: !this.state.emailViz })
  }

  togglePhone = () => {
    this.setState({ phoneViz: !this.state.phoneViz })
  }

  togglePassword = () => {
    console.log('passsword')
    this.setState({ passwordViz: !this.state.passwordViz })
  }

  toggleLogout = () => {
    this.setState({ logoutViz: !this.state.logoutViz })
  }

  render() {
    const email = this.props.user.email
    const first = this.props.user.firstName
    const last = this.props.user.lastName
    let phone
    console.log('this is the user', this.props.user)
    if (this.props.user.phone) {
      phone = this.props.user.phone
    } else {
      phone = 'Enter your Phone Number'
    }
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
              titleInfo={`${first} ${last}`}
              //titleInfoStyle={styles.titleInfoStyle}
              onPress={() => this.toggleName()}
            />
            <SettingsList.Item
              icon={
                <Image
                //style={styles.imageStyle}
                //source={require('./images/cellular.png')}
                />
              }
              title="Email"
              titleInfo={`${email}`}
              onPress={() => this.toggleEmail()}
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
              onPress={() => this.togglePassword()}
            />
            <SettingsList.Item
              icon={
                <Image
                //style={styles.imageStyle}
                //source={require('./images/cellular.png')}
                />
              }
              title="Phone Number"
              titleInfo={phone}
              onPress={() => this.togglePhone()}
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
        <Name
          visibility={this.state.nameViz}
          toggle={this.toggleName}
          first={first}
          last={last}
        />
        <Email
          visibility={this.state.emailViz}
          toggle={this.toggleEmail}
          email={email}
        />

        <PhoneNumber
          visibility={this.state.phoneViz}
          toggle={this.togglePhone}
          phone={phone}
        />
        <Password
          visibility={this.state.passwordViz}
          toggle={this.togglePassword}
        />

        {/* Navigator buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 15,
            alignItems: 'flex-end'
          }}
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            style={{ color: 'black', fontSize: 36 }}
            onPress={() => this.props.changePage(-2)}
          />

          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.props.changePage(-1)}>
              <MaterialCommunityIcons
                name="circle-outline"
                style={{
                  color: 'black',
                  fontSize: 60,
                  marginBottom: 5
                }}
              />
            </TouchableOpacity>
            {/* <Icon
                    name="ios-images"
                    style={{ color: 'white', fontSize: 36 }}
                  /> */}
          </View>
          <MaterialCommunityIcons
            name="google-circles-communities"
            style={{ color: 'red', fontSize: 36 }}
          />
        </View>
      </View>
    )
  }
  onValueChange(value) {
    this.setState({ switchValue: value })
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(Settings)
