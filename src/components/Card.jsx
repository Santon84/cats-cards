import './Card.scss';
import React, {memo, useEffect, useState,useMemo} from 'react'

import Modal from './Modal';
import classnames from 'classnames';


function Card({data}) {

const [showModal, setShowModal] = useState(false);
const [isSelected, setIsSelected] = useState(false);
const [isHovered, setIsHovered] = useState(false);

const [message, setMessage] = useState('');
// const underText = `Чего сидишь? Порадуй котэ, `;
const linkBuy = <span onClick={e => handleSelect(e.target.parentNode.parentNode.dataset.id)}>купи.</span>;
const cardClassNames = classnames('card__wrapper',
   {
    'selected' : isSelected,
    'hovered' : isHovered,
   }) 

useEffect(() => {
    if (isSelected) {
        setMessage(`Товар ${data.title} ${data.taste} выбран`);
        setShowModal(true);
        //cardClasses +=' selected';
    } 
    return () => {
        setMessage('');
    }
}, [isSelected]);

useEffect(() => {
    if (!showModal) return;
    setTimeout(()=> {
        setShowModal(false);
    }, 2000)
},[showModal])



function handleSelect() {
    if (!isSelected) {
        setIsHovered(false);
    }
    setIsSelected(prev => !prev);
}

 function handleMouseEnter() {
    setIsHovered(true);

 }  
 function handleMouseLeave() {
    setIsHovered(false);

 }   
  return (
    <div className="card" data-id={data.id} >
        <div className='card__corner-wrapper'>
        <div className={cardClassNames}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}   
            onClick={e => handleSelect()} style={{backgroundImage: 'url('+data.image+')'}}>
        <div className="card__text-wrapper">
            <p className='card__subtitle'>{isSelected && isHovered ? 'Котэ не одобряет?' : data.subtitle}</p>
            <h3 className='card__title'>{data.title}</h3>
            <p className='card__taste'>{data.taste}</p>
            
            <div className='weight-conteiner'>
                <p className='pack-weight'>{data.weight.split(' ')[0]}</p>
                <p>{data.weight.split(' ')[1]}</p>
            </div>
        </div>
        
        
            
            
        </div>
        </div>
        <p className='undercard-description'>{isSelected ? data.description : linkBuy }</p>
        {showModal && message.length>0 && <Modal messageText={message}/>}
    </div>

  )
}

export default Card
