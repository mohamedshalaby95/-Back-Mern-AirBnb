const router = require('express').Router()
const admin = require('../config/firebase-auth-config')
const User = require('./user-model')

router.post('/auth/with-firebase', (req, res) => {
  const { token, name, email, profileImage } = req.body
  //console.log(token)
  admin
    .auth()
    .verifyIdToken(token)
    .then(async decodedToken => {
      const uid = decodedToken.uid
      const user = await User.findById(uid)

      if (user) {
        return res.status(200).end()
      }

      const newUser = await new User({
        _id: uid,
        name,
        email,
        profileImage,
      }).save()
      return res.status(201).end()
    })
    .catch(error => {
      console.error(error)
    })
})

module.exports = router
