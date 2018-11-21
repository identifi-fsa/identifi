import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import placeReducer from './places-reducer'
import authReducer from './auth-reducer'

const reducer = combineReducers({
  places: placeReducer,
  auth: authReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, middleware)

export default store
