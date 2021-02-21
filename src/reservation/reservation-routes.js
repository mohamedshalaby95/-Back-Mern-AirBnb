const router = require('express').Router()
const multer = require('multer')

const storageConfig = require('./multer.config')
const upload = multer({ storage: storageConfig })

const { isAuth } = require('../middleware/auth')
const Reservation = require('./reservation-model')
const ReservationService = require('./reservation-service')
const user=require("../user/user-model");

const reservationService = new ReservationService({ Reservation,user })

// get all reservations
router.post('/', async (req, res) => {
  const reservations = await reservationService.getReservations({
    body: req.body,
    originalUrl: req.originalUrl,
  })


    
  
  return res.json(reservations)
})
router.post('/type', async (req, res) => {
  const reservations = await reservationService.gettypeReservations({
    body: req.body,
    // originalUrl: req.originalUrl,
  })
  return res.json(reservations)
})

// get user hostings
router.get('/hosting', isAuth, async (req, res) => {
  const hostings = await reservationService.gethostings({
    userId: req.userId,
  })
  
  res.json(hostings);
  
})
// 
router.get('/user', isAuth, async (req, res) => {
  
  const user = await reservationService. getuser({
    userId: req.userId,
  })
  
  res.json(user);
  
})

// create a hosting for user
router.post('/hosting', isAuth, upload.single('image'), async (req, res) => {
  const hosting = await reservationService.createhosting({
    body: req.body,
    image: req.file,
    userId: req.userId,
  })


  return res.json(hosting)
})

router.get('/:reservationId', async (req, res) => {
  const reservation = await reservationService.getReservationDetails({
    reservationId: req.params.reservationId,
    originalUrl: req.originalUrl,
  })
 
  return res.json(reservation)
})

router.get('/:reservationId/image', async (req, res) => {
  const { buffer, contentType } = await reservationService.getReservationImage({
    reservationId: req.params.reservationId,
  })

  res.set('Content-Type', contentType)
  
  return res.send(Buffer.from(buffer, 'base64'))
})

router.get('/:reservationId/reserve', isAuth, async (req, res) => {
  const status = await reservationService.reserve({
    reservationId: req.params.reservationId,
  })
  if (status) return res.status(202).send()
  else return res.status(405).send('Already reserved')
})

router.get('/:reservationId/unreserve', isAuth, async (req, res) => {
  const status = await reservationService.unreserve({
    reservationId: req.params.reservationId,
  })
  if (status) return res.status(202).send()
  else return res.status(405).send('Already unreserved')
})

module.exports = router

// Router Layer -> Service Layer -> Data Acess Object Layer -> Model Layer
// \                                           /
//   -----------------------------------------
