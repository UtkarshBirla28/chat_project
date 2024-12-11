import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import useNotificationStore from "../zustand/useNotificationStore";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages, selectedConversation } = useConversation();
    const { addNotification } = useNotificationStore();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            
            setMessages([...messages, newMessage]);

            // Add notification if user is not in the sender's conversation
            if (selectedConversation?._id !== newMessage.senderId) {
                addNotification(newMessage.senderId);
            }
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages, selectedConversation, addNotification]);
};

export default useListenMessages;
