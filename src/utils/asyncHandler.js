
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export { asyncHandler };




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