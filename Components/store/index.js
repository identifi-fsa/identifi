import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import placeReducer from './places-reducer'
import authReducer from './auth-reducer'
import styleReducer from './style-reducer'

const reducer = combineReducers({
  places: placeReducer,
  auth: authReducer,
  styles: styleReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, middleware)

export default store
