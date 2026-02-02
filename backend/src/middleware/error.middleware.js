import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) =>{
    logger.error(err.stack)
    // console.log(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || "Internal Server error",
    })
}

export default errorHandler;