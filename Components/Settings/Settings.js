import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import SettingsList from 'react-native-settings-list'
import Email from './SettingsModals/Email'
import Name from './SettingsModals/Name'
import PhoneNumber from './SettingsModals/PhoneNumber'
import Password from './SettingsModals/Password'
import Logout from './SettingsModals/Logout'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { asyncStorageLookup, logout } from '../store/auth-reducer'

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
  componentDidMount() {
    this._StoreData()
  }
  _StoreData = async () => {
    try {
      console.log(this.props.user.id)
      if (this.props.user.id) {
        const data = await AsyncStorage.setItem(
          'USERID',
          JSON.stringify(this.props.user.id)
        )
        console.log('data', data)
        return data
      }
    } catch (err) {
      console.log('inside the setUserID', err)
    }
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
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginLeft: 10,
                    marginTop: 20
                  }}
                />
              }
              title="Name"
              titleInfo={`${first} ${last}`}
              //titleInfoStyle={styles.titleInfoStyle}
              onPress={() => this.toggleName()}
            />
            <SettingsList.Item
              icon={
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginLeft: 10,
                    marginTop: 20
                  }}
                />
              }
              title="Email"
              titleInfo={`${email}`}
              onPress={() => this.toggleEmail()}
            />
            <SettingsList.Item
              icon={
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginLeft: 10,
                    marginTop: 20
                  }}
                />
              }
              title="Password"
              titleInfo="***********"
              onPress={() => this.togglePassword()}
            />
            <SettingsList.Item
              icon={
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginLeft: 10,
                    marginTop: 20
                  }}
                />
              }
              title="Phone Number"
              titleInfo={phone}
              onPress={() => this.togglePhone()}
            />
            <SettingsList.Item
              icon={
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  style={{
                    color: 'black',
                    fontSize: 12,
                    marginLeft: 10,
                    marginTop: 20
                  }}
                />
              }
              title="Logout"
              onPress={() => this.toggleLogout()}
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
        <Logout
          visibility={this.state.logoutViz}
          toggle={this.toggleLogout}
          name={first}
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
