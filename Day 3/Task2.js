const fs = require('fs')

let oxygen_generator_rating = []
let co2_scrubber_rating = []
let parseArr = []


// Parse input file 
const parseInput = (data) => {
  let regex = new RegExp(/\s\n/gm)
  parseArr = data.split(regex)
}

// Filter items from array using index position
function filterItems(arr, index, query) {
  return arr.filter(function (el) {
    return el[index] === query
  })
}

// Parse input file to get oxygen binary
const calculateOxygen = (data) => {
  let regex = new RegExp(/,/gm)
  let zero = 0
  let one = 0
  let indexValue = []
  let oxygen_filter = []
  oxygen_generator_rating = data

  for (let i = 0; i < oxygen_generator_rating[0].length; i++) {

    for (let j = 0; j < oxygen_generator_rating.length; j++) {
      switch (oxygen_generator_rating[j][i]) {
        case '0': zero++; break
        case '1': one++; break
      }
    }
    indexValue.push(zero <= one ? '1' : '0')
    oxygen_generator_rating = filterItems(oxygen_generator_rating, i, indexValue[i])

    zero = 0
    one = 0
    oxygen_filter.push(indexValue.toString().replace(regex, ''))

    if (oxygen_generator_rating.length === 1) {
      break
    }
  }
}

// Parse input file to get CO2 binary
const calculateCo2 = (data) => {
  let regex = new RegExp(/,/gm)
  let zero = 0
  let one = 0
  let indexValue = []
  let co2_filter = []
  co2_scrubber_rating = data

  for (let i = 0; i < co2_scrubber_rating[0].length; i++) {

    for (let j = 0; j < co2_scrubber_rating.length; j++) {
      switch (co2_scrubber_rating[j][i]) {
        case '0': zero++; break
        case '1': one++; break
      }
    }
    indexValue.push(zero <= one ? '0' : '1')
    co2_scrubber_rating = filterItems(co2_scrubber_rating, i, indexValue[i])

    zero = 0
    one = 0
    co2_filter.push(indexValue.toString().replace(regex, ''))

    if (co2_scrubber_rating.length === 1) {
      break
    }
  }
}

const lifeSupportCalcultaion = (a, b) => {
  return console.log("Life support rating:", a * b)
}


fs.readFile('input.txt', 'utf8', (err, data) => {
  parseInput(data)
  calculateOxygen(parseArr)
  calculateCo2(parseArr)
  console.log("Oxygen Generator Rating:", oxygen_generator_rating)
  console.log("CO2 Scrubbing Rating:", co2_scrubber_rating)
  lifeSupportCalcultaion(parseInt(oxygen_generator_rating, 2), parseInt(co2_scrubber_rating, 2))
})