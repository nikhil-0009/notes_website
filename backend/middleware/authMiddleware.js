import jwt from "jsonwebtoken"

const authMiddleware= async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization          //step-1
        // console.log(authHeader);

        if(!authHeader||!authHeader.startsWith("Bearer ")){                          // if step-1 fails
           return res.status(401).json({message:"No token, authorization denied"})
        }

        const token= authHeader.split(" ")[1]                           //step-2
        // console.log(token);

        const decoded=jwt.verify(token,process.env.JWT_SECRET)              //step-3
        // console.log(decoded);

        req.User=decoded.id

        return next()


    } catch (error) {
        console.log("Auth error:", error);
         return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default authMiddleware