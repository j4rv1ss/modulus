import {User} from "../models/User.js"
import jwt from "jsonwebtoken"
import tryCatch from "./tryCatch.js"

export const isAuthenticated = tryCatch(async (req,res,next)=>{
   
        const {token} = req.cookies;
      if(!token){
        return res.status(401).json({message:"please login first"})
      }
    
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    
      req.user = await User.findById(decoded._id)
      next()
})