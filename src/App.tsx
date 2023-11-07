import "./App.css";
import { CARDS_STATE, myType } from "./assets/const";
import Card from "./components/Card/Card";
import { useState, useEffect, useCallback, useRef } from "react";



function App() {

  const [cards, setCards] = useState<myType[]>(CARDS_STATE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(reverse, 10000)
    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
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

  const setActive = (index: number) => () => {
    const newIndex = index === activeIndex ? null : index
    setActiveIndex(newIndex)
  };

  const renderCard = (card: myType, index: number) => {
    return (
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
  }

  const onDragStart = (card: myType, index: number) => () => {
    const newCardsList = [...cards]
    newCardsList.splice(index, 1, {...cards[index], dragging: true})
    setActiveIndex(null)
    setCards(newCardsList)
    intervalRef.current && clearInterval(intervalRef.current)
  }
  
  const onDragEnter = (card: myType, index: number) => () => {
    // if (card.dragging) return;
    const draggingCard = cards.find(({dragging}) => !!dragging)
    const newCardsList = cards.filter(({dragging}) => !dragging)
    const hoverIndex = cards.findIndex(({text}) => text === card.text)
    draggingCard && newCardsList.splice(hoverIndex, 0, draggingCard)
    setCards(newCardsList)

  }

  const onDrop = () => {
    const newCardsList = cards.map(card => ({...card, dragging: false}))
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
