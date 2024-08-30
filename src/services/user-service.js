const CrudService = require('./crud-service');
const UserRepository = require('../repository/user-repository');

class UserService extends CrudService {
    constructor() {
        const userRepositoryInstance = new UserRepository();
        super(userRepositoryInstance);
    }
}

module.exports = UserService;
