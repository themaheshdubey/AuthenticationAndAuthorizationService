const UserService = require('../services/user-service');
const userService = new UserService();

const getUser = async(req , res) => {
    try {
        const user = await userService.getById(req.params.id);
        return res.status(201).json({
            data: user,
            success: true,
            message: 'Successfully feteched a user',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Cannot fetch user details',
            err: err.message
        })
    }
}

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

        console.log(req.params.id);

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
        const requesterUserId = await userService.isAuthenticated(token);

        // If token is invalid, respond with 401 Unauthorized
        if (!requesterUserId) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const userIdToDelete = req.params.id;

        // Ensure both IDs are of the same type for accurate comparison
        if (String(requesterUserId) !== String(userIdToDelete)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this user'
            });
        }

        const response = await userService.delete(userIdToDelete);
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
            message: 'Successfully deleted the user',
            err: {}
        });
    } catch (error) {
        console.error('Error in deleteUser:', error.message);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to delete the user',
            err: error.message
        });
    }
};


const updateUser = async (req, res) => {
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
        const requesterUserId = await userService.isAuthenticated(token);

        // If token is invalid, respond with 401 Unauthorized
        if (!requesterUserId) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const userIdToEdit = req.params.id;

        // Ensure both IDs are of the same type for accurate comparison
        if (String(requesterUserId) !== String(userIdToEdit)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to edit this user'
            });
        }

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
        // Log full error details for debugging purposes
        console.error('Error in updateUser:', error);

        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to update the user',
            err: error.message || 'Internal server error'
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
                err: {message: 'Token is missing'},
                message: 'Token is required'
            });
        }

        // Call the service to validate the token
        const response = await userService.isAuthenticated(token);
        if(!response) {
            return res.status(401).json({
                success: false,
                err: { message: 'Invalid token or user not registered' },
                data: response,
                message: 'User is not authenticated'
            });
        }

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
            err: { message: error.message },
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

        // If token is invalid, respond with 401 Unauthorized
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Check if the user is an admin
        const isAdmin = await userService.isAdmin(userId);

        // If the user is not an admin, respond with 403 Forbidden
        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'User is not an admin'
            });
        }

        // If the user is an admin, respond with success
        return res.status(200).json({
            success: true,
            message: 'User is an admin'
        });

    } catch (error) {
        // Log error details (optional, for debugging purposes)
        console.error('Error in isAdmin:', error);

        // Handle general server errors
        return res.status(500).json({
            success: false,
            message: 'An error occurred while checking admin status',
            err: error.message
        });
    }
};



  

module.exports = {
    getUser,
    createUser,
    deleteUser,
    updateUser,
    signIn,
    isAuthenticated,
    isAdmin
};
