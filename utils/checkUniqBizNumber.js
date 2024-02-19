import Card from "../model/mongodb/cards/Card.js";
const checkUniqBizNumber = async (bizNumber) => {
  let samebizNumber = await Card.findOne({ bizNumber });
  return samebizNumber;
};
export default checkUniqBizNumber;
