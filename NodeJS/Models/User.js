var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// User Schema
var userSchema = mongoose.Schema({
  username: {
    type: String,
    index:true // Index ensures property is unique in db.
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
      type: String
  },
  phone: {
    type: String
  },
  streetAddress:{
    type: String
  },
  payroll:{
    type:Number,
    min:0
  },
  roles:{
    type:Array
  }

});
userSchema.plugin(passportLocalMongoose);
var User = module.exports = mongoose.model('User', userSchema);
module.exports = User;
