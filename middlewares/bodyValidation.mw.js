import handleError from "../utils/handleError.js";

// const bodyValidationMiddleWare = async (req, res, next) => {
//   const body = req.body;
//   try {
//     let joiResult = await registerValidation(body);
//     next();
//   } catch (err) {
//     handleError(res, 400, err.message);
//   }
// };

const bodyValidationMiddleWare = (validateSchema) => async (req, res, next) => {
  const body = req.body;
  try {
    await validateSchema(body);
    next();
  } catch (err) {
    handleError(res, 400, err.message);
  }
};
export default bodyValidationMiddleWare;
