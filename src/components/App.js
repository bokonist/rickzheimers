import "../styles/App.css";

import { useHttp } from "../hooks/NetworkHooks";
import { ThemeContext } from "../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

import { Card } from "./Card";

function App() {
  const [trigger, setTrigger] = useState(0); // variable to retrigger some hooks if needed
  const [theme, setTheme] = useState(true);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  let [isLoading, fetchedData] = useHttp(
    "https://rickandmortyapi.com/api/character",
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
        //console.log(myData);
        return myData;
      });
    }
  }, [isLoading, fetchedData, trigger]);
  const reset = () => {
    setTrigger(Math.random());
  };
  const markSeenAndShuffleCards = (cardID) => {
    let cardsClone = [...cards];
    for (let [key, value] of cardsClone.entries()) {
      if (value.cardID === cardID) {
        if (value.seen !== true) {
          value.seen = true;
          setScore((prevScore) => {
            if (prevScore + 1 > bestScore) {
              setBestScore(prevScore + 1);
            }
            return prevScore + 1;
          });
        } else {
          setScore(0);
          reset();
          return;
        }
      }
    }
    console.log("shuffling");
    for (let i = 0; i < cards.length; i++) {
      let index1 = Math.floor(Math.random() * cardsClone.length);
      let index2 = Math.floor(Math.random() * cardsClone.length);
      let tempCard = cardsClone[index1];
      cardsClone[index1] = cardsClone[index2];
      cardsClone[index2] = tempCard;
    }
    setCards(cardsClone);
    //console.log(cardsClone);
  };

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
      {isLoading ? (
        <ClimbingBoxLoader
          size={60}
          color={`#000`}
          loading={isLoading}
          style={`position:absolute;
          top:50px; right:50px;`}
        />
      ) : (
        <div className={"App" + (theme ? "-dark" : "-light")}>
          <div
            className={"main-title-container" + (theme ? "-dark" : "-light")}
          >
            RICKZHEIMERS
          </div>
          <div className={"main-body-container" + (theme ? "-dark" : "-light")}>
            <p className={"instructions" + (theme ? "-dark" : "-light")}>
              Don't Click a card twice!
            </p>
            <div className={"score-container" + (theme ? "-dark" : "-light")}>
              <p>Score: {score}/20</p>
              <p>Best Score: {bestScore}/20</p>
            </div>
            <div className={"card-container" + (theme ? "-dark" : "-light")}>
              {cards.map((card, index) => {
                return (
                  <Card
                    key={index}
                    onClick={markSeenAndShuffleCards.bind(null, card.cardID)}
                    cardData={card}
                  ></Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export default App;
