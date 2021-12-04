const fs = require('fs')

let horizontalPosition = 0
let depthPosition = 0
let aim = 0
let commands = {}


// Add commands from input file to object using regex
const convertCommandsToObject = (data) => {
  const regex = new RegExp(/\s\n/gm)
  parse = data.split(regex)

  // Grab the direction
  const directionRegex = new RegExp(/[a-z]+/gm)
  // Grab the value
  const valueRegex = new RegExp(/[0-9]+/gm)

  // Add direction and value to commands object
  for (let i = 0; i < parse.length; i++) {
    commands[i] = {
      'direction': parse[i].match(directionRegex),
      'value': +parse[i].match(valueRegex),
    }
  }
}

// Calculate each command
const calculatePosition = (data) => {
  for (let i in data) {
    // For each command, check the direction and add or subtract the value
    switch (data[i].direction[0]) {
      case 'forward' : {horizontalPosition += data[i].value; depthPosition +=  aim * data[i].value} break
      case 'down' : {aim += data[i].value} break
      case 'up': {aim -= data[i].value} break
    }
  }
}

// Multiply the horizontal and depth position to get the final answer
const finalPosition = (a, b) => {
  return (console.log("Final position is:", a * b))
}

fs.readFile('input.txt', 'utf8', (err, data) => {
  // console.log(data)
  convertCommandsToObject(data)
  calculatePosition(commands)
  console.log("Horizontal:", horizontalPosition, "Depth:", depthPosition, "Aim:", aim)

  finalPosition(horizontalPosition, depthPosition)
})