const Router = require("express");
const router = new Router();
const userController = require("../controllers/user/index");
const validateBody = require("../middlewares/validateBody");
const { createUserSchema, updateUserSchema } = require("../scheme/userScheme");

router.post("/user", validateBody(createUserSchema), userController.createUser);
router.get("/user", userController.getUsers);
router.put("/user", validateBody(updateUserSchema), userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
