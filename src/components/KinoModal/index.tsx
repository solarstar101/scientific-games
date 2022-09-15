import { Modal } from 'react-bootstrap';
import KinoCard from '../KinoCard/index'
import React from 'react'

type Props = {show:boolean, setShow:(boolean:boolean) => void}



const index = ({show,setShow}: Props) => {

const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>

    <Modal.Body>
    {/* <KinoCard gameNumber={obj.gameNumber} date={`${obj.gameDate.m}/${obj.gameDate.d}/${obj.gameDate.year}`} drawNumbers={obj.drawNumbers} /> */}

    </Modal.Body>
   
  </Modal>
  )
}

export default index