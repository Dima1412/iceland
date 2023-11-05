import React from 'react';
import { myType } from '../../assets/const';

interface CardProps {
    data: myType,
    index: number,
    active: boolean,
    setActive: (param: any) => any,
    onDragStart: (param1: any, param2: any) => any,
    onDragEnter: (param1: any, param2: any) => any,
}

type CSSProperty = { transition: string, transform: string} | undefined

const Card = ({
    data,
    index,
    active,
    setActive,
    onDragStart,
    onDragEnter,
}: CardProps) => {
    
    const { img, title, text, dragging } = data
    
    const draggingStyles: CSSProperty = dragging ? {transition: '0.01s', transform: 'translateX(-9999px)'} : undefined

    return (
        <div
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
