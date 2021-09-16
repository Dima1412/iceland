import React from 'react';



const Card = ({i, index, item, setindex}) => {
    return (
        <div className="card">
            <img src={"./img/" + item.img} />
            <div className={i==index ? "description active" : "description"} onClick={setindex}>
                <div className="description__title">{item.title}</div>
                <div className="description__text">{item.text}</div>
            </div>
        </div>
    );
}

export default Card;
