import express from "express";
import bodyValidationMiddleWare from "../../middlewares/bodyValidation.mw.js";
import cardsSchemaValidation from "../../validation/joi/cards/cards.js";
import {
  createCardController,
  deleteCardController,
  getAllCardsController,
  getAllMyCardsController,
  getCardByIdController,
  patchBizNumberController,
  patchLikeCardController,
  updateCardController,
} from "../../controllers/cards.controller.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import isBizMiddleware from "../../middlewares/isBiz.mw.js";
import adminOrOwn from "../../middlewares/adminOrOwn.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";
import adminOrBizMiddleware from "../../middlewares/adminOrBiz.mw.js";
import { patchBizCardValidation } from "../../validation/validationAdapter.js";

const router = express.Router();

// http://localhost:3030/api/cards
router.get("/", getAllCardsController);

router.get("/my-cards", authMiddleware, getAllMyCardsController);

router.get("/:id", objectIdParamsValidationMiddleware, getCardByIdController);

router.put(
  "/:id",
  authMiddleware,
  adminOrBizMiddleware,
  objectIdParamsValidationMiddleware,
  bodyValidationMiddleWare(cardsSchemaValidation),
  updateCardController
);

router.delete(
  "/:id",
  authMiddleware,
  adminOrBizMiddleware,
  objectIdParamsValidationMiddleware,
  deleteCardController
);

router.patch(
  "/biz-number/:id",
  authMiddleware,
  isAdminMiddleware,
  objectIdParamsValidationMiddleware,
  bodyValidationMiddleWare(patchBizCardValidation),
  patchBizNumberController
);

//like
router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  patchLikeCardController
);

router.post(
  "/",
  authMiddleware,
  isBizMiddleware,
  bodyValidationMiddleWare(cardsSchemaValidation),
  createCardController
);
export default router;
