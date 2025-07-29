const UserRepository = require( '../repository/user-repository');

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
}

module.exports = UserService;