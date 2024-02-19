import Card from "./Card.js";

//create
const createCard = (cardData) => {
  let card = new Card(cardData);
  return card.save();
};

//read
const getAllCards = () => {
  return Card.find();
};

const getAllMyCards = (user_id) => {
  return Card.findById({ user_id: user_id });
};
//read
const getCardById = (id) => {
  return Card.findById(id);
};
const getCardByBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber });
};

//update
const updateCard = (id, cardData) => {
  return Card.findByIdAndUpdate(id, cardData, { new: true });
};

//delete
const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};

const updateLikeCard = (id, likes) => {
  return Card.findByIdAndUpdate(id, { likes }, { new: true });
};
export {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
  getCardByBizNumber,
  getAllMyCards,
  updateLikeCard,
};
