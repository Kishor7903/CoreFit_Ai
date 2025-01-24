import { checkSessionExpiry } from "../config/session-config.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"


const checkAuth = async (req, res, next) => {
    const token = req?.cookies?.token ;

    if(!token){
        res
        .json(
            new ApiError(401, "Unauthorized User!!")
        )
    }

    try {
        if(checkSessionExpiry()){
            return res
            .clearCookie("token", { httpOnly: true, secure: true})
            .json(
                new ApiError(402, "Session Expired!!")
            )
        }
        else{
            const decodedUser =  jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = decodedUser;
            next();
        }
    } catch (e) {
        new ApiError(400, "User Authentication Failed!!");
    }
}

export {checkAuth}