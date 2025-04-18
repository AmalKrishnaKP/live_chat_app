import jwt from 'jsonwebtoken'

export const generateTocken=(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_KEY,{
        expiresIn:"7d"
    })

    res.cookie("jwt_token",token,{
        maxAge:7*12*60*60*1000,
        httponly:true,//prevent cross-site script attack XSS
        sameSite:true,//prevent cross-site request forgery attack CSRF
        secure:process.env.NODE_ENV!="development"
    })
    return token;

}