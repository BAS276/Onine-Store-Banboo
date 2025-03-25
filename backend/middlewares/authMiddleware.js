module.exports = (req , res , next)=>{
    var token=req.header('Authorization')
    if(!token) return res.status(401).json({error:"Acces refuse"})
        try{
            token=token.split(" ")[1]
           const verified=JsonWebTokenError.verify(token , process.env.JWT_SECRET)
           req.user = verified
           next()
        }
        catch(err){
            res.status(400).json({error:"Token invalide"})
        }
}