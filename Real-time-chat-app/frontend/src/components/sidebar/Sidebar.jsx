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
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            {/* Profile Section */}
            <div 
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-700 mb-4"
                onClick={() => setIsEditModalOpen(true)}
            >
                <img 
                    src={authUser?.profilePic || "/default-avatar.png"} 
                    alt="profile" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                />
                <div>
                    <h3 className="font-semibold">{authUser?.username}</h3>
                    <p className="text-sm text-gray-400">Edit Profile</p>
                </div>
            </div>

            <SearchInput />
            <div className='divider px-3'></div>
            <Conversations />
            <LogoutButton />

            {isEditModalOpen && (
                <EditProfileModal 
                    isOpen={isEditModalOpen} 
                    onClose={() => setIsEditModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default Sidebar;
