const UserService = require('../services/user-service');
const userServiceObj = new UserService();
const { StatusCodes } = require( 'http-status-codes');


const create = async( req, res, next  )=>{
    try{
      const response = await userServiceObj.create( {
        email: req.body.email,
        password: req.body.password
      })
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User created successfully",
        data: response,
        err: {}
      })
      
    }catch( error ){ 
      console.log( "Error in controller layer ")
      return res.status( error.statusCode).json({
        message : error.message,
        data: {},
        success: false,
        err: error.explanation
      }) 

    }
}

const signIn = async( req, res)=>{
    try {
      const response = await userServiceObj.signIn( req.body.email, req.body.password);
      console.log("Response in controller , " , response);
      return res.status( StatusCodes.OK ).json({
        success: true,
        message: "Successfully signed in",
        data: response,
        err: {}
      })    
    } catch (error) {
      console.log( "Error in controller layer ", error)
      return res.status(500).json({
        message : error.message,
        data: {},
        success: false,
        err: error.explanation
      }) 
    }
}

const isAuthenticated = async( req  , res )=>{
    try {
      const incomingToken = req.headers['x-access-token'];
      const response = await userServiceObj.isAuthenticated( incomingToken);
      return res.status( StatusCodes.OK ).json({
        success: true,
        message: "user is authenticated",
        data: response,
        err: {}
      })
      
    } catch (error) {
        console.log( "Error in controller layer ")
        return res.status(500).json({
          message : "something went wrong in controller layer",
          data: {},
          success: false,
          err: error.message
        }) 
    }
}

const isAdmin = async( req , res )=>{
    try {
      const response = await userServiceObj.isAdmin( req.body.id);
      return res.status( 200 ).json({
        success: true,
        message: "Successfully fetched whether User is Admin",
        data: response,
        err: {}
      })
    } catch (error) {
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
  signIn,
  isAuthenticated,
  isAdmin
}