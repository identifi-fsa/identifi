import axios from 'axios'
import { AsyncStorage } from 'react-native'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateUser = user => ({ type: UPDATE_USER, user })
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get(`https://jubjub-server.herokuapp.com/auth/me`)
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const authLogin = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`https://jubjub-server.herokuapp.com/auth/login`, {
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authSignUp = (
  email,
  password,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    res = await axios.post(`https://jubjub-server.herokuapp.com/auth/signup`, {
      email,
      password,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('USERID')
    // await axios.post(`https://jubjub-server.herokuapp.com/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

export const putUser = (field, update) => async dispatch => {
  try {
    const { data } = await axios.put(
      `https://jubjub-server.herokuapp.com/api/users/${field}`,
      update
    )
    const action = updateUser(data)
    dispatch(action)
  } catch (err) {
    console.log('this error is in the auth-reducer', err)
  }
}

export const asyncStorageLookup = userId => async dispatch => {
  console.log('inside the async thunk', userId, typeof userId)
  try {
    const { data } = await axios.get(
      `https://jubjub-server.herokuapp.com/api/users/${userId}`
    )
    console.log('user data', data)
    const action = getUser(data)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
