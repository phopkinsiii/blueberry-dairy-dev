export const errorHandler = (err, req, res, next) => {
    //Log the error message for debugging
    console.error(`Error: ${err.message}`);

    //Set the default to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    //Send the error response
    res.status(statusCode).json({
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null //Show stack trace only in dev mode
    })
}