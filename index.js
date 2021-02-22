const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv/config')
require('./config/mongodb-config')()

const user = require('./src/user/user-routes')
const reservation = require('./src/reservation/reservation-routes')

const app = express()
app.use(bodyParser.json())
app.use(helmet())
app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }),
)


app.use('/user', user)
app.use('/reservation', reservation)



const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.info(`Listening on PORT ${PORT}`))


