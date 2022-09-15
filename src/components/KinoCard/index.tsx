import React from 'react'
import { Row, Col, Card, Stack } from 'react-bootstrap';
import { rowGenerator } from '../../utils/rowGenerator'

type Props = {
  gameNumber: string;
  date?: string;
  drawNumbers?: any
}

const index = ({ gameNumber, date, drawNumbers }: Props) => {
  return (
    <Card style={{ width: '100%', margin: '2rem' }}>
      <Card.Header>
        <Stack direction="horizontal" gap={1}>
          <div className="bg-light border">
            {gameNumber}</div>


          <div className="bg-light border ms-auto">
            {date}</div>

        </Stack>

      </Card.Header>
      <Card.Body>
        <Card.Text>
          {rowGenerator(drawNumbers, 5).map((row, idx) =>

          (
            <Row key={idx}>
              {row.map((drawnumber: any) => <Col key={drawnumber}>

                <p>{drawnumber}</p>




              </Col>)}
            </Row>
          )

          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default index