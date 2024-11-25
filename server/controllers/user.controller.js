import sendEmail from "../config/sendEmail.js";
import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import  verifyEmailTemplate  from "../utils/verifyEmailTemplate.js";

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