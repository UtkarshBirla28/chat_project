import User from "../models/user.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const response = await User.find({});
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};




export const updateProfile = async (req, res) => {
    try {
        const { fullName, username, gender } = req.body;
        const profilePic = req.files?.profilePic;
        const userId = req.user._id;

        // Check username uniqueness only if it's being updated
        if (username && username !== req.user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: "Username is already taken" });
            }
        }

        // Prepare update object with only changed fields
        const updateFields = {};
        
        if (fullName) updateFields.fullName = fullName;
        if (username) updateFields.username = username;
        if (gender) updateFields.gender = gender;

        // Handle profile picture upload if provided
        if (profilePic) {
            const uploadedImage = await uploadToCloudinary(profilePic.tempFilePath);
            updateFields.profilePic = uploadedImage.secure_url;
        }

        // Update user with new data
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, select: "-password" }
        );

        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            username: updatedUser.username,
            gender: updatedUser.gender,
            profilePic: updatedUser.profilePic,
        });

    } catch (error) {
        console.error("Error in updateProfile: ", error);
        res.status(500).json({ error: "Internal server error while updating profile" });
    }
};
