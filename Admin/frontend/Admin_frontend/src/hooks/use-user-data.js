import { useEffect, useState } from "react";
import axios from "axios";

export const useUserData = (id) => {
  const [userData, setUserData] = useState(); // Default state is null
  useEffect(() => {
    const fetchUserById = async () => {
      try {
        if (!id) return; // Ensure `id` is defined
        const response = await axios.get(
          `http://localhost:5000/api/admin/messages/${id}`
        );
        setUserData(response.data.messages);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserById();
  }, [id]);

  return userData;
};
