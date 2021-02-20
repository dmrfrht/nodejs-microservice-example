const mongoose = require('mongoose')

mongoose.model("order", {
  customerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  bookID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  initialDate: {
    type: Date,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  }
})
