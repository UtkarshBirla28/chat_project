import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='flex min-w-0 flex-1 flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='flex items-center gap-3 border-b border-white/10 bg-base-300/40 px-4 py-3'>
						<img
							src={selectedConversation.profilePic}
							alt='avatar'
							className='h-9 w-9 rounded-full object-cover'
						/>
						<div>
							<p className='font-semibold leading-tight'>{selectedConversation.fullName}</p>
							<p className='text-xs text-base-content/50'>@{selectedConversation.username}</p>
						</div>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex h-full w-full items-center justify-center p-6'>
			<div className='flex flex-col items-center gap-3 text-center'>
				<span className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30'>
					<TiMessages className='text-3xl text-primary' />
				</span>
				<div>
					<p className='text-lg font-semibold'>Welcome, {authUser.fullName} 👋</p>
					<p className='mt-1 text-sm text-base-content/50'>
						Select a conversation to start messaging
					</p>
				</div>
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
