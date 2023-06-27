import jwt from "jsonwebtoken"


export const auth = (req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({err: "Authorization failed"})
  }


  try {
   const token = authHeader.split(' ')[1]
   const payload = jwt.verify(token, process.env.JWT_SECRET);
   req.user = {userId: payload.userId}
    next();
  } catch (error) {
    next(error)
  }

 
}