import Joi from "joi";
const cardsSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().min(9).max(11).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(500)
    .required(),
  web: Joi.string().min(14),
  image: Joi.object().keys({
    url: Joi.string().uri({ scheme: ["http", "https"] }),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  address: Joi.object()
    .keys({
      state: Joi.string().min(2).max(256),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(2).max(256).required(),
      zip: Joi.number().min(10000).max(999999).required(),
    })
    .required(),
});

const cardsSchemaValidation = (cardInput) => {
  return cardsSchema.validateAsync(cardInput);
};

export default cardsSchemaValidation;
