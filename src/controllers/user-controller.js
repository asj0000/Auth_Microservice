const UserService = require('../services/user-service');
const userServiceObj = new UserService();

const create = async( req, res  )=>{
    try{
      const response = await userServiceObj.create( {
        email: req.body.email,
        password: req.body.password
      })
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: response,
        err: {}
      })
      
    }catch( error ){ 
      console.log( "Error in controller layer ")
      return res.status(500).json({
        message : "something went wrong in controller layer",
        data: {},
        success: false,
        err: error.message
      }) 
      
    }
}

 
module.exports = {
  create,
}