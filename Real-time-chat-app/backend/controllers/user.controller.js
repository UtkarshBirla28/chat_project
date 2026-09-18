import prisma, { publicUser } from "../db/prisma.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const users = await prisma.user.findMany({
			where: { id: { not: loggedInUserId } },
			orderBy: { fullName: "asc" },
		});

		res.status(200).json(users.map(publicUser));
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users.map(publicUser));
	} catch (error) {
		console.error("Error in getAllUsers: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { fullName, username, gender } = req.body;
		const profilePic = req.files?.profilePic;
		const userId = req.user._id;

		// Username uniqueness check only when it changes
		if (username && username !== req.user.username) {
			const existing = await prisma.user.findUnique({ where: { username } });
			if (existing) {
				return res.status(400).json({ error: "Username is already taken" });
			}
		}

		const updateFields = {};
		if (fullName) updateFields.fullName = fullName;
		if (username) updateFields.username = username;
		if (gender) updateFields.gender = gender;

		if (profilePic) {
			const uploadedImage = await uploadToCloudinary(profilePic.tempFilePath);
			updateFields.profilePic = uploadedImage.secure_url;
		}

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: updateFields,
		});

		const pub = publicUser(updatedUser);
		res.status(200).json({
			_id: pub._id,
			fullName: pub.fullName,
			username: pub.username,
			gender: pub.gender,
			profilePic: pub.profilePic,
		});
	} catch (error) {
		console.error("Error in updateProfile: ", error);
		res.status(500).json({ error: "Internal server error while updating profile" });
	}
};
