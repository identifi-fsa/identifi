import axios from 'axios'

export const placesState = {
  recent: [],
  nearby: []
}

const GET_RECENT = 'GET_RECENT'
const GET_NEARBY = 'GET_NEARBY'

export const getRecent = recent => ({
  type: GET_RECENT,
  recent
})

export const getNearby = nearby => ({
  type: GET_NEARBY,
  nearby
})

export const fetchRecent = () => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://jubjub-server.herokuapp.com/api/places/recent`
    )
    const action = getRecent(data)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const fetchNearby = (lat, lng) => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://jubjub-server.herokuapp.com/api/places/nearby/${lat}/${lng}`
    )
    const action = getNearby(data)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

const placesReducer = (state = placesState, action) => {
  switch (action.type) {
    case GET_RECENT:
      return { ...state, recent: [action.recent] }
    case GET_NEARBY:
      return { ...state, nearby: [action.nearby] }
    default:
      return state
  }
}

export default placesReducer
