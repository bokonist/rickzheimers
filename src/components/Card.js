import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

import "../styles/Card.css";
import LazyImage from "./LazyImage";

function Card(props) {
  let cardData = props.cardData;
  let theme = useContext(ThemeContext);
  return (
    <div onClick={props.onClick} className={"card"}>
      <LazyImage
        alt={`${cardData.name}`}
        src={cardData.image}
        className={"card-image"}
      ></LazyImage>
      <p className={"card-info"}>{cardData.name}</p>
    </div>
  );
}

export { Card };
