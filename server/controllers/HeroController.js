const { Hero } = require("../models");

class HeroController {
  static async readHero(req, res, next) {
    try {
    const heross = await Hero.findAll({
        attributes :{
            exclude :["createdAt","updatedAt"]
        }
    })

    res.status(200).json(heross)
    } catch (error) {}
  }
}

module.exports = HeroController;
