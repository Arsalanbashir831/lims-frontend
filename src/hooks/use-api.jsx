"use client";

import { BASE_URL } from "@/Constants";
import { useState, useCallback } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const callApi = useCallback(
    async (endpoint, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method, // HTTP method (GET, POST, etc.)
          headers: {
            "Content-Type": "application/json", // Default Content-Type
            ...headers, // Merge additional headers
          },
          body: body ? JSON.stringify(body) : null, // Convert body to JSON if provided
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          return errorData.error;
          //   throw new Error(
          //     errorData.error || `HTTP Error: ${response.status}`
          //   );
        }

        const responseData = await response.json();
        setData(responseData);
        return responseData;
      } catch (err) {
        setError(err.error);
        console.error("API call error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { callApi, loading, error, data }; // Return the hook's API
};

export default useApi;
