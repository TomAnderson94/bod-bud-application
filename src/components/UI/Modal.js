import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; 

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose} className='modal-close-button'>Close</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
