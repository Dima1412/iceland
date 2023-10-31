import "./App.css";
import { CARDS_STATE } from "./assets/const";
import Card from "./components/Card/Card";
import { useState, useEffect, useCallback, useRef } from "react";



function App() {

  const [cards, setCards] = useState(CARDS_STATE);
  const [activeIndex, setActiveIndex] = useState(null);
  
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(reverse, 10000)
    return () => {
      clearInterval(intervalRef.current)
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
      key={card.text}
      data={card}
      index={index}
      active={activeIndex === index}
      setActive={setActive(index)}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
    />
  )

  const onDragStart = (card, index) => () => {
    const newCardsList = [...cards]
    newCardsList.splice(index, 1, {...cards[index], dragging: true})
    setActiveIndex(null)
    setCards(newCardsList)
    clearInterval(intervalRef.current)
  }
  
  const onDragEnter = (card, index) => () => {
    // if (card.dragging) return;
    const draggingCard = cards.find(({dragging}) => !!dragging)
    const newCardsList = cards.filter(({dragging}) => !dragging)
    const hoverIndex = cards.findIndex(({text}) => text === card.text)
    newCardsList.splice(hoverIndex, 0, draggingCard)
    setCards(newCardsList)

  }

  const onDrop = (e) => {
    const newCardsList = cards.map(({dragging, ...restCard}) => ({...restCard}))
    setCards(newCardsList)
    intervalRef.current = setInterval(reverse, 10000)
  }

  return (
    <div className="container">
      <div className="title">Исландия</div>
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        className="field"
      >
        {cards.map(renderCard)}
      </div>
    </div>
  );
}

export default App;
