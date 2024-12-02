import sendEmail from "../config/sendEmail.js";
import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import  verifyEmailTemplate  from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
import generatedOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

export async function registerUserController(request,reponse){
    try {
        const {name,email,password} = request.body

        if(!name || !email || !password){
            return reponse.status(400).json({
                message : "Please provide email, name, password",
                error : true,
                success : false
            })
        }

        const user = await userModel.findOne({email})

        if(user){
            return Response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const playload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new userModel(playload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from binkeyit",
            html : verifyEmailTemplate({
                name,
                url : VerifyEmailUrl
            })
        })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })
        
    } catch (error) {
        return reponse.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }

}

export async function verifyEmailController(request,response){
    try {
        const {code} = request.body
        const user = await userModel.findOne({_id : code})

        if(!user){
            return response.status(400).json({
                message : "Invalid code",
                error : true,
                success : false
        })
        }

        const updateUser = await userModel.updateOne({_id : code},{
            verify_email : true
        })

        return response.json({
            message : "Verify email done",
            success : true,
            error : false
            
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : true
        })
        
    }
}

//login controller

export async function loginController(request,response){
    try {
        const {email,password} = request.body

        if(!email || !password){
            return response.status(400).json({
                message : "Please provide email and password",
                error : true,
                success : false
            })
        }

        const user =  await userModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message : "User not register",
                error : true,
                success : false
            })
        }

       if(user.status !== "Active"){
        return response.status(400).json({
            message : "Contact to Admin",
            error : true,
            success : false
        })
       }
        
       const checkPassword = await bcryptjs.compare(password,user.password)

       if(!checkPassword){
        return response.status(400).json({
            message : "Check your password",
            error : true,
            success : false
        })
       }

       const accesstoken = await generatedAccessToken(user._id)
       const refreshToken = await generatedRefreshToken(user._id)

       const cookiesOption = {
        httpOnly : true,
        secure : true,
        sameSite : "none"
       }

       response.cookie('accessToken',accesstoken,cookiesOption)
       response.cookie('refreshToke',refreshToken,cookiesOption)

       return response.json({
        message : "Login Successfully",
        error : false,
        success : true,
        data : {
            accesstoken,
            refreshToken
        }
       })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

//logout controller

export async function logoutController(request,response){
    try {

        const userId = request.userId

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "none"
           }

        response.clearCookie('accessToken',cookiesOption)
        response.clearCookie('refreshToken',cookiesOption)

        const removeRefreshToken = await userModel.findByIdAndUpdate(userId,{
            refreshToken : ""
        })

        return response.json({
            message : "Logout successfully",
            error : false,
            success : true
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

//upload user avatar

export async function uploadAvatar(request,response){
    try {

        
        const userId = request.userId

        const image = request.file 
        const upload = await uploadImageClodinary(image)

      const updateUser = await userModel.findByIdAndUpdate(userId,{
        avatar : upload.url
      })
        

        return response.json({
            message : "upload profile",
            data : {
                _id : userId,
                avatar : upload.url
            }
        })
        
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

//update user details

export async function updateUserDetails(request,response){
    try {
        const userId = request.userId //auth middleware
        const {name, email, mobile, password} = request.body

        let hashPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)
        }

        const updateUser = await userModel.updateOne({ _id : userId},{
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(mobile && {mobile : mobile}),
            ...(password && {password : hashPassword})
        })

        return response.json({
            message : "updated user successfully",
            error : false,
            success : true,
            data : updateUser
        })
    } catch (error) {
        
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//forgot password

export async function forgotPasswordController(request,response){
    try {

        const {email} = request.body

        const user = await userModel.findOne({email})

        if(!user){
            return response.status(400).json({
                message : "Email not available",
                error : true,
                success : false
            })
        }

        const otp = generatedOtp()
        const expireTime = new Date() + 60*60*1000 //1hr

        const update = await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo : email,
            subject : "Forgot password from Binkeyit",
            html : forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return response.json({
            message : "check your email",
            error : false,
            success : true
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

export async function verifyForgotPasswordOtp(request,response){
    try {
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

