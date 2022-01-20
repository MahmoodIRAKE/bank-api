const express = require("express");
const {
  getUser,
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  updateExistUser,
} = require("../controllers/userControllers");
const userRouter = require("./userRoutes");
// import {
//   getUser,
//   addUser,
//   editUser,
//   deleteUser,
//   getAllUsers,
// } from "../controllers/userControllers";
// rmeove commnets



const apiRouter = express.Router();

apiRouter.get("/users/:id", getUser);//done

apiRouter.get("/users", getAllUsers);//done

// todo: adding users
apiRouter.post("/users", addUser);//done

// todo: editing user data
// apiRouter.put("/users/:id", editUser);
apiRouter.put("/users/:id", updateExistUser);

// todo: delete user
apiRouter.delete("/users/:id", deleteUser);

apiRouter.use("/users", userRouter);
// you can use a userRouter here and remove all the /users something like apiRouter.use(/users, usersRouter);

// export default apiRouter;
module.exports = apiRouter;
