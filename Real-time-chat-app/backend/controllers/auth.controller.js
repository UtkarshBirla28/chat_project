import bcrypt from "bcryptjs";
import prisma, { publicUser } from "../db/prisma.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const existing = await prisma.user.findUnique({ where: { username } });
		if (existing) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const profilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(
			fullName || username
		)}&background=7c6cf5&color=fff&bold=true`;

		const newUser = await prisma.user.create({
			data: {
				fullName,
				username,
				password: hashedPassword,
				gender,
				profilePic,
			},
		});

		const token = generateTokenAndSetCookie(newUser.id, res);
		const pub = publicUser(newUser);

		res.status(201).json({
			_id: pub._id,
			fullName: pub.fullName,
			username: pub.username,
			profilePic: pub.profilePic,
			token,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await prisma.user.findUnique({ where: { username } });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const token = generateTokenAndSetCookie(user.id, res);
		const pub = publicUser(user);

		res.status(200).json({
			_id: pub._id,
			fullName: pub.fullName,
			username: pub.username,
			profilePic: pub.profilePic,
			token,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
