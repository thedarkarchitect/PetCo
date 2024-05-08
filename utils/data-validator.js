import Joi from "joi";

const userSchema = Joi.object({
	firstName: Joi.string().min(4).max(30).required(),
	lastName: Joi.string().min(4).max(30).required(),
	username: Joi.string().min(4).max(30).required(),
	password: Joi.string().min(4).max(8).required(),
	email: Joi.string().email().required(),
	role: Joi.string()
});

const validate = (schema) => {
	return (req, res, next) => {
		const result = schema.validate(req.body);
		if (result.error) {
			res.json(result.error);
		} else {
			next();
		}
	};
};

export { validate, userSchema };
