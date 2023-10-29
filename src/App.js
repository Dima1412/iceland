import "./App.css";
import { CARDS_STATE } from "./assets/const";
import Card from "./components/Card/Card";
import { useState, useEffect, useCallback } from "react";



function App() {

  const [cards, setCards] = useState(CARDS_STATE);
  const [activeIndex, setActiveIndex] = useState(null);
  
  useEffect(() => {
    const interval = setInterval(reverse, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const reverse = useCallback(() => {
    setCards(prev => {
      const cardsCopy = [...prev]
      cardsCopy.reverse()
      return cardsCopy
    })
    setActiveIndex(prev => prev === null ? null : 8 - prev)
  }, [])

  const setActive = (index) => () => {
    const newIndex = index === activeIndex ? null : index
    setActiveIndex(newIndex)
  };

  const renderCard = (card, index) => (
    <Card
      data={card}
      active={activeIndex === index}
      setActive={setActive(index)}
    />
  )

  return (
    <div className="container">
      <div className="title">Исландия</div>
      <div className="field">
        {cards.map(renderCard)}
      </div>
    </div>
  );
}

export default App;
