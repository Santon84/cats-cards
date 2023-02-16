import './Card.scss';
import React, { useEffect, useState} from 'react'

import Modal from './Modal';
import classnames from 'classnames';


function Card({data}) {

const [showModal, setShowModal] = useState(false);
const [isSelected, setIsSelected] = useState(false);
const [isHovered, setIsHovered] = useState(false);
const [isActive] = useState(JSON.parse(data.available));
const [message, setMessage] = useState('');
const linkBuy = <>Чего сидишь? Порадуй котэ, <span onClick={e => handleSelect(e.target.parentNode.parentNode.dataset.id)}>купи.</span></>;
const textDisabled = <>Печалька, {data.taste} закончился.</>;
const cardClassNames = classnames('card__wrapper',
   {
    'selected' : isSelected,
    'hovered' : isHovered,
    'disabled' : !isActive,
   }) 

const imageStyles = {
    active: {
        backgroundImage: 'url('+data.image+')'
    },
    inactive: {
        backgroundImage: 'url('+data.image+')',
        opacity: 0.5
    }
}

useEffect(() => {
    if (isSelected) {
        setMessage(`Товар ${data.title} ${data.taste} выбран`);
        setShowModal(true);
       
    } 
    return () => {
        setMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className='card__corner-wrapper' >
            <div className={cardClassNames}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}   
                onClick={e => handleSelect()} >
            <div className="card__text-wrapper" style={isActive ? {} : {opacity: 0.5, color: '#B3B3B3'}}>
                <p className='card__subtitle'>{isSelected && isHovered ? 'Котэ не одобряет?' : data.subtitle}</p>
                <h3 className='card__title'>{data.title}</h3>
                <p className='card__taste'>{data.taste}</p>
                <p className="card__portion">{data.portion}</p>
                <p className="card__bonus">{data.bonus}</p>
            </div>
            <div className='card__weight-conteiner'>
                <p className='card__pack-weight'>{data.weight.split(' ')[0]}</p>
                <p>{data.weight.split(' ')[1]}</p>
            </div>
            <div className='card__image-conteiner' style={isActive ? imageStyles.active : imageStyles.inactive }>
            {/* <img style={} alt='cat' src={data.image}></img> */}
            </div>
            </div>
        </div>
        <p className={isActive ? 'card__undercard-description ' : 'card__undercard-description card__undercard-description_disabled'}>{isSelected ? data.description : isActive ? linkBuy : textDisabled } </p>
        {showModal && message.length>0 && <Modal messageText={message}/>}
    </div>

  )
}

export default Card
