const express = require("express");
const router = express.Router();
const usersController = require("../../controller/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.Admin),
    usersController.getAllUsers
  )
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router
  .route("/:id")
  .get(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),
    usersController.getUser
  );

router
  .route("/:eid")
  .put(
    verifyRoles(
      ROLES_LIST.Admin,
      ROLES_LIST.User
    ),
    usersController.updateUser
  );

module.exports = router;
