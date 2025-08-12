const UserRepository = require( '../repository/user-repository');
const  jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppError = require('../utils/error-handler');
const ValidationError  = require('../utils/validation-error');
const { StatusCodes } = require( 'http-status-codes');

class UserService {
    constructor(){
      this.UserRepository = new UserRepository();
    }

    async create( data ){
      try{
        const user = await this.UserRepository.createUser( data );
        return user;
      }catch( error ){
        if( error.name == "SequelizeValidationError"){
          throw error;
        }
        // we are sending this error if our error is of some other type , it is not validation error
        throw new AppError(
          "Server Error ", 
          "Something went wrong in service layer", 
          "Logical Issue found",
           500
        );
      }
    }

    async signIn( email , plainPassword){
      try {
        // step 1 -> fetch user by email
        const user = await this.UserRepository.getByEmail( email ); 
        // if (!user) {
        //   throw new AppError(
        //     "AppError",
        //     "No user exists for the given email",
        //     "Given Email Id does not exists",
        //      StatusCodes.NOT_FOUND
        //    );
        // }
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
        // console.log( "error in service layer ");
        throw error;
      }

    }

    async isAuthenticated( token ){
      try {
        const result = this.verifyToken( token ); // you will get { email: '', id: '' , iat: '' , exp: '' }
        if( !result ){
          throw { error : "Invalid Token "};
        }

        const user = await this.UserRepository.getById( result.id);
        if( !user ){
          throw { error : "User does not exist with the corresponding token" };
        }
        return user.id;
        
      } catch (error) {
        console.error("Error in authenticating user in service layer");
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

    isAdmin( userId ){
      try {
        return this.UserRepository.isAdmin( userId );
      } catch (error) {
        console.error("Error in service layer ");
        throw error; 
      }
    }
}

module.exports = UserService; 