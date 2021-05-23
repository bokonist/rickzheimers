import { useEffect, useState } from "react";

import loadingGIF from "../assets/loading.gif";

function LazyImage(props) {
  const { alt, className, src } = props;
  const [source, setSource] = useState(loadingGIF);
  useEffect(() => {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((data) => {
        let url = URL.createObjectURL(data);
        setTimeout(() => {
          setSource(url);
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        return;
      });
  }, [src]);
  return <img alt={alt} src={source} className={className}></img>;
}
export default LazyImage;
