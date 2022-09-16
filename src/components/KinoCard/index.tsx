import React from "react";
import { Row, Col, Card, Stack } from "react-bootstrap";
import { rowGenerator } from "../../utils/rowGenerator";
import styles from "./Index.module.css"; // Import css modules stylesheet as styles

type Props = {
  gameNumber: string;
  date?: string;
  drawNumbers?: any;
  onClick?: () => void;
  className?: any;
};

const index = ({
  onClick,
  gameNumber,
  date,
  drawNumbers,
  className,
}: Props) => {
  return (
    <Card className={className} onClick={onClick}>
      <Card.Header className={styles.mainCard}>
        <Stack direction="horizontal" gap={1}>
          <div className={styles.kinoCardHeader}>
            <div>Game</div>
            <p className={styles.kinoCardHeaderText}>{gameNumber}</p>
          </div>
          <div className={styles.kinoCardHeader}>
            <div>Date</div>
            <p className={styles.kinoCardHeaderText}>{date}</p>
          </div>
        </Stack>
      </Card.Header>
      <Card.Body>
        {rowGenerator(drawNumbers, 5).map((row, idx) => (
          <Row xl={5} lg={5} md={5} sm={5} xs={5}>
            {row.map((drawnumber: any) => (
              <Col className={styles.kinoCol} key={drawnumber}>
                <div className={styles.kinoNumberBalls}>{drawnumber}</div>
              </Col>
            ))}
          </Row>
        ))}
      </Card.Body>
    </Card>
  );
};

export default index;
