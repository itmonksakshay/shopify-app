// hooks/useFetchStoreData.js

import { useState, useEffect } from "react";

const useFetchStoreData = () => {
  const [data, setData] = useState(null); // Store fetched data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const fetchData = async () => {
    try {
      const response = await fetch("/api/store"); // Assuming the API endpoint is available
      if (!response.ok) {
        throw new Error("Failed to fetch store data");
      }
      const result = await response.json();
      const payload = JSON.parse(result?.content || "{}");
      setData(payload); // Store the fetched data
    } catch (err) {
      setError(err.message); // Store the error message
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  useEffect(() => {
    fetchData(); // Initiate the fetch request when the component mounts
  }, []);

  return { data, loading, error, refetchData: fetchData };
};

export default useFetchStoreData;
