const express = require("express");
const {
  getUser,
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userControllers");
// import {
//   getUser,
//   addUser,
//   editUser,
//   deleteUser,
//   getAllUsers,
// } from "../controllers/userControllers";

const apiRouter = express.Router();

apiRouter.get("/users/:id", getUser);//done

apiRouter.get("/users", getAllUsers);//done

// todo: adding users
apiRouter.post("/users", addUser);//done

// todo: editing user data
apiRouter.put("/users/:id", editUser);

// todo: delete user
apiRouter.delete("/users/:id", deleteUser);

// export default apiRouter;
module.exports = apiRouter;
