const mongoose = require('mongoose')

const { MONGO_URI } = process.env

exports.dbConnect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(console.log('DB connection established'))
    .catch((err) => {
      console.log('DB connection error')
      console.log(err)
      process.exit(1)
    })
}
