import { useState, useEffect } from "react";
import axios from "axios";

export const useDashboard = () => {
  const [data, setData] = useState([{}]); // Initialize state for the data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users/all"
        );
        setData(response.data); // Save the data to state
      } catch (err) {
        setError(err); // Save the error to state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount
  return { data, error, loading };
};
