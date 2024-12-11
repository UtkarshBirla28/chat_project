import Message from "../../models/message.model.js";

const getUserMessages = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const conversations = await Message.find({
      senderId: id,
    }).populate("receiverId", "fullName username gender");

    if (!conversations) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json({ messages: conversations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default getUserMessages;
