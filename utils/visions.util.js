import axios from 'axios'

export const compareToHash = async (text, hashMap, nearby, userId) => {
  let mostOccurances = 0
  let matchedKey = 0
  let countObj = {} //create object that will store occurances
  const partialArr = []

  //1 - first, check to see if theres an exact match
  for (let i = 0; i < nearby.length; i++) {
    let modifiedText = text
      .replace(/\n/g, ' ')
      .slice(0, -1)
      .toLowerCase()

    let nearbyPlace = nearby[i].name.toLowerCase()
    if (modifiedText === nearbyPlace) {
      console.log('found exact match')
      console.log('THIS IS THE EXACT MATCH: ', nearby[i])
      countObj = {}
      await postToDb(nearby[i], userId)
      return nearby[i]
    }
  }

  //2 - if no exact match, check for best match
  //replace \n with spaces, remove last char, make lowercase, split text up by space
  let wordsToSearch = text
    .replace(/\n/g, ' ')
    .slice(0, -1)
    .toLowerCase()
    .split(' ')

  const partialTextSplit = wordsToSearch.map(word => splitValue(word))
  partialTextSplit.forEach(arr => {
    const filtered = arr.filter(partial => {
      return partial.length > 2
    })
    partialArr.push(...filtered)
  })

  console.log('THIS IS THE PARTIAL TEXT ARR', partialArr)

  console.log('we will be searching these words', wordsToSearch)
  //for each word, check if in hashMap, if it is, add or increment in countObj
  wordsToSearch.forEach(word => {
    if (hashMap[word]) {
      hashMap[word].forEach(index => {
        if (!countObj[index]) {
          countObj[index] = 1
        } else {
          countObj[index] = countObj[index] + 1
        }
      })
    }
  })

  console.log('we will be searching these partials', partialArr)
  partialArr.forEach(partialWord => {
    for (let key in hashMap) {
      if (key.includes(partialWord)) {
        hashMap[key].forEach(index => {
          if (!countObj[index]) {
            countObj[index] = 1
          } else {
            countObj[index] = countObj[index] + 1
          }
        })
      }
    }
  })

  console.log('HASH MAP', hashMap)
  console.log('here is the Count Obj', countObj)
  if (Object.keys(countObj).length !== 0) {
    //find the key with the largest value. That is the index we will use
    for (let key in countObj) {
      if (countObj[key] > mostOccurances) {
        mostOccurances = countObj[key]
        matchedKey = key
        console.log('most occurances has changed...', mostOccurances)
      } //if there are same amount of occurances for more than one matchedIndex, it will take the closest place
    }
    console.log(`key ${matchedKey} has the largest value`)
    // this.setState({ imageData: nearby[matchedIndex] })
    console.log('THIS IS THE BEST MATCH: ', nearby[matchedKey])
    countObj = {}

    await postToDb(nearby[matchedKey], userId)
    return nearby[matchedKey]
  }
}

//POST route to database
const postToDb = async (placeObj, userId) => {
  try {
    console.log('Posting to DB...')
    await axios.post(
      `https://jubjub-server.herokuapp.com/api/places/${userId}/recent`,
      placeObj
    )
  } catch (err) {
    console.err('COULD NOT SAVE TO DB - visions.util.js... ', err)
  }
}

//Split value by every 3 characters
function splitValue(value) {
  return value.match(/.{1,3}/g)
}
