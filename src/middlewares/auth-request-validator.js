const validateAuthUser  = ( req , res , next )=>{
  if( !req.body.email || !req.body.password){
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong in request body ",
      err: "Email or password is missing"
    })

  }
  next();
}
module.exports = {
  validateAuthUser
}
