import "../styles/App.css";

import { useHttp } from "../hooks/NetworkHooks";
import { ThemeContext } from "../contexts/ThemeContext";
import { useCallback, useEffect, useState } from "react";

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
        let myData = fetchedData.results.map((character, index) => {
          let obj = {};
          obj.name = character.name;
          obj.image = character.image;
          obj.seen = false;
          obj.cardID = index;
          return obj;
        });
        console.log(myData);
        return myData;
      });
    }
  }, [fetchedData]);

  const shuffleCards = useCallback(() => {
    let cardsCloneShallow = cards;
    for (let i = 0; i < 10; i++) {
      let index1 = Math.floor(Math.random() * cardsCloneShallow.length);
      let index2 = Math.floor(Math.random() * cardsCloneShallow.length);
      let tempCard = cardsCloneShallow[index1];
      cardsCloneShallow[index1] = cardsCloneShallow[index2];
      cardsCloneShallow[index2] = tempCard;
    }
    setCards(cardsCloneShallow);
    console.log(cardsCloneShallow);
  }, [cards]);

  const toggleTheme = () => {
    setTheme(!theme);
  };
  return (
    <ThemeContext.Provider value={theme}>
      <button
        className={"toggle-theme-button" + (theme ? "-dark" : "-light")}
        onClick={toggleTheme}
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
              return (
                <Card key={index} onClick={shuffleCards} cardData={card}></Card>
              );
            })}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
