import prisma, { publicMessage } from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const receiverId = Number(req.params.id);
		const senderId = req.user._id;

		const newMessage = await prisma.message.create({
			data: { senderId, receiverId, message },
		});

		const payload = publicMessage(newMessage);

		// Real-time delivery to the receiver if they are online.
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", payload);
		}

		res.status(201).json(payload);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const userToChatId = Number(req.params.id);
		const senderId = req.user._id;

		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{ senderId, receiverId: userToChatId },
					{ senderId: userToChatId, receiverId: senderId },
				],
			},
			orderBy: { createdAt: "asc" },
		});

		res.status(200).json(messages.map(publicMessage));
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
