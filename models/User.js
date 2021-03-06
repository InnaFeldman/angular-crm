const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = model('users', userSchema);

// module.exports = mongoose.model('users', userSchema);