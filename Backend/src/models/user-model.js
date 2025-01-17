import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
}, { timestamps: true });

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)

    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);