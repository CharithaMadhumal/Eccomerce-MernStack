import jwt from "jsonwebtoken";

const auth = async(request,reponse,next)=>{

    try {

        const token = request.cookies.accessToken || request?.header?.authorization?.split(" ")[1]
        
        if(!token){
            return reponse.status(401).json({
                message : "Provide token"
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)

        if(!decode){
            return reponse.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }

        request.userId = decode.id

        next()

    } catch (error) {
        return reponse.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
        
    }
}

export default auth