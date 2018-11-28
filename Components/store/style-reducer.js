import axios from 'axios'

/**
 * INITIAL STATE
 */
export const defaultStyles = {
  primary: 'red',
  backgroundColor: 'white',
  text: 'black',
  border: 'black',
  disabledNavButton: 'gray'
}

/**
 * ACTION TYPES
 */

const GET_STYLES = 'GET_STYLES'

/**
 * ACTION CREATORS
 */
const getStyles = style => ({ type: GET_STYLES, style })

export const fetchStyles = userId => async dispatch => {
  try {
    const res = await axios.get(
      `https://jubjub-server.herokuapp.com/api/styles/${userId}`
    )
    dispatch(getStyles(res.data))
  } catch (err) {
    console.error(err)
  }
}

//changing the route to match putAvatar in auth-reducer
export const putUserStyle = (field, userId, update) => async dispatch => {
  try {
    const res = await axios.put(
      `https://jubjub-server.herokuapp.com/api/styles/${field}/${userId}`,
      update
    )
    dispatch(getStyles(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultStyles, action) {
  switch (action.type) {
    case GET_STYLES:
      console.log('in the initial', action.style)
      if (action.style.darkMode) {
        action.style.backgroundColor = 'black'
        action.style.text = 'white'
        action.style.border = '#c8c7cc'
        action.style.disabledNavButton = 'lightgray'
      } else {
        action.style.backgroundColor = 'white'
        action.style.text = 'black'
        action.style.border = '#c8c7cc'
        action.style.disabledNavButton = 'lightgray'
      }

      return action.style
    default:
      return state
  }
}
