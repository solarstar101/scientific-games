import React from "react";
import { Card, Stack, Placeholder, Row, Col } from "react-bootstrap";
import { rowGenerator } from "../../utils/rowGenerator";
import styles from "./Index.module.css";

const LoadingCard = () => {
  return (
    <Placeholder as={Card} animation="glow" className={styles.loadingCard}>
      <Placeholder as={Card.Header} animation="glow">
        <Stack direction="horizontal" gap={1}>
          <Placeholder as="p" animation="glow" />
        </Stack>
      </Placeholder>
      <Placeholder as={Card.Body} animation="glow">
        {rowGenerator(Array.from(Array(25).keys()), 5).map((row, idx) => (
          <Row key={idx}>
            {row.map((drawnumber: any) => (
              <Col key={drawnumber}>
                <Placeholder xs={12} />
              </Col>
            ))}
          </Row>
        ))}
      </Placeholder>
    </Placeholder>
  );
};

export default LoadingCard;
