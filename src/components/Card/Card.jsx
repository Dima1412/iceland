import React from 'react';



const Card = ({data, active, setActive}) => {
    
    const { img, title, text } = data
    
    return (
        <div className="card">
            <img src={img} />
            <div className={`description ${active ? 'active' : ''}`} onClick={setActive}>
                <div className="description__title">{title}</div>
                <div className="description__text">{text}</div>
            </div>
        </div>
    );
}

export default Card;
