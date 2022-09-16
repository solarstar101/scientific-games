import React, { useEffect, useState } from 'react';
import { useSingleRecentDrawQuery } from '../src/services/draws'
import { usePastDrawsStartingPointQuery } from "../src/services/draws";
import { Container, Row, Col, Placeholder } from 'react-bootstrap';
import { rowGenerator } from '../src/utils/rowGenerator'
import styles from './App.module.css'; // Import css modules stylesheet as styles
import KinoCard from './components/KinoCard'
import KinoModal from './components/KinoModal'

import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingCard from './components/KinoCard/LoadingCard';


function App() {
  const [drawQuery, setDrawQuery] = useState({
    drawid: '',
    number: 0,
    sort: ''
  })
  const [kinoModal, setShow] = useState({
    display: false,
    data: {}
  });

  const [completeData, setcompleteData]: any = useState([])
  const [RowDataLoading, setRowDataLoading]: any = useState(false)

  const { data: singleRecentDraw, isLoading: singleRecentDrawLoading } = useSingleRecentDrawQuery()
  const { data: completedrawdata, isLoading: completedDrawLoading } = usePastDrawsStartingPointQuery(drawQuery,
    {
      skip: drawQuery.drawid === '' && drawQuery.number === 0 && drawQuery.sort === '',
      refetchOnMountOrArgChange: true
    });

  useEffect(() => {
    if (!singleRecentDrawLoading) {
      setRowDataLoading(true)
      setDrawQuery({ drawid: singleRecentDraw[0].gameNumber, number: 20, sort: 'dsc' })
    }
  }, [singleRecentDrawLoading])

  useEffect(() => {
    if (!completedDrawLoading && completedrawdata) {
      setcompleteData([...completeData, ...completedrawdata])
      setRowDataLoading(false)
    }
  }, [completedrawdata, completedDrawLoading])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
        setRowDataLoading(true)
        setDrawQuery({ drawid: completedrawdata[completedrawdata.length - 1].gameNumber, number: 20, sort: 'dsc' })
      };
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [completedrawdata]);



  return (
    <>
      <Container fluid style={{ padding: '2rem' }} >
        <Row className="justify-content-md-center" xl={5} lg={4} md={3} sm={2} xs={1} >
          {completeData && rowGenerator(completeData, 5).map((row, idx) => (
            row.map((obj: any) => <Col key={obj.gameNumber}>
              <KinoCard className={styles.card} onClick={() => setShow({
                display: true,
                data: obj
              })} gameNumber={obj.gameNumber} date={`${obj.gameDate.m}/${obj.gameDate.d}/${obj.gameDate.year}`} drawNumbers={obj.drawNumbers} />
            </Col>)
          ))}
        </Row>

        {RowDataLoading && <>
          <Row className="justify-content-md-center" xl={5} lg={4} md={3} sm={2} xs={1} >
            {rowGenerator(Array.from(Array(20).keys()), 5).map((row, idx) => (
              row.map((obj: any) => <Col key={obj.gameNumber}>
                <LoadingCard />
              </Col>)
            ))}
          </Row>
        </>
        }

      </Container>

      <KinoModal setShow={setShow} show={kinoModal.display} data={kinoModal.data} />

    </>

  );
}

export default App;
