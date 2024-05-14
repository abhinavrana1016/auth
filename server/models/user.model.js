const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    userName:{type:String,require:true},
    mobileno:{type:Number,require:true},

},{
    timestamps:true
})

module.exports = mongoose.model('user', userSchema);