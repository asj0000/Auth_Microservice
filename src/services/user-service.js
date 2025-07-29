const UserRepository = require( '../repository/user-repository');
const  jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../config/serverConfig');

class UserService {
    constructor(){
      this.UserRepository = new UserRepository();
    }

    async create( data ){
      try{
        const user = await this.UserRepository.createUser( data );
        return user;
      }catch( error ){
        console.log( "error in service layer ");
        throw error;
      }
    }

    createToken( user ){
      try {
        const token = jwt.sign( 
          user, 
          JWT_SECRET_KEY, 
          {
            expiresIn: '1d'
          } 
        )
        return token; 
      } catch (error) {
        console.error("Error in creating token");
        throw error;
        
      }
      
    }

    verifyToken( token ){
      try {
        const result = jwt.verify( token , JWT_SECRET_KEY );
        return result;
      } catch (error) {
        console.error("Error in verifying token");
        throw error; 
      }

    }
}

module.exports = UserService; 