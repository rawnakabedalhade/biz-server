import {
  getAllUsers,
  updateUser,
  deleteUser,
  patchIsBiz,
  getUserById,
} from "../model/dbAdapter.js";
import { getUserByEmail } from "../model/dbAdapter.js";
import handleError from "../utils/handleError.js";
import { generateHash, cmpHash } from "../utils/bcrypt.js";
import { createUser } from "../model/dbAdapter.js";
import { generateToken } from "../token/jwt.js";
import isLockoutExpired from "../utils/isLockOutExpired.js";
import updateUserFailedLoginInfo from "../utils/updateUserFailedLoginInfo.js";

const loginController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    console.log(userFromDB);
    if (!userFromDB) {
      throw new Error("invalid email or password");
    }
    let passwordHash = await cmpHash(req.body.password, userFromDB.password);
    if (!passwordHash) {
      // Increment failed login attempts count
      let endOfLockout = isLockoutExpired(userFromDB.lastFailedLoginTimestamp);
      userFromDB.failedLoginAttempts++;
      userFromDB = await updateUserFailedLoginInfo(userFromDB);

      // Check if the user should be locked out
      if (userFromDB.failedLoginAttempts === 3 && !endOfLockout) {
        throw new Error(
          "Your account is temporarily locked. Please try again later."
        );
      }

      throw new Error("Invalid email or password");
    }

    // Reset failed login attempts count upon successful login
    userFromDB.failedLoginAttempts = 0;
    let user = await updateUserFailedLoginInfo(userFromDB);
    console.log(user, "user");
    let token = await generateToken({
      _id: user._id,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
    });
    res.json(token);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const registerController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    if (userFromDB) {
      throw new Error("User already exists");
    }
    let passwordHash = await generateHash(req.body.password);
    req.body.password = passwordHash;
    let newUser = await createUser(req.body);
    newUser.failedLoginAttempts = 0; // Reset failed login attempts count
    await updateUser(newUser._id, newUser);
    newUser.password = undefined;
    res.send("register User");
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const getAllUsersController = async (req, res) => {
  try {
    let users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

const getUserByIdController = async (req, res) => {
  try {
    let user = await getUserById(req.params.id);
    user.password = undefined;
    res.json(user);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const updateUserController = async (req, res) => {
  try {
    let userFromDB = await updateUser(req.params.id, req.body);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const deleteUserController = async (req, res) => {
  try {
    let userFromDB = await deleteUser(req.params.id);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const patchIsBizController = async (req, res) => {
  try {
    let userFromDB = await patchIsBiz(req.params.id, req.body.isBusiness);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

export {
  loginController,
  registerController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
  patchIsBizController,
  getUserByIdController,
};
