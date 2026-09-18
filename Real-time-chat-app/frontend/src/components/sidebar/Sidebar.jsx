import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import useListenMessages from "../../hooks/useListenMessages";
import EditProfileModal from "./EditProfileModal";
import { useAuthContext } from "../../context/AuthContext";

const Sidebar = () => {
	const { authUser } = useAuthContext();
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	useListenMessages();

	return (
		<div className="flex w-[240px] shrink-0 flex-col border-r border-white/10 glass-inner p-3 md:w-[280px]">
			{/* Profile */}
			<button
				className="group flex items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white/5"
				onClick={() => setIsEditModalOpen(true)}
			>
				<img
					src={authUser?.profilePic || "/default-avatar.png"}
					alt="profile"
					className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/40"
				/>
				<div className="min-w-0">
					<h3 className="truncate font-semibold">{authUser?.fullName || authUser?.username}</h3>
					<p className="text-xs text-primary/80 group-hover:text-primary">Edit profile</p>
				</div>
			</button>

			<div className="my-3">
				<SearchInput />
			</div>

			<p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-base-content/40">
				Messages
			</p>
			<Conversations />

			<div className="mt-2 border-t border-white/10 pt-2">
				<LogoutButton />
			</div>

			{isEditModalOpen && (
				<EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
			)}
		</div>
	);
};

export default Sidebar;
