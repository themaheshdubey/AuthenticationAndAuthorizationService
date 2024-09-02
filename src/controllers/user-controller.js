const UserService = require('../services/user-service');
const userService = new UserService();

const createUser = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        return res.status(201).json({
            data: user,
            success: true,
            message: 'Successfully created a user',
            err: {}
        });
    } catch (error) {
        console.error('Error in createUser:', error.message);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to create a user',
            err: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const response = await userService.delete(req.params.id);
        if (!response) {
            return res.status(404).json({
                data: {},
                success: false,
                message: 'User not found',
                err: {}
            });
        }
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully deleted a user',
            err: {}
        });
    } catch (error) {
        console.error('Error in deleteUser:', error.message);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to delete a user',
            err: error.message
        });
    }
};

const getUser = async (req, res) => {
    try {
        const response = await userService.get(req.params.id);
        if (!response) {
            return res.status(404).json({
                data: {},
                success: false,
                message: 'User not found',
                err: {}
            });
        }
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched a user',
            err: {}
        });
    } catch (error) {
        console.error('Error in getUser:', error.message);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to fetch a user',
            err: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const response = await userService.update(req.params.id, req.body);
        if (!response) {
            return res.status(404).json({
                data: {},
                success: false,
                message: 'User not found',
                err: {}
            });
        }
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully updated a user',
            err: {}
        });
    } catch (error) {
        console.error('Error in updateUser:', error.message);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to update a user',
            err: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const response = await userService.getAll();
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched all users',
            err: {}
        });
    } catch (error) {
        console.error('Error in getAllUsers:', error.message);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to fetch all users',
            err: error.message
        });
    }
};


const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({
              success: false,
              err: 'Email or password missing in the request',
              data: {},
              message: 'Email or password missing'
          });
      }

      const token = await userService.signIn(email, password);
      return res.status(200).json({
        data: { token },
        success: true,
        message: 'Successfully signed in',
        err: {}
      });

    } catch (error) {
      console.error('Error in signIn:', error.message);
      return res.status(401).json({
        data: {},
        success: false,
        message: 'Authentication failed',
        err: error.message
      });
    }
};


const isAuthenticated = async (req, res) => {
    try {
        // Retrieve token from 'x-access-token' header
        const token = req.headers['x-access-token'];

        // Check if token is provided
        if (!token) {
            return res.status(400).json({
                success: false,
                err: {},
                message: 'Token is required'
            });
        }

        // Call the service to validate the token
        const response = await userService.isAuthenticated(token);

        // If the token is valid, respond with success
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'User is authenticated and token is valid'
        });
    } catch (error) {
        // Handle errors and respond with a 500 status
        return res.status(500).json({
            success: false,
            err: error,
            message: 'Something went wrong'
        });
    }
};


const isAdmin = async (req, res) => {
    try {
        // Retrieve the token from headers
        const token = req.headers['x-access-token'];

        // Check if token is provided
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            });
        }

        // Authenticate the user and get user ID
        const userId = await userService.isAuthenticated(token);

        // Check if the user is an admin
        const isAdmin = await userService.isAdmin(userId);


        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'User is not an admin'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User is an admin'
        });

    } catch (error) {

        if (error.message === 'User is not an admin') {
            return res.status(403).json({
                success: false,
                message: 'User is not an admin'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};

  

module.exports = {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getAllUsers,
    signIn,
    isAuthenticated,
    isAdmin
};
