const fs = require('fs')

const DepthValues = []

// Add all items in input.txt to array
const addDepthToArray = (data) => {
  // Remove whitespace and new line with regex
  let regex = new RegExp(/\s\n/gm)
  parseArr = data.split(regex)

  // Add each item from parseArr to DepthValues array as a integer
  for (let i = 0; i < parseArr.length; i++) {
    DepthValues.push(+parseArr[i])
  }
}

// Compare each numbeer in depthValues array with the next integer
const compareDepths = (data) => {
  let depthIncrement = 0
  for (let i = 0; i < data.length; i++) {
    // Compare each value with the next value
    if (data[i] < data[i + 1]) {
      depthIncrement += 1
    }
  }
  console.log("Number of increased measurements :", depthIncrement)
}


fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) throw err
  addDepthToArray(data)
  compareDepths(DepthValues)
})