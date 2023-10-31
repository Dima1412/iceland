import React from 'react';



const Card = ({
    data,
    index,
    active,
    setActive,
    onDragStart,
    onDragEnter,
}) => {
    
    const { img, title, text, dragging } = data
    
    const draggingStyles = dragging ? {transition: '0.01s', transform: 'translateX(-9999px)'} : null

    return (
        <div
            key={text}
            draggable
            className="card"
            onDragStart={onDragStart(data, index)}
            onDragEnter={onDragEnter(data, index)}
            style={draggingStyles}
        >
            <img src={img} />
            <div className={`description ${active ? 'active' : ''}`} onClick={setActive}>
                <div className="description__title">{title}</div>
                <div className="description__text">{text}</div>
            </div>
        </div>
    );
}

export default Card;
