const ValidationError = require('../utils/validation-error');
const { User } = require( '../models/index');
const { Role } = require( '../models/index');

class UserRepository {

    async createUser( data ){
      try{
        const user = await User.create( data );
        return user;
      }catch( error ){
        if( error.name === "SequelizeValidationError"){
          throw new ValidationError(error);
        }
        console.log("Error" , error);
        throw error ;
      }
    }

    async destroyUser( id ){
      try{
        await User.destroyUser( 
          {
            where: {
              id: id,
            } 
         });
        return true;
      }catch( error ){
        console.error("Error in creating user");
        throw error ;
      }

    }

    async getById( id ){
      try {
        const user = await User.findByPk( id ,{
          attributes: ['email', 'id'] 
        } );
        return user;
      } catch (error) {
        console.error("Error in creating user");
        throw error ;
      }
    }

    async getByEmail( userEmail ){
      try {
        const user = await User.findOne({
          where: {
            email: userEmail
          }
        }
       );
       console.log("data returned from DB in repo layer in findOne function ", user);
       return user;
      } catch (error) {
        console.error("Error in fetching user by email ", error);
        throw error ;
      }
    }

    async isAdmin( userId ){
      try{
        console.log("User id in repo layer ", userId);
        const user = await User.findByPk( userId );
        console.log("User in repo layer ", user);
        const adminRole = await Role.findOne({
          where: {
            name: 'ADMIN'
          }
        })
        return  user.hasRole( adminRole); 

      }catch( error ){
        console.error("Error in repo layer checking if user is admin");
        throw error ;
      }
    }

}

module.exports = UserRepository;
