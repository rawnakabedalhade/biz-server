import cardsSchemaValidation from "./joi/cards/cards.js";
import editUserSchemaValidation from "./joi/users/editUser.js";
import loginSchemaValidation from "./joi/users/login.js";
import registerSchemaValidation from "./joi/users/register.js";
import patchSchemaValidation from "./joi/users/patchUser.js";
import checkIdSchemaValidation from "./joi/checkId.js";
import bizNumberCardValidationSchema from "./joi/cards/bizNumber.js";

const VALIDATION = "joi";

const loginValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return loginSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const registerValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return registerSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const editUserValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return editUserSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const patchUserValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return patchSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const cardValidation = (cardInput) => {
  if (VALIDATION === "joi") {
    return cardsSchemaValidation(cardInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};
const creareCardValidation = (cardInput) => {
  if (VALIDATION === "joi") {
    return cardsSchemaValidation(cardInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const ObjectIdValidation = (id) => {
  if (VALIDATION === "joi") {
    return checkIdSchemaValidation(id);
  } else {
    throw new Error(`Validation id ${VALIDATION} is not supported`);
  }
};

const patchBizCardValidation = (cardInput) => {
  if (VALIDATION === "joi") {
    return bizNumberCardValidationSchema(cardInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

export {
  registerValidation,
  loginValidation,
  cardValidation,
  editUserValidation,
  patchUserValidation,
  ObjectIdValidation,
  creareCardValidation,
  patchBizCardValidation,
};
