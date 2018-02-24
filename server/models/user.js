const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

// 1. Define the model
const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String
});

// 2. Create the model class
const ModelClass = mongoose.model('user', userSchema);

// 3. Export the model so others can see it
module.exports = ModelClass;
