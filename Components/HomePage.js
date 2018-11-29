import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import Camera from './Camera'
import { Content } from 'native-base'
import Swiper from 'react-native-swiper'
import Places from './Places/Places'
import Settings from './Settings/Settings'
// import { colors } from '../constants/colors'
import { connect } from 'react-redux'

let colors

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      outerScrollEnabled: true,
      pageIndex: 1
    }
  }

  async componentDidMount() {
    try {
      await this.props.fetchRecent()
    } catch (err) {
      console.err('Could not fetch Recent Places (HomePage.js)...', err)
    }
  }

  changePage = refScroll => {
    this.refs.sliderX.scrollBy(refScroll)
  }

  render() {
    colors = this.props.styles
    let text = 'Waiting...'
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
    }
    const lat = this.props.lat
    const lng = this.props.lng
    return (
      <Content>
        <Swiper
          loop={false}
          showsPagination={false}
          index={this.state.pageIndex}
          scrollEnabled={this.state.outerScrollEnabled}
          ref="sliderX"
          bounces={false}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.backgroundColor
            }}
          >
            <Places
              changePage={refScroll => this.changePage(refScroll)}
              lat={lat}
              lng={lng}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Camera changePage={refScroll => this.changePage(refScroll)} />
          </View>
          <View style={{ flex: 1 }}>
            <Settings changePage={refScroll => this.changePage(refScroll)} />
          </View>
        </Swiper>
      </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    styles: state.styles
  }
}
export default connect(mapStateToProps)(HomePage)

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
