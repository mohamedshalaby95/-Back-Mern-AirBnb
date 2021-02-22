const mongoose = require('mongoose')

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    mongoose
      .connect(process.env.PROD_DB, {
      
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.info('Connected to MongoDB...'))
      .catch(err => console.error("Couldn't connect to MongoDB... ", err))
  } else {
    mongoose
      .connect(process.env.DEV_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.info('Connected to MongoDB...'))
      .catch(err => console.error("Couldn't connect to MongoDB... ", err))
  }
}
