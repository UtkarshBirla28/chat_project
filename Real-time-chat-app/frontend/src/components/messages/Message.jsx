import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  const shakeClass = message.shouldShake ? "shake" : "";

  // diff types of messages to show
  const isFileMessage = message.message.startsWith("http");

  const renderMessageContent = () => {
    if (!isFileMessage) return message.message;

    if (message.message.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return (
        <img
          src={message.message}
          alt="attachment"
          className="max-w-[200px] rounded-lg"
        />
      );
    }

    if (message.message.match(/\.(mp4|webm)$/i)) {
      return (
        <video
          src={message.message}
          controls
          className="max-w-[200px] rounded-lg"
        />
      );
    }

    if (message.message.match(/\.(mp3|wav)$/i)) {
      return <audio src={message.message} controls className="max-w-[200px]" />;
    }

    // For audio files
    if (message.message.match(/\.(mp3|wav|m4a)$/i)) {
      return (
        <div className="audio-message">
          <audio controls className="max-w-[200px]">
            <source src={message.message} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }

    return (
      <a
        href={message.message}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline"
      >
        Download Attachment
      </a>
    );
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {" "}
        {renderMessageContent()}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
