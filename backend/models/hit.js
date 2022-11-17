const mongoose = require('mongoose')



const hitSchema = new mongoose.Schema({
  company: String,
  position: String,
  contact: String,
  email: String,
  reachedOut: Boolean,
  interviewScheduled: Boolean,
  interviewFinished: Boolean,
  resume: String,
  jobDescription: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

hitSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Hit', hitSchema)