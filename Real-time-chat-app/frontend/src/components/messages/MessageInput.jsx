import { useState, useRef } from "react";
import { BsSend, BsEmojiSmile, BsMicFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";
import { cloudinaryConfig } from "../../config/cloudinary";
import { useReactMediaRecorder } from "react-media-recorder";


const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !isFileUploading) return;
    await sendMessage(message);
    setMessage("");
    setShowEmojiPicker(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsFileUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryConfig.uploadPreset);

      const response = await fetch(cloudinaryConfig.uploadEndpoint, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      await sendMessage(data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsFileUploading(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStop: async (blobUrl, blob) => {
        // Upload the audio blob to Cloudinary
        const formData = new FormData();
        formData.append("file", blob);
        formData.append("upload_preset", cloudinaryConfig.uploadPreset);

        try {
          const response = await fetch(cloudinaryConfig.uploadEndpoint, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          await sendMessage(data.secure_url);
          clearBlobUrl();
        } catch (error) {
          console.error("Error uploading audio:", error);
        }
      },
    });

  const handleVoiceRecord = () => {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <form className="px-4 my-3 relative" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white pr-16"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <button
            type="button"
            onClick={handleVoiceRecord}
            className={`text-gray-300 hover:text-white ${
              isRecording ? "text-red-500" : ""
            }`}
          >
            <BsMicFill size={20} />
          </button>
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-300 hover:text-white"
          >
            <BsEmojiSmile size={20} />
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-gray-300 hover:text-white"
          >
            <ImAttachment size={20} />
          </button>

          <button type="submit" className="text-gray-300 hover:text-white">
            {loading || isFileUploading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend size={20} />
            )}
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />

        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-2">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )}
      </div>

      {isRecording && (
        <div className="absolute -top-10 left-0 right-0 bg-red-500 text-white py-1 px-4 rounded-t-lg text-center text-sm">
          Recording... Click mic to stop
        </div>
      )}
    </form>
  );
};

export default MessageInput;
