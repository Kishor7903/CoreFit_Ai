import { loggedIn } from "../config/session-config.js";
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
            return res
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
        return res
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
    
        let token = jwt.sign(
            {
                email: email,
                name: user.name,
                _id: user._id,
            },
            process.env.JWT_TOKEN_SECRET,
            {
                expiresIn: (process.env.JWT_TOKEN_EXPIRY)
            }
        )  

        loggedIn();

        const loggedInUser = await User.findById(user._id).select("-password -createdAt -updatedAt -__v");
    
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

const authLogout = async (_, res)=>{
    return res.status(200)
    .clearCookie("token", { httpOnly: true, secure: true})
    .json(
        new ApiResponse(200, "User Logged Out..")
    )
}

const checkUser = async (req, res) => {
    const user = req.user;
    return res.status(201)
    .json( 
        new ApiResponse(201, "User is Authenticated..", user)
    )
}

const authUpdate = async (req, res) => {
    let { height, weight, BMI, gender } = req.body;
    const { id } = req.params;

    try {
        let user = await User.findById(id);

        if(!user){
            return res.json(
                new ApiError(406, "User Not Found!!")
            )
        }

        user.height = height;
        user.weight = weight;
        user.BMI = BMI;
        user.gender = gender;

        await user.save({validateBeforeSave: false});

        const updatedUser = await User.findById(user._id).select("-password -createdAt -updatedAt -__v");


        return res.status(200).json(
            new ApiResponse(200, "User Details Updated Successfully..", user)
        )
        
    } catch (e) {
        console.log(e.message);
        return res.json(
            new ApiError(405, "Can't Update User Details!!")
        )
    }
}

export { authRegister, authLogin, authUpdate, authLogout, checkUser };