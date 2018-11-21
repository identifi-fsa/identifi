export const compareToHash = (text, hashMap, nearby) => {
  // const hashMap = this.props.hashMap
  // const nearby = this.props.nearby
  let index = 0
  const countObj = {} //create object that will store occurances

  //1 - first, check to see if theres an exact match
  for (let i = 0; i < nearby.length; i++) {
    let modifiedText = text
      .replace(/\n/g, ' ')
      .slice(0, -1)
      .toLowerCase()
    let nearbyPlace = nearby[i].name.toLowerCase()
    if (modifiedText === nearbyPlace) {
      console.log('found exact match')
      // this.setState({ imageData: nearby[i] })
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

  console.log('HASH MAP', hashMap)
  console.log('here is the Count Obj', countObj)
  if (Object.keys(countObj).length !== 0) {
    //find the key with the largest value. That is the index we will use
    for (let key in countObj) {
      if (countObj[key] > index) {
        index = key
      } //EDGE CASE - if there are same amount of occurances for more than one index, it will take the closest place
    }
    console.log(`key ${index} has the largest value`)
    // this.setState({ imageData: nearby[index] })
    return nearby[index]
  }
}
