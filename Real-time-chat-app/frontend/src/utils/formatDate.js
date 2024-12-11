export const formatDate = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    
    const isToday = messageDate.toDateString() === now.toDateString();
    const isYesterday = new Date(now - 86400000).toDateString() === messageDate.toDateString();
    
    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    
    const diff = now - messageDate;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
    
    return messageDate.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  