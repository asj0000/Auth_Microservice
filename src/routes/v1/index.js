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

router.get(
  '/isAuthenticated', 
  UserController.isAuthenticated
);

router.get(
  '/isAdmin',
  AuthRequestValidators.validateIsAdminRequest,
  UserController.isAdmin
);

module.exports = router;