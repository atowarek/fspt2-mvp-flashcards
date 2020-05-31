const express = require('express')
//const db = require('../lib/db')
const routes = express.Router()
const fetch = require('node-fetch')

// routes.get('/', (req, res) => {
//   // const { amount } = req.params
//   // fetch(`https://opentdb.com/api.php?amount=${amount}`)
//   fetch('https://opentdb.com/api.php?amount=5')
//     .then(response => response.json())
//     .then(response => {
//       const parsedData = response.results.map(
//         ({ category, amount, id, question, correct_answer, incorrect_answers }) => {
//           return {
//             category: category,
//             amount,
//             id, //uuid (here?)
//             question,
//             answer: correct_answer,
//             choices: incorrect_answers, //use sort to display randomly (here or in client?)
//             //merge choices with answer - here or in client?
//           }
//         }
//       )
//       res.send(parsedData)
//       //res.send(response.results)
//     })
// })

//DELETE THIS ONE IF I DO IT ON THE CLIENT (DECIDE)

module.exports = routes
