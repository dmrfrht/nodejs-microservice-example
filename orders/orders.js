const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())

const mongoose = require('mongoose')

require("./Order")
const Order = mongoose.model("order")

mongoose.connect("mongodb+srv://rootUser:0246813579@cluster0.sggei.mongodb.net/orders?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => {
    console.log('order_service mongodb is running')
  })

app.post('/order', (req, res) => {
  const newOrder = {
    customerID: mongoose.Types.ObjectId(req.body.customerID),
    bookID: mongoose.Types.ObjectId(req.body.bookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate
  }

  const order = new Order(newOrder)

  order.save()
    .then(order => res.json(order))
    .catch(err => {
      if (err) throw err
    })
})

app.get('/orders', (req, res) => {
  Order.find()
    .then(books => res.json(books))
    .catch(err => {
      if (err) throw err
    })
})

app.get('/order/:id', (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      if (order) {

        axios.get(`http://localhost:4747/customer/${order.customerID}`)
          .then(response => {
            const orderObject = {
              customerName: response.data.name,
              bookTitle: ''
            }

            axios.get(`http://localhost:4545/book/${order.bookID}`)
              .then(response => {
                orderObject.bookTitle = response.data.title
                res.json(orderObject)
              })
          })
      } else {
        res.send("Invalid Order")
      }
    })
})


app.listen(7777, () => {
  console.log('orders service is running')
})
