const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHandler');
const UserController = require('./controllers/UserController');
const HeroController = require('./controllers/HeroController');
const FavouriteController = require('./controllers/FavoriteController');
const authentication = require('./middleware/Authentication');
const authorization = require ('./middleware/Authorization')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/register',UserController.register)
app.post('/login',UserController.login)

app.use(authentication)

//rute Hero
app.get('/hero',HeroController.readHero)

// rute untuk fav hero
app.post('/favourites/:heroId',FavouriteController.createFavourite)
//sebelumnya (/favourites/:id), maka Anda harus mengakses req.params.id di controller
app.get('/favourites',FavouriteController.favouriteHero)
app.put('/favourites/:id',authorization,FavouriteController.updateFavourite)

app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})