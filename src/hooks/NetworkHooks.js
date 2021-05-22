import { useEffect, useState } from "react";

const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  /*  parameterMap = new Map(parameterMap);
  for (const [key, value] of parameterMap) {
    url += key + "=" + value + "&";
  }*/
  useEffect(() => {
    console.log("data being fetched");
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((responseBody) => {
        setIsLoading(false);
        setFetchedData(responseBody);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, [...dependencies, url]);
  return [isLoading, fetchedData];
};

export { useHttp };
