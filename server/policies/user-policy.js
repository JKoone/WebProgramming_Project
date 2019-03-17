const Joi = require('joi')

module.exports = {
  register(input) {
    const schema = {
      Email: Joi.string().email(),
      Password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const { error } = Joi.validate({Email: input.Email, Password: input.Password}, 
                                    schema)
    if (error) {
      console.log(error)
      switch (error.details[0].context.key) {
        case 'Email':
          return 'You must provide a valid email address'
        case 'Password':
            return `The password provided failed to match the following rules:
            <br>
            1. It must contain ONLY the following characters: lower case, upper case, numerics
            <br>
            2. It must contain at least 8 characters in length and not greater than 32 characters in length
            `
        default:
          return 'Invalid register information...'
      }
    }
    return 
  },
  updatePassword(input){
    const schema = {
      NewPassword: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const { error } = Joi.validate({NewPassword: input.NewPassword}, schema)
    if(error) {
      switch (error.details[0].context.key) {
        case 'NewPassword':
          return `The new password provided failed to match the following rules:
          <br>
          1. It must contain ONLY the following characters: lower case, upper case, numerics
          <br>
          2. It must contain at least 8 characters in length and not greater than 32 characters in length
          `
        default:
          return 'Invalid password..'
      }
    }
  }
}
