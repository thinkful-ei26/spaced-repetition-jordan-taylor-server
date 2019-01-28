const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.set('toJSON', {
    virtuals: true, //includes built-in virtual id
    transfor: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    }
});


module.exports = mongoose.model('User', userSchema);