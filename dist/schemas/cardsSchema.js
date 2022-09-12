import Joi from "joi";
var cardSchema = Joi.object({
    title: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    cvc: Joi.string().required(),
    expiration: Joi.date().required(),
    password: Joi.string().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid("crédito", "débito", "crédito/débito")
});
export default cardSchema;
