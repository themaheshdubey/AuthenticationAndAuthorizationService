const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/user-repository');
const userRepository = new UserRepository();
const JWT_KEY = process.env.JWT_KEY

class UserService {

    async signIn(email, plainPassword) {
        try {
            // step 1-> fetch the user using the email
            const user = await userRepository.findByEmail(email);

            // step 2-> compare incoming plain password with stores encrypted password
            const passwordsMatch = await this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }

            // step 3-> if passwords match then create a token and send it to the user
            const newJWT = await this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = await this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = await userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }


    async isAdmin(userId) {
        try {
            const role = await userRepository.getRoleName(userId);
            return role === 'admin';
        } catch (error) {
            console.error('Error in isAdmin:', error.message); 
            throw new Error('Failed to determine if user is an admin');   
        }
    }

    async createToken(user) {
        try {
            const result = await jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }


    async verifyToken(token) {
        try {
            const response = await jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }


    async checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return await bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
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
            const response = await userRepository.deleteUser(id);
            return response;
        } catch (error) {
            console.error("Error in UserService delete method:", error.message);
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
