import "../styles/App.css";

import { useHttp } from "../hooks/NetworkHooks";
import { ThemeContext } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";

import { Card } from "./Card";

function App() {
  const [theme, setTheme] = useState(true);
  const [cards, setCards] = useState([]);
  let [isLoading, fetchedData] = useHttp(
    "http://rickandmortyapi.com/api/character",
    []
  );
  useEffect(() => {
    console.log("useEffect is running");
    if (!isLoading && fetchedData) {
      setCards((prevCards) => {
        console.log(fetchedData.results);
        return fetchedData.results;
      });
    }
  }, [fetchedData]);
  return (
    <ThemeContext.Provider value={theme}>
      <button
        className={"toggle-theme-button" + (theme ? "-dark" : "-light")}
        onClick={() => {
          setTheme(!theme);
        }}
      >
        {theme ? "Light Mode" : "Dark Mode"}
      </button>
      <div className={"App" + (theme ? "-dark" : "-light")}>
        <div className={"main-title-container" + (theme ? "-dark" : "-light")}>
          RICKZHEIMERS
        </div>
        <div className={"main-body-container" + (theme ? "-dark" : "-light")}>
          <div
            className={"score-container" + (theme ? "-dark" : "-light")}
          ></div>
          <div className={"card-container" + (theme ? "-dark" : "-light")}>
            {cards.map((card, index) => {
              return <Card key={index} cardData={card}></Card>;
            })}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
