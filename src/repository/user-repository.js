const { User } = require( '../models/index');

class UserRepository {

    async createUser( data ){
      try{
        const user = await User.create( data );
        return user;
      }catch( error ){
        console.error("Error in creating user");
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

}

module.exports = UserRepository;
