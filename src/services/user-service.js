const UserRepository = require( '../repository/user-repository');
const  jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

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

    async signIn( email , plainPassword){
      try {
        // step 1 -> fetch user by email
        const user = await this.UserRepository.getByEmail( email ); 
        console.log( "User in service layer , ", user);
         console.log( "password in service layer , ", user.password);
       
         // step 2 -> compare the incoming password 
        const passwordMatches = this.checkPassword(plainPassword, user.password );
        if( !passwordMatches ){
          console.log("Password does not match");
          throw { error : "incorrect password" };
        }
        // step 3 -> create token if password matches
        const newToken = this.createToken( { email : user.email , id: user.id } );
        console.log( " New token created , ", newToken);
        return newToken

      } catch (error) {
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

    checkPassword( userInputPassword, encryptedPassword ){
      try {
        return bcrypt.compareSync(userInputPassword, encryptedPassword);
      } catch (error) {
        console.error("Error not same password");
        throw error; 
      }
    }
}

module.exports = UserService; 