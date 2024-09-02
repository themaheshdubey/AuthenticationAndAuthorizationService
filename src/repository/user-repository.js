const {User} = require('../models/index');

class UserRepository {

    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }


    async getById(userId) {
        try {
            const user = await User.findByPk(userId , {
                attributes: ['email' , 'id']
            });
            return user;
        } catch (error) {
            console.log('Something wrong at repository layer');
            throw error;
        }
    }



    async create(data) {
        try {
            const result = await User.create(data);
            return result;
        } catch (error) {
            console.error("Error in UserRepository create method:", error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await User.destroy({ where: { id } });
            if (result === 0) {
                console.warn(`No record found to delete with id ${id}`);
            }
            return result > 0;
        } catch (error) {
            console.error("Error in UserRepository delete method:", error.message);
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await User.findByPk(id);
            if (!result) {
                console.warn(`No record found with id ${id}`);
            }
            return result;
        } catch (error) {
            console.error("Error in UserRepository get method:", error.message);
            throw error;
        }
    }

    async getAll(options = {}) {
        try {
            const result = await User.findAll(options);
            return result;
        } catch (error) {
            console.error("Error in UserRepository getAll method:", error.message);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const [updatedRowsCount, updatedRows] = await User.update(data, {
                where: { id },
                returning: true
            });
            if (updatedRowsCount === 0) {
                console.warn(`No record found to update with id ${id}`);
                return null;
            }
            return updatedRows;
        } catch (error) {
            console.error("Error in UserRepository update method:", error.message);
            throw error;
        }
    }
}

module.exports = UserRepository;
