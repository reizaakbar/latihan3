const { Favourite } = require("../models");

async function FavouriteHeroAuthorization(req, res, next) {
  try {
    const { userId } = req.loginInfo;
    const { id } = req.params;

    // Check if the favourite hero exists and belongs to the logged-in user
    const selectedHero = await Favourite.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!selectedHero) throw { name: "Unauthorized", message: "You are not authorized or Hero not found" };

    // If authorized, proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = FavouriteHeroAuthorization;
