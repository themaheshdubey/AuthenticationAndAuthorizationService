const {User , Role} = require('../models/index');

class UserRepository {

    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async getRoleName(userId) {
        try {
            const user = await User.findByPk(userId, {
                include: [{
                    model: Role,
                    attributes: ['roleName'],
                    required: true
                }]
            });
            return user.Role.roleName;
        } catch (error) {
            console.error('Error fetching user by ID:', error.message);
            throw new Error('Error fetching user by ID');
        }
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

    async deleteUser(userId) {
        try {
            // Find the user by ID and delete
            const user = await User.findByPk(userId);
            if (!user) {
                return null; // User not found
            }
            await user.destroy();
            return user; 
        } catch (error) {
            console.error('Error in deleteUser:', error);
            throw error; 
        }
    };
    

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
