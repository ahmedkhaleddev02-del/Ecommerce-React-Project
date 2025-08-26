import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let productInfo = useQuery({
    queryKey: ["recentProducts"],
    queryFn: () => getProducts(), // function that sends request
    staleTime: 20000,
    select: (data) => data?.data?.data,
    // gcTime: 4000,
    // retry: 3, // no of retry times
    // retryDelay: 3000, // no of seconds between retries
    // refetchInterval:3000 // every 3 sec will fetch
    // refetchIntervalInBackground: true,
    // refetchOnWindowFocus: true,
  });

  return productInfo;
}
