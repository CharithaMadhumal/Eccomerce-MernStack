import userModel from "../models/user.model.js";

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
        
    } catch (error) {
        return reponse.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }

}