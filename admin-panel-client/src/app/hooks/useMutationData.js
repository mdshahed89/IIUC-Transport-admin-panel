import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useMutationData = ({ endpoint, method = "POST" }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHelpers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.salmanshahriar.wiki/api/admin${endpoint}`,
        {
          method,
          body:
        }
      );

      const resData = await response.json();
      // console.log(data);

      if (response.ok) {
        setData(resData || []);
        console.log(resData);
        toast.success("Updated successfully!");
      } else {
        console.log(resData.message || "Failed to fetch helpers!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpers();
  }, []);

  return { data, isLoading };
};

export default useMutationData;
