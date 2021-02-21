const fs = require('fs').promises


class ReservationService {
  constructor({ Reservation,user }) {
    this.Reservation = Reservation;
    this.user=user;
  }
  async getReservations({ body}) {
    
   
    
const reservations = await this.Reservation.find({
      location: new RegExp(body.location.trim(), 'ig'),
     
      ...(body.startdate && { indate: body.startdate }),
      ...(body.enddata && { endDate: body.enddata }),
      ...(body.nOfGuests && { nOfGuests: body.nOfGuests }),
      ...(body.type && { type: body.type }),
    })
    return reservations
  }

  //mohamed

  async gettypeReservations({ body }) {
    const reservations = await this.Reservation.find({
      type:body.type
      //  new RegExp(body.type, 'ig'),
     
    })

    return reservations
  }

  async createhosting({ body, image, userId }) {
    const { name, location, nOfGuests, type, price, description,indate,endDate} = body
    let imageData = await fs.readFile(image.path)
    
    let base64 = imageData.toString('base64')
    console.log(base64)
    let imageBuffer = Buffer.from(base64, 'base64')
    

    const hosting = await new this.Reservation({
      name,
      location,
      nOfGuests,
      type,
      price,
      indate,
      endDate,
      description,
      owner: userId,
      image: imageBuffer,
      imageContentType: image.mimetype,
    }).save()

    await fs.unlink(`${process.cwd()}/uploads/${image.filename}`, err =>
      err ? console.error(err) : null,
    )

    return {
      ...hosting._doc,
      image: undefined,
      imageContentType: undefined,
      owner: undefined,
    }
  }

  async gethostings({ userId }) {
    const hostings = await this.Reservation.find({ owner: userId });
   
    
    
   
    return(hostings) 
  }
  async getuser({ userId }) {
   
    const user=await this.user.findById( userId );
   
    return (user )
  }

  async getReservationDetails({ reservationId, originalUrl }) {
    const reservation = await this.Reservation.findById(reservationId)

    return { ...reservation._doc, image: originalUrl + '/image' }
  }

  async getReservationImage({ reservationId }) {
    const reservation = await this.Reservation.findById(reservationId).select(
      'image imageContentType',
    )
    return {
      buffer: reservation.image,
      contentType: reservation.imageContentType || 'image/png',
    }
  }

  async reserve({ reservationId }) {
    const reservation = await this.Reservation.findById(reservationId)
    if (reservation.isReserved) return false

    reservation.isReserved = true
    await reservation.save()
    return true
  }

  async unreserve({ reservationId }) {
    const reservation = await this.Reservation.findById(reservationId)
    if (!reservation.isReserved) return false

    reservation.isReserved = false
    await reservation.save()
    return true
  }
}

module.exports = ReservationService
