import { useEffect, useState } from "react";
import axios from "axios";

export const useUserData = (id) => {
  const [userData, setUserData] = useState(); // Default state is null
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        if (!id) return; // Ensure `id` is defined
        const response = await axios.get(
          `http://localhost:8003/api/admin/messages/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
