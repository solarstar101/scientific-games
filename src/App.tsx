import React, { useEffect, useState } from 'react';
import { useSingleRecentDrawQuery } from '../src/services/draws'
import { usePastDrawsStartingPointQuery } from "../src/services/draws";
import { Container, Row, Col } from 'react-bootstrap';
import { rowGenerator } from '../src/utils/rowGenerator'
import styles from './App.module.css'; // Import css modules stylesheet as styles
import KinoCard from './components/KinoCard'
import KinoModal from './components/KinoModal'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [drawQuery, setDrawQuery] = useState({
    drawid: '',
    number: 0,
    sort: ''
  })
  const [show, setShow] = useState({
    display: false,
    data: {}
  });

  const [completeData, setcompleteData]: any = useState([])
  const [completeDataLoading, setcompleteDataLoading]: any = useState(false)

  const { data: singleRecentDraw, isLoading: singleRecentDrawLoading } = useSingleRecentDrawQuery()
  const { data: completedrawdata, isLoading: completedDrawLoading } = usePastDrawsStartingPointQuery(drawQuery,
    {
      skip: drawQuery.drawid === '' && drawQuery.number === 0 && drawQuery.sort === '',
      refetchOnMountOrArgChange: true
    });

  useEffect(() => {
    if (!singleRecentDrawLoading) {
      setcompleteDataLoading(true)
      setDrawQuery({ drawid: singleRecentDraw[0].gameNumber, number: 20, sort: 'dsc' })
    }
  }, [singleRecentDrawLoading])

  useEffect(() => {
    if (!completedDrawLoading && completedrawdata) {
      setcompleteData([...completeData, ...completedrawdata])
      setcompleteDataLoading(false)

    }
  }, [completedrawdata, completedDrawLoading])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setDrawQuery({ drawid: completedrawdata[completedrawdata.length - 1].gameNumber, number: 20, sort: 'dsc' })
      setcompleteDataLoading(true)

    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [completedrawdata]);



  return (
    <>    <Container style={{ marginBottom: '2rem' }} >
      {!completedDrawLoading && completeData.length >= 1 && rowGenerator(completeData, 5).map((row, idx) => (
        <Row key={idx}>
          {row.map((obj: any) => <Col key={obj.gameNumber}>

            <KinoCard className={styles.card} onClick={() => setShow({
              display: true,
              data: obj
            })} gameNumber={obj.gameNumber} date={`${obj.gameDate.m}/${obj.gameDate.d}/${obj.gameDate.year}`} drawNumbers={obj.drawNumbers} />


          </Col>)}
        </Row>
      ))}
      {completeDataLoading && <h2>LOADING NEW DATA</h2>}
    </Container>
      {show.display &&
        <KinoModal setShow={setShow} show={show.display} data={show.data} />
      }    </>

  );
}

export default App;
