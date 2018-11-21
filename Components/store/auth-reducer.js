import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

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
    await axios.post(`https://jubjub-server.herokuapp.com/auth/logout`)
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
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
    default:
      return state
  }
}
