import React from 'react'
import { Container } from 'native-base'
import HomePage from './Components/HomePage'
import { Provider } from 'react-redux'
import store from './Components/store/index'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <HomePage />
        </Container>
      </Provider>
    )
  }
}
