const { Op } = require("sequelize");
const { Favourite, Hero } = require("../models");

class FavouriteController {
  static async createFavourite(req, res, next) {
    try {
      const { heroId } = req.params;
      const { userId } = req.loginInfo;
      console.log(heroId, userId, "lihatt iniiii>>>>>>>>>>>>>>>>>>>>>>>>>>.");

      // Cek apakah hero ada
      const hero = await Hero.findByPk(heroId);
      if (!hero) {
        return res.status(404).json({ message: "Hero not found" });
      }
      //  console.log(hero,"cobaaa liaaat dapet ga nih si heroo>>>>>>>>>>>>>>>>>>>>>>>.");

      // Cek apakah sudah ada favorit untuk hero ini

      // console.log(existingFavourite,'lihat ini kawan>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

      const heroFavourite = await Favourite.create({
        userId: userId,
        heroId: heroId,
        role: "-",
        power: 0,
      });

      res.status(201).json(heroFavourite);
    } catch (error) {
      next(error);
    }
  }

  static async favouriteHero(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      const favourites = await Favourite.findAll({
        where: { userId },
        include: [Hero],
      });

      res.status(200).json(favourites);
    } catch (error) {
      console.log("Error:", error);
      next(error);
    }
  }

  static async updateFavourite(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.loginInfo;
      const { role, power } = req.body;

      const favourite = await Favourite.findOne({
        where: {
          id,
          userId,
        },
      });

      if (!favourite) {
        return res
          .status(404)
          .json({ message: "Favourite not found or unauthorized" });
      }

      favourite.role = role || favourite.role;
      favourite.power = power || favourite.power;

      await favourite.save();

      res.status(200).json({
        message: "Favourite hero has been updated",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FavouriteController;
