import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useNotificationStore from "../../zustand/useNotificationStore";

const Conversation = ({ conversation }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { notifications, clearNotifications } = useNotificationStore();
	const { onlineUsers } = useSocketContext();

	const isSelected = selectedConversation?._id === conversation._id;
	// onlineUsers are string socket-map keys; conversation._id is a number.
	const isOnline = onlineUsers.includes(String(conversation._id));
	const unreadCount = notifications[conversation._id] || 0;

	const handleSelectConversation = () => {
		setSelectedConversation(conversation);
		clearNotifications(conversation._id);
	};

	return (
		<div
			className={`flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors ${
				isSelected ? "bg-primary/20 ring-1 ring-primary/40" : "hover:bg-white/5"
			}`}
			onClick={handleSelectConversation}
		>
			<div className="relative shrink-0">
				<img
					src={conversation.profilePic}
					alt="user avatar"
					className="h-11 w-11 rounded-full object-cover"
				/>
				{isOnline && (
					<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-300 bg-success" />
				)}
			</div>

			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-2">
					<p className="truncate font-semibold text-base-content/90">{conversation.fullName}</p>
					{unreadCount > 0 && (
						<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-white">
							{unreadCount}
						</span>
					)}
				</div>
				<p className="truncate text-xs text-base-content/50">
					{isOnline ? "Online" : "Offline"}
				</p>
			</div>
		</div>
	);
};

export default Conversation;
