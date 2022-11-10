const mongoose = require('mongoose')



const hitSchema = new mongoose.Schema({
  company: String,
  position: String,
  contact: String,
  email: String,
  reachedOut: Boolean,
  interviewScheduled: Boolean,
  interviewFinished: Boolean,
})

hitSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Hit', hitSchema)