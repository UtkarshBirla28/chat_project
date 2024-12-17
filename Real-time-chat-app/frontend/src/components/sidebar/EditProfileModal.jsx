import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const EditProfileModal = ({ isOpen, onClose }) => {
    const { authUser, setAuthUser } = useAuthContext();
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        gender: ""
    });
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        // Pre-fill form with existing user data
        setFormData({
            fullName: authUser.fullName,
            username: authUser.username,
            gender: authUser.gender
        });
        setPreviewImage(authUser.profilePic);
    }, [authUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        // Only include changed fields
        const changedFields = new FormData();
        if (formData.fullName !== authUser.fullName) {
            changedFields.append("fullName", formData.fullName);
        }
        if (formData.username !== authUser.username) {
            changedFields.append("username", formData.username);
        }
        if (formData.gender !== authUser.gender) {
            changedFields.append("gender", formData.gender);
        }
        if (profilePic) {
            changedFields.append("profilePic", profilePic);
        }

        try {
            setLoading(true);
            const res = await fetch("/api/users/update", {
                method: "PATCH",
                body: changedFields
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setAuthUser(data);
            localStorage.setItem("chat-user", JSON.stringify(data));
            toast.success("Profile updated successfully");
            onClose();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Edit Profile</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Picture Section */}
                    <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-2">
                            <img
                                src={previewImage || "/default-avatar.png"}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-4 border-gray-700"
                            />
                            <label className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Full Name Input */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-gray-700"
                        />
                    </div>

                    {/* Username Input */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="input input-bordered w-full bg-gray-700"
                        />
                    </div>

                    {/* Gender Select */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="select select-bordered w-full bg-gray-700"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
