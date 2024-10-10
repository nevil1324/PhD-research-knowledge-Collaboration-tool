const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: false
    },
    emailId: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true 
    }
})

userSchema.pre("save", function (next) {
    const user = this
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
  })
module.exports = mongoose.model('user',userSchema);