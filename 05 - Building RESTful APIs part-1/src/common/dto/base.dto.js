import Joi from "joi";

class BaseDto {
  static schema = Joi.object({}); //child class will override it

  static validate(data) {
    const { error, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      console.log(error);
      console.log(typeof error);

      const errors = error.details.map((d) => d.message);
      console.log(errors);
      console.log(typeof error);

      return { error: errors, value: null };
    }

    return { error: null, value };
  }
}

export default BaseDto;
