import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Constants, Location, Permissions } from 'expo'
import Camera from './Camera'
import { Content } from 'native-base'
import Swiper from 'react-native-swiper'
import Places from './Places/Places'
import Settings from './Settings/Settings'

const styles = StyleSheet.create({
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      outerScrollEnabled: true,
      pageIndex: 1
    }
  }

  changePage = refScroll => {
    this.refs.sliderX.scrollBy(refScroll)
  }

  render() {
    let text = 'Waiting...'
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
    }
    return (
      <Content>
        <Swiper
          loop={false}
          showsPagination={false}
          index={this.state.pageIndex}
          scrollEnabled={this.state.outerScrollEnabled}
          ref="sliderX"
        >
          <View style={styles.slideDefault}>
            <Places changePage={refScroll => this.changePage(refScroll)} />
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
