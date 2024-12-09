import axios from "axios";
import { useState, useEffect } from "react";

export const useSignIn = (trigger, username, password) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trigger && username && password) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.post("http://localhost:8003/Admin", {
            username,
            password,
          });
          setData(response.data);
        } catch (err) {
          setError(err.response?.data?.message || "Login failed.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [trigger]);

  return { data, error, loading };
};
