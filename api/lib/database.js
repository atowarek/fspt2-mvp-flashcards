require('dotenv').config()
const mysql = require('mysql')

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const con = mysql.createConnection({
  host: DB_HOST || '127.0.0.1',
  user: DB_USER || 'root',
  password: DB_PASS,
  database: DB_NAME || 'flashcards',
  multipleStatements: true,
})

con.connect(function (err) {
  if (err) throw err
  console.log('Connected!')

  let createDatabase = 'CREATE DATABASE flashcards;'
  con.query(createDatabase, function (err, result) {
    if (err) throw err
    console.log('Database creation `flashcards` was successful!')
  })

  let createGames =
    'DROP TABLE if exists games; CREATE TABLE games(gameId INT NOT NULL AUTO_INCREMENT, score INT NOT NULL, user VARCHAR(255), PRIMARY KEY (gameId));'
  con.query(createGames, function (err, result) {
    if (err) throw err
    console.log('Table creation `games` was successful!')

    console.log('Closing...')
  })

  let createCategory =
    'DROP TABLE if exists category; CREATE TABLE category(id INT NOT NULL AUTO_INCREMENT, name TEXT, PRIMARY KEY (id));'
  con.query(createCategory, function (err, result) {
    if (err) throw err
    console.log('Table creation `category` was successful!')

    console.log('Closing...')
  })

  con.end()
})
