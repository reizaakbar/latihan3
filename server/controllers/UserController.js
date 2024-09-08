const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, name, password } = req.body;
      console.log(email, name, password);

      const response = await User.create({
        name,
        email,
        password,
      });

      console.log(response);
      res.status(201).json({
        message: `Success create new user ${email}`,
      });
    } catch (error) {
      console.log(error);
      
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {

    if (!email || !password) throw { name: "Bad request" };

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) throw { name: "Invalid email/password" };

    const isPassword = comparePassword(password, user.password);

    if (!isPassword) throw { name: "Invalid email/password" };

    const payload = {
      id: user.id,
      email: user.email,
    };

    const access_token = generateToken(payload);

    res.status(200).json({
      access_token,
      message: `Success login with ${email}`,
    });
    } catch (error) {
      next(error)
    }
    
  }
}

module.exports = UserController;