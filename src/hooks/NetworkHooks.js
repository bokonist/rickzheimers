import { useEffect, useState } from "react";

function cleanURL(url)
{
  let indexStart = 0, indexEnd= url.length-1;
  for (let i = url.length-1, let j= 0; i >0, j<url.length; i--, j++) {
    if(url[i]==='/')
    {
      indexEnd--;
    }
    if(url[j]==='/')
    {
      indexStart++;
    }
  }
  return url.slice(indexStart,indexEnd);
}


export const useHttp = (baseurl,endpoint, parameterMap = {} , dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  let url = "http://"+cleanURL(baseurl)+ '/' + cleanURL(endpoint) + "?";
  for ([key,value] of parameterMap){
    url+= key + "=" + value + "&";
  }
  useEffect(() => {
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
