import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
// how our document look like
const loginSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    }
});



loginSchema.methods.matchPassword = async function (password) {
    if (password === this.password)
        return true
    else return false
};

loginSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, 'special_secret');
};



const loginUser = mongoose.model('login', loginSchema);

export default loginUser;