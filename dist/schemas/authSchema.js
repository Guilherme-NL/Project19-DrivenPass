import Joi from "joi";
var userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
});
export default userSchema;
