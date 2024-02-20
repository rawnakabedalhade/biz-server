import {
  getAllCards,
  getCardById,
  getAllMyCards,
  createCard,
  updateCard,
  deleteCard,
  updateLikeCard,
} from "../model/dbAdapter.js";
import checkUniqBizNumber from "../utils/checkUniqBizNumber.js";
import handleError from "../utils/handleError.js";

const getAllCardsController = async (req, res) => {
  try {
    let cards = await getAllCards();
    res.json(cards);
  } catch (err) {
    console.log(err);
  }
};

const getAllMyCardsController = async (req, res) => {
  try {
    let mycards = await getAllMyCards(req.userData._id);
    return res.json(mycards);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const getCardByIdController = async (req, res) => {
  try {
    let card = await getCardById(req.params.id);
    res.json(card);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const createCardController = async (req, res) => {
  try {
    let userId = req.userData._id;
    req.body.user_id = userId;
    let newCard = await createCard(req.body);
    return res.json(newCard);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const updateCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (!cardFromDb) {
      throw new Error("Cant find card");
    }
    if (req.userData.idBusiness && req.userData.id !== user_id) {
      throw new Error(
        "You are not allowed to update this card ,you must be the owner of this card"
      );
    }
    let updatedCard = await updateCard(req.params.id, req.body);
    return res.json(updatedCard);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const deleteCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (
      !req.userData.isAdmin &&
      req.userData.isBusiness &&
      req.userData._id !== user_id
    ) {
      throw new Error(
        "You are not allowed to update this card, you must be the owner of the card or admin"
      );
    }
    const cardAfterDeleteFromDb = await deleteCard(req.params.id);
    return res.json(cardAfterDeleteFromDb);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const patchLikeCardController = async (req, res) => {
  try {
    let card = await getCardById(req.params.id);
    if (!card) {
      throw new Error("Cant find card");
    }
    let { likes } = card;
    if (likes.includes(req.userData._id)) {
      likes = card.likes.filter((id) => id !== req.userData._id);
    } else {
      likes.push(req.userData._id);
    }
    let updatedCard = await updateLikeCard(req.params.id, likes);
    return res.json(updatedCard);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const patchBizNumberController = async (req, res) => {
  try {
    let card = await getCardById(req.params.id);
    if (!card) {
      throw new Error("Cant find card");
    }
    let existingCardWithBizNumber = await checkUniqBizNumber(
      req.body.bizNumber
    );
    if (
      existingCardWithBizNumber &&
      existingCardWithBizNumber._id !== req.params.id
    ) {
      throw new Error("bizNumber must be unique");
    }
    card.bizNumber = req.body.bizNumber;
    let updatedCard = await updateCard(req.params.id, card);
    return res.json(updatedCard);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};
export {
  getAllCardsController,
  getCardByIdController,
  getAllMyCardsController,
  createCardController,
  updateCardController,
  deleteCardController,
  patchLikeCardController,
  patchBizNumberController,
};
