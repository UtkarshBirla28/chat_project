import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div className="flex flex-1 flex-col gap-1 overflow-auto pr-1">
			{conversations.map((conversation) => (
				<Conversation key={conversation._id} conversation={conversation} />
			))}

			{loading && (
				<span className="loading loading-spinner mx-auto mt-4 text-primary"></span>
			)}
			{!loading && conversations.length === 0 && (
				<p className="mt-6 text-center text-sm text-base-content/40">No users yet</p>
			)}
		</div>
	);
};
export default Conversations;
