import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

import "../styles/Card.css";
import LazyImage from "./LazyImage";

function Card(props) {
  let cardData = props.cardData;
  let theme = useContext(ThemeContext);
  return (
    <div
      onClick={props.onClick}
      className={"card" + (theme ? "-dark" : "-light")}
    >
      <LazyImage
        alt={`${cardData.name}`}
        src={cardData.image}
        className={"card-image" + (theme ? "-dark" : "-light")}
      ></LazyImage>
      <p className={"card-info" + (theme ? "-dark" : "-light")}>
        {cardData.name}
      </p>
    </div>
  );
}

export { Card };
