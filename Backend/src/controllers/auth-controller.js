import { User } from "../models/user-model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const authRegister = async (req, res) => {

    let { name, email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400)
            .json(
                new ApiError(400, "User Already Exists!!")
            )
        }
        
        let newUser = await User.create({
            name,
            email,
            password
        })


        return res.status(200)
        .json(
            new ApiResponse(200, "User Registered Successfully...", newUser)
        )

    } catch (e) {
        console.log(e.message);
        return res.status(401)
        .json(
            new ApiError(401, "User Registration Failed!!")
        )
    }
}

const authLogin = async (req, res) => {
    let {email, password } = req.body;

    try {
        let user = await User.findOne({ email});
    
        if(!user){
            return res.json(
                new ApiError(402, "User Not Found!!")
            )
        }
    
        let isPasswordCorrect = await bcrypt.compare(password, user.password)

    
        if(!isPasswordCorrect){
            return res.json(
                new ApiError(403, "Password is Incorrect!!")
            )
        }
        console.log("hiii");

    
        let token = jwt.sign(
            {
                email: email,
                name: user.name,
                id: user._id,
            },
            process.env.JWT_TOKEN_SECRET,
            {
                expiresIn: (process.env.JWT_TOKEN_EXPIRY)
            }
        )  

        const loggedInUser = await User.findById(user._id).select("-password -createdAt -updatedAt -_id -__v");
    
        return res
        .cookie("token", token, {httpOnly: true, secure: true})
        .status(200)
        .json(
            new ApiResponse(200, "User LoggedIn Successfully..", loggedInUser)
        )
    } catch (e) {
        console.log(e.message);
        return res.json(
            new ApiError(404, "Can't Login!!")
        )
    }
}

export { authRegister, authLogin };