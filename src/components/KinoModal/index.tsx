import { Modal } from "react-bootstrap";
import KinoCard from "../KinoCard/index";
import styles from "./Index.module.css"; // Import css modules stylesheet as styles
import React from "react";

type Props = {
  data: {
    gameNumber?: any;
    gameDate?: any;
    drawNumbers?: [];
  };
  show: boolean;
  setShow: ({
    display,
    data,
  }: {
    display: boolean;
    data: {
      gameNumber?: any;
      gameDate?: any;
      drawNumbers?: [];
    };
  }) => void;
};

const index = ({ show, setShow, data }: Props) => {
  const handleClose = () =>
    setShow({
      display: false,
      data: {
        gameNumber: "",
        gameDate: "",
        drawNumbers: [],
      },
    });

  return (
    <>
      {show && (
        <Modal size="xl" centered show={show} onHide={handleClose}>
          <Modal.Body>
            <KinoCard
              className={styles.kinoModalCard}
              gameNumber={data.gameNumber}
              date={`${data.gameDate.m}/${data.gameDate.d}/${data.gameDate.year}`}
              drawNumbers={data.drawNumbers}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default index;
