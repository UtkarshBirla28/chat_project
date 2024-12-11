import { create } from 'zustand';

const useNotificationStore = create((set) => ({
    notifications: {},
    addNotification: (conversationId) => 
        set((state) => ({
            notifications: {
                ...state.notifications,
                [conversationId]: (state.notifications[conversationId] || 0) + 1
            }
        })),
    clearNotifications: (conversationId) =>
        set((state) => ({
            notifications: {
                ...state.notifications,
                [conversationId]: 0
            }
        }))
}));

export default useNotificationStore;
