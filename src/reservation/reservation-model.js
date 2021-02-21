const { Schema, model } = require('mongoose')
const RESERVATION_TYPES = require('./reservation-constants')


const reservationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  nOfGuests: {
    type: Number, 
    //required: true,
  },
  type: {
    type: String,
    enum: [RESERVATION_TYPES],
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  indate: {
    type: Date,
    
  },
  endDate: {
    type: Date,
    
  },
  image: {
    type: Buffer,
    required: true,
    select: false,
  },
  imageContentType: {
    type: String,
    required: true,
    select: false,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: String,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = model('Reservation', reservationSchema)
