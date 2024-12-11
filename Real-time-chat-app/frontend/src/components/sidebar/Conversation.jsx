import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useNotificationStore from "../../zustand/useNotificationStore";

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { notifications, clearNotifications } = useNotificationStore();
    const { onlineUsers } = useSocketContext();

    const isSelected = selectedConversation?._id === conversation._id;
    const isOnline = onlineUsers.includes(conversation._id);
    const unreadCount = notifications[conversation._id] || 0;

    const handleSelectConversation = () => {
        setSelectedConversation(conversation);
        clearNotifications(conversation._id);
    };

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""}`}
                onClick={handleSelectConversation}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between items-center'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        <div className='flex items-center gap-2'>
                            {unreadCount > 0 && (
                                <span className='bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                                    {unreadCount}
                                </span>
                            )}
                            <span className='text-xl'>{emoji}</span>
                        </div>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};

export default Conversation;
