
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

const validateIsAdminRequest = ( req , res , next )=>{
  if( !req.body.id ){
    return res.status( 400 ).json({
      success: false,
      data:{},
      err: "User id not given ",
      message: "Something went wrong in request body"
    })
  }

  next();
}
module.exports = {
  validateAuthUser,
  validateIsAdminRequest
}
