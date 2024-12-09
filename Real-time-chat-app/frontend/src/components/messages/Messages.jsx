import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { formatDate } from "../../utils/formatDate";
import DateSeparator from "./DateSeparator";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    const groupedMessages = messages.reduce((groups, message) => {
        const date = formatDate(message.createdAt);
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {});

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 && (
                Object.entries(groupedMessages).map(([date, dateMessages]) => (
                    <div key={date}>
                        <DateSeparator date={date} />
                        {dateMessages.map((message, index) => (
                            <div 
                                key={message._id} 
                                ref={index === dateMessages.length - 1 ? lastMessageRef : null}
                            >
                                <Message message={message} />
                            </div>
                        ))}
                    </div>
                ))
            )}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages;
