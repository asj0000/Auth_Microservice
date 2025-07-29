const express =  require('express');
const router = express.Router();
const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index');

router.post(
  '/signup', 
  AuthRequestValidators.validateAuthUser,
  UserController.create 
);
router.post(
  '/signIn', 
  AuthRequestValidators.validateAuthUser,
  UserController.signIn
);

module.exports = router;