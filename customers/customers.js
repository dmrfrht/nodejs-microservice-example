const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const mongoose = require('mongoose')

require("./Customer")
const Customer = mongoose.model("customer")

mongoose.connect("mongodb+srv://rootUser:0246813579@cluster0.pv31t.mongodb.net/customers?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => {
    console.log('customer_service mongodb is running')
  })

app.post('/customer', (req, res) => {
  const newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  }

  const customer = new Customer(newCustomer)

  customer.save()
    .then(res => console.log(res))
    .catch(err => {
      if (err) throw err
    })
})

app.get('/customers', (req, res) => {
  Customer.find()
    .then(customers => res.json(customers))
    .catch(err => {
      if (err) throw err
    })
})

app.get('/customer/:id', (req, res) => {
  Customer.findById(req.params.id)
    .then(customer => {
      if (customer) res.json(customer)
      else res.sendStatus(404)
    })
    .catch(err => {
      if (err) throw err
    })
})

app.delete('/customer/:id', (req, res) => {
  Customer.findOneAndRemove(req.params.id)
    .then(res => console.log(res))
    .catch(err => {
      if (err) throw err
    })
})

app.listen(4747, () => {
  console.log('customers service is running')
})
