const Joi = require("@hapi/joi");

const signupValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

const signinValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

module.exports.signupValidation = signupValidation;
module.exports.signinValidation = signinValidation;
