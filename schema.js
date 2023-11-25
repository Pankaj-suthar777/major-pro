//server side validation ( sumiting through hoppscoth)


const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    title : Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow('',null),
    price: Joi.number().required().min(0),
    locaation: Joi.string().required(),
    country: Joi.string().required()
})

 module.exports.reviewSchema = Joi.object({
    reviews : Joi.object({
      comment : Joi.string().required(),
      rating : Joi.number().required().min(1).max(5),
    })
  })