const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const userRepository = new UserRepository();


class UserService {

    async signIn(email, password) {
        try {
            // Find the user by email
            const user = await userRepository.findByEmail(email);

            if (!user) {
                throw new Error('User not found');
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Invalid password');
            }

            // Generate a JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email, roleId: user.roleId },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return { token };
        } catch (error) {
            throw new Error(`SignIn error: ${error.message}`);
        }
    }



    async create(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
            const response = await userRepository.create(data);
            return response;
        } catch (error) {
            console.error("Error in UserService create method:", error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await userRepository.delete(id);
            return response;
        } catch (error) {
            console.error("Error in UserService delete method:", error.message);
            throw error;
        }
    }

    async get(id) {
        try {
            const response = await userRepository.get(id);
            return response;
        } catch (error) {
            console.error("Error in UserService get method:", error.message);
            throw error;
        }
    }

    async getAll(options = {}) {
        try {
            const response = await userRepository.getAll(options);
            return response;
        } catch (error) {
            console.error("Error in UserService getAll method:", error.message);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await userRepository.update(id, data);
            return response;
        } catch (error) {
            console.error("Error in UserService update method:", error.message);
            throw error;
        }
    }
}

module.exports = UserService;
