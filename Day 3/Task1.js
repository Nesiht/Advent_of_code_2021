const fs = require('fs')

let gammaRate = []
let epsilonRate = []
let parseArr = []
let finalBitValue = []

const parseInput = (data) => {
  let regex = new RegExp(/\s\n/gm)
  parseArr = data.split(regex)
}

// Find the value at each index of every element in the array and store it in finalBitValue
const checkEachIndexValueInElement = (data) => {
  let regex = new RegExp(/,/gm)
  let indexValue = []

  // For each index position
  for (let index = 0; index < data[0].length; index++) {

    // For each index value at each element in array, store the value in indexValue array
    for (let e = 0; e < data.length; e++) {
      indexValue.push(data[e][index])
    }

    // Store each value in array and parse the data
    finalBitValue.push(indexValue.toString().replace(regex, ''))

    indexValue = []
  }
}

// Check if there is more 0´s or 1´s in the element and store the new value in gammaRate
const calculateGamma = (data) => {
  let parsedData = []
  let regex = new RegExp(/,/gm)
  for (let i = 0; i < data.length; i++) {
    let zero = 0
    let one = 0

    // Count number of 0´s and 1´s in each element
    for (let j = 0; j < data[i].length; j++) {
      switch (data[i][j]) {
        case '0': { zero++; break }
        case '1': { one++; break }
      }
    }
    // Add 0 or 1 to temp array
    if (zero > one) {
      parsedData.push("0")
    } else {
      parsedData.push("1")
    }
  }
  // Store value in array and parse the data
  gammaRate.push(parsedData.toString().replace(regex, ''))
}

const calculateEpsilon = (data) => {
  let regex = new RegExp(/,/gm)
  let invertedGamma = []
  for (let i = 0; i < data[0].length; i++) {
    if (data[0][i] == "0") {
      invertedGamma.push("1")
    } else {
      invertedGamma.push("0")
    }
  }
  epsilonRate.push(invertedGamma.toString().replace(regex, ''))
}

const powerConsumptionCalculation = (a, b) => {
  return console.log("Power consumption:", a * b)
}


fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  parseInput(data)
  checkEachIndexValueInElement(parseArr)
  calculateGamma(finalBitValue)
  calculateEpsilon(gammaRate)
  powerConsumptionCalculation(parseInt(gammaRate, 2), parseInt(epsilonRate, 2))
})