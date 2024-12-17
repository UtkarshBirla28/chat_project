import cloudinary from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "chat_uploads",
            upload_preset: "chat_uploads"
        });
        return result;
    } catch (error) {
        console.error("Error uploading to cloudinary: ", error);
        throw new Error("Could not upload image");
    }
};