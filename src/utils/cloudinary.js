const cloudinary = require('cloudinary').v2;
const fs = require('fs')

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        //remove the locally saved temp file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        return null
    }
}

module.exports = uploadOnCloudinary;