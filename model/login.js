import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
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

loginSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

loginSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

loginSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, 'special_secret');
};



const loginUser = mongoose.model('login', loginSchema);

export default loginUser;