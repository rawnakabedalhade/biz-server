import connectToMongo from "./mongodb/dbConnect.js";
import { createUser as createUserMongo } from "./mongodb/users/userService.js";
import { createCard as createCardMongo } from "./mongodb/cards/cardService.js";
import { getAllUsers as getAllUsersMongo } from "./mongodb/users/userService.js";
import { getUserById as getUserByIdMongo } from "./mongodb/users/userService.js";
import { getUserByEmail as getUserByEmailMongo } from "./mongodb/users/userService.js";
import { updateUser as updateUserMongo } from "./mongodb/users/userService.js";
import { deleteUser as deleteUserMongo } from "./mongodb/users/userService.js";
import { getAllCards as getAllCardsMongo } from "./mongodb/cards/cardService.js";
import { getCardById as getCardByIdMongo } from "./mongodb/cards/cardService.js";
import { updateCard as updateCardMongo } from "./mongodb/cards/cardService.js";
import { deleteCard as deleteCardMongo } from "./mongodb/cards/cardService.js";
import { getCardByBizNumber as getCardByBizNumberMongo } from "./mongodb/cards/cardService.js";
import { patchIsBiz as patchIsBizMongo } from "./mongodb/users/userService.js";
import { getAllMyCards as getAllMyCardsMongo } from "./mongodb/cards/cardService.js";
import { updateLikeCard as updateLikeCardMongo } from "./mongodb/cards/cardService.js";
import normalizeUser from "../normalize/user.normalize.js";
import normalizeCard from "../normalize/cards.normalize.js";
import checkIdSchemaValidation from "../validation/joi/checkId.js";
const DB = "mongo";

const connectToDb = () => {
  if (DB === "mongo") {
    return connectToMongo();
  }
};

const createUser = (user) => {
  user = normalizeUser(user);
  if (DB === "mongo") {
    return createUserMongo(user);
  }
};

const getAllUsers = () => {
  if (DB === "mongo") {
    return getAllUsersMongo();
  }
};

const getUserById = (id) => {
  if (DB === "mongo") {
    return getUserByIdMongo(id);
  }
};

const getUserByEmail = (email) => {
  if (DB === "mongo") {
    return getUserByEmailMongo(email);
  }
};

const updateUser = (id, user) => {
  user = normalizeUser(user);
  if (DB === "mongo") {
    return updateUserMongo(id, user);
  }
};

const deleteUser = (id) => {
  if (DB === "mongo") {
    return deleteUserMongo(id);
  }
};
const patchIsBiz = (id, isBusiness) => {
  if (DB === "mongo") {
    return patchIsBizMongo(id, isBusiness);
  }
};

const createCard = async (card) => {
  card = await normalizeCard(card);
  if (DB === "mongo") {
    return createCardMongo(card);
  }
};

const getAllCards = () => {
  if (DB === "mongo") {
    return getAllMyCardsMongo();
  }
};

const getAllMyCards = (user_id) => {
  if (DB === "mongo") {
    return getAllCardsMongo(user_id);
  }
};

const getCardById = (id) => {
  if (DB === "mongo") {
    return getCardByIdMongo(id);
  }
};
const getCardByBizNumber = (bizNumber) => {
  if (DB === "mongo") {
    return getCardByBizNumberMongo(bizNumber);
  }
};
const updateCard = async (id, card) => {
  card = await normalizeCard(card);
  if (DB === "mongo") {
    return updateCardMongo(id, card);
  }
};

const updateLikeCard = (id, likes) => {
  if (DB === "mongo") {
    return updateLikeCardMongo(id, likes);
  }
};

const deleteCard = (id) => {
  if (DB === "mongo") {
    return deleteCardMongo(id);
  }
};

export default connectToDb;
export {
  createUser,
  createCard,
  updateUser,
  deleteUser,
  getAllUsers,
  patchIsBiz,
  getUserById,
  updateCard,
  deleteCard,
  getAllCards,
  getCardById,
  getUserByEmail,
  getCardByBizNumber,
  getAllMyCards,
  updateLikeCard,
};
