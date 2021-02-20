const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const mongoose = require('mongoose')

require("./Book")
const Book = mongoose.model("book")

mongoose.connect("mongodb+srv://rootUser:0246813579@cluster0.scqye.mongodb.net/books?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => {
    console.log('books_service mongodb is running')
  })

app.post('/book', (req, res) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  }

  const book = new Book(newBook)

  book.save()
    .then(res => console.log(res))
    .catch(err => {
      if (err) console.log(err)
    })

  res.send()
})

app.get('/books', (req, res) => {
  Book.find()
    .then(books => {
      res.json(books)
    })
    .catch(err => {
      if (err) throw err
    })
})

app.get('/book/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (book) res.json(book)
      else res.sendStatus(404)
    })
    .catch(err => {
      if (err) throw err
    })
})

app.delete('/book/:id', (req, res) => {
  Book.findOneAndRemove(req.params.id)
    .then(res => console.log(res))
    .catch(err => {
      if (err) throw err
    })
})

app.listen(4545, () => {
  console.log('book service is running')
})
