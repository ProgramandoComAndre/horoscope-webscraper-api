const { formToJSON } = require('axios')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt:{
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    sign: {
        type: String,
        required: true,
        enum: ['carneiro', 'touro', 'gemeos', 'caranguejo', 'leao', 'virgem', 'balanca', 'escorpiao', 'sagitario', 'capricornio', 'aquario', 'peixes']
    }
})

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.salt
        delete ret.password
    }
})

module.exports = mongoose.model('User', userSchema)