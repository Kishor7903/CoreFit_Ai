import mongoose from "mongoose";

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
});

export const User = mongoose.model("User", userSchema);