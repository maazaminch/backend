
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch
            ((err) => next(err));
    }
}

module.exports = asyncHandler;




// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     }
//     catch (error) {
//         console.log(res.status(err.code || 500).json({
//             success: false,
//             message: err.message()
//         }));

//     }
// }