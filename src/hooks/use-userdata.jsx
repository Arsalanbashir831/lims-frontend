import { useState, useEffect } from "react";
import useApi from "@/hooks/use-api";
import { useRouter } from "next/navigation";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { callApi } = useApi(); 
  const router = useRouter()

  const fetchUser = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    if (!userId || !token) {
      setError("User ID or token is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await callApi(`/api/users/${userId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      }).then((data)=>{
        if (!data) {
          router.push('/auth')
        }else{
          setUserData(data);
        }
     
    })
    
    } catch (err) {
      setError(err.message || "An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { userData, loading, error, refetch: fetchUser };
};

export default useUserData;
