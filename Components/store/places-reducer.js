import axios from 'axios'
import { hasAction } from 'expo/build/StoreReview'

export const placesState = {
  recent: [],
  nearby: [],
  hashMap: {},
  recentPlaceView: {}
}

const GET_RECENT = 'GET_RECENT'
const GET_NEARBY = 'GET_NEARBY'
const GET_RECENT_PLACE_VIEW = 'GET_RECENT_PLACE_VIEW'

export const getRecent = recent => ({
  type: GET_RECENT,
  recent
})

export const getNearby = nearby => ({
  type: GET_NEARBY,
  nearby
})

export const getRecentPlaceView = recentInfo => ({
  type: GET_RECENT_PLACE_VIEW,
  recentInfo
})

//THUNK ACTION CREATORS
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
    const action = getNearby(data.businesses)
    dispatch(action)
  } catch (err) {
    console.log(err)
  }
}

export const getRecentInfo = yelpId => async dispatch => {
  try {
    const { data } = await axios.get(
      `https://jubjub-server.herokuapp.com/api/places/recent/${yelpId}`
    )
    const action = getRecentPlaceView(data)
    dispatch(action)
  } catch (err) {
    console.error('ERROR IN REDUCER: ', err)
  }
}

const placesReducer = (state = placesState, action) => {
  switch (action.type) {
    case GET_RECENT:
      action.recent.sort(function(a, b) {
        let textA = a.dateVisited.toUpperCase()
        let textB = b.dateVisited.toUpperCase()
        return textA < textB ? 1 : textA > textB ? -1 : 0
      })
      return { ...state, recent: [action.recent] }
    case GET_NEARBY:
      let hashMap = {}
      let results = action.nearby

      for (let i = 0; i < results.length; i++) {
        const splitNameArr = results[i].name.toLowerCase().split(' ')
        splitNameArr.forEach(word => {
          if (hashMap[word]) {
            hashMap[word].push(i)
          } else {
            hashMap[word] = [i]
          }
        })
      }
      return { ...state, nearby: results, hashMap: hashMap }
    case GET_RECENT_PLACE_VIEW:
      return { ...state, recentPlaceView: action.recentInfo }
    default:
      return state
  }
}

export default placesReducer
