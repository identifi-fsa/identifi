import axios from 'axios'
import { hasAction } from 'expo/build/StoreReview'

export const placesState = {
  recent: [],
  nearby: [],
  hashMap: {}
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
    // console.log('THIS IS DATA', dummyData.businesses)
    const action = getNearby(data.businesses)
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
      let hashMap = {}
      // let narrowedDownData = []
      let results = action.nearby

      for (let i = 0; i < results.length; i++) {
        //the below commented out uses Google NearbyPlaces. We can delete this now as we're using Yelp. Just here incase we need to roll back
        // let placeObj = {}
        // placeObj.lat = results[i].geometry.location.lat
        // placeObj.lng = results[i].geometry.location.lng
        // placeObj.icon = results[i].icon
        // placeObj.place_id = results[i].place_id
        // placeObj.name = results[i].name
        // placeObj.types = results[i].types
        // placeObj.vicinity = results[i].vicinity
        // if (results[i].rating) placeObj.rating = results[i].rating
        // if (results[i].photos)
        //   placeObj.photo = results[i].photos[0].photo_reference
        // if (results[i].photos) placeObj.price_level = results[i].price_level
        // narrowedDownData.push(placeObj)

        const splitNameArr = results[i].name.toLowerCase().split(' ')
        splitNameArr.forEach(word => {
          if (hashMap[word]) {
            hashMap[word].push(i)
          } else {
            hashMap[word] = [i]
          }
        })
      }
      // We can delete the commented out lines below. Just here in case we want to remove the hashMap part

      // results.forEach(place => {
      //   let placeObj = {}
      //   placeObj.lat = place.geometry.location.lat
      //   placeObj.lng = place.geometry.location.lng
      //   placeObj.icon = place.icon
      //   placeObj.place_id = place.place_id
      //   placeObj.name = place.name
      //   placeObj.types = place.types
      //   placeObj.vicinity = place.vicinity
      //   if (place.rating) placeObj.rating = place.rating
      //   if (place.photos) placeObj.photo = place.photos[0].photo_reference
      //   if (place.photos) placeObj.price_level = place.price_level
      //   narrowedDownData.push(placeObj)
      // })
      return { ...state, nearby: results, hashMap: hashMap }
    default:
      return state
  }
}

export default placesReducer
