function errorHandler(error, req, res, next) {
    let status = 500
    let message = "Internal Sevrer Error" 

    console.log(error);
    

    if (error.name === 'SequelizeForeignKeyConstraintError') {
        status = 400
        message = "Data Not Found"
    }

    if (error.name === "SequelizeValidationError") {
        status = 400
        message = error.errors.map(el => el.message) 
    }

    if (error.name === "Not Found") {
        status = 404
        message = "Hero not found"
    }

    if(error.name === "SequelizeDatabaseError"){
        status = 400
        message = "Invalid Input"
    }

    if(error.name === 'SequelizeUniqueConstraintError'){
        status = 400
        message = "Username / E-mail already Exists"
    }

    if(error.name === "Bad Request"){
        message = "Please input your E-mail or Password"
        status = 400
    }

    if(error.name === "Login Error"){
        message = "Invalid E-mail or password"
        status = 401
    }

    if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
        status = 401
        message = "Invalid token"
    }

    if(error.name === "Forbidden"){
        status = 403
        message = "You are not authorized"
    }

    res.status(status).json({
        message
    })
}

module.exports = errorHandler