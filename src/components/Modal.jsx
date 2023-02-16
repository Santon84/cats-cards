
import './Modal.scss'

function Modal({messageText}) {
  
  return (
    <div className='modal'>
      <div className="modal__window">
        <p>{messageText}</p>
      </div>

    </div>
  )
}

export default Modal
