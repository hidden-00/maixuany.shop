const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    gender:{type: String, enum: ['male', 'female', 'other']},
    email_verified: { type: Boolean, required: true, default: false },
    email_verification_code: { type: String },
    password_reset_code: { type: String },
    password_reset_request_date: { type: Date },
    cout_login_failed: { type: Number, default: 0 },
    last_login: { type: Date, default: ()=> Date.now()-24*60*60*1000 },
})

module.exports = User = mongoose.model('users', userSchema)