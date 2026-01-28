const Joi = require("joi")

const validateCredentials = (data) => {
   const schema = Joi.object({
      username: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(6).required(),
   })

   return schema.validate(data)
}

module.exports = { validateCredentials }
