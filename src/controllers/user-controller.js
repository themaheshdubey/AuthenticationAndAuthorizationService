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

module.exports = {
    createUser,
    deleteUser,
    getUser,
    updateUser,
    getAllUsers
};
