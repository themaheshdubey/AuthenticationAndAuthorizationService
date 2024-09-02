const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user-controller');

router.post('/sign-up' , UserController.createUser);
router.delete('/user/:id' , UserController.deleteUser);
router.get('/user/:id' , UserController.getUser);
router.get('/user' , UserController.getAllUsers);
router.patch('/user/:id' , UserController.updateUser);
router.post('/sign-in' , UserController.signIn);


router.get('/auth/validate' , UserController.isAuthenticated);



module.exports = router;