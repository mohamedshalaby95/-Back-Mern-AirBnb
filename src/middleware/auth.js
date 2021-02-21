const admin = require('../config/firebase-auth-config')

exports.isAuth = function (req, res, next) {
  const token = req.headers['x-auth-token']
  admin
    .auth()
    .verifyIdToken(token)
    .then(async decodedToken => {
      const uid = decodedToken.uid
      req.userId = uid
      next()
    })
    .catch(error => {
      return res.status(401).send()
    })
}
