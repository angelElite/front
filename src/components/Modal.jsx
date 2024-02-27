import React from 'react';

import { Button, Modal } from 'flowbite-react';

//<Button onClick={() => setOpenModal(true)}>{title}</Button>
const Modall = ({ title, content, onAccept, onDecline, setOpenModal,openModal,modo,size }) => {

  return (
    <>
   
    <Modal show={openModal} size={size} >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button type='submit' color='success' onClick={() => {
          onAccept(modo);
          
        }}>Aceptar</Button>
        <Button color="failure" onClick={() => {
          onDecline();
          
        }}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

export default Modall;
