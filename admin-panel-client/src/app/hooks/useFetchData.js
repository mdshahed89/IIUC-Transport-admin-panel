import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useFetchData = ({ endpoint, method = "Get", isFetch = true }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.salmanshahriar.wiki/api/admin${endpoint}`,
        {
          method,
        }
      );

      const resData = await response.json();
      // console.log(data);

      if (response.ok) {
        setData(resData || []);
        console.log(resData);
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
    if (isFetch) {
      fetcher();
    }
  }, [isFetch]);

  return { data, isLoading, fetcher };
};

export default useFetchData;
