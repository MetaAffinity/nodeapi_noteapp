import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode=200) => {
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

    res.status(statusCode)
    .cookie("token",token,{
        httponly: true,
        maxAge: 15*60*1000,

        // in case of cors, if backend and frontend are on different domains,
        // then we need to set the sameSite property to none
        // to allow cookies to be sent from frontend to backend
        //sameSite:"none",
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure:process.env.NODE_ENV === "Development" ? false : true,
        //add this in logout controller
        //secure:true,
    }).json({
        success:true,
        message,
    })


}