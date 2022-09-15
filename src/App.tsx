import React, { useEffect, useState } from 'react';
import { useSingleRecentDrawQuery } from '../src/services/draws'
import { usePastDrawsStartingPointQuery } from "../src/services/draws";
import {Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [drawQuery, setDrawQuery] = useState({
    drawid: '',
    number: 0,
    sort: ''
  })
  const [completeData, setcompleteData]: any = useState([])
  const [completeDataLoading, setcompleteDataLoading]: any = useState(false)

  const { data: singleRecentDraw, error: singleRecentDrawError, isLoading: singleRecentDrawLoading } = useSingleRecentDrawQuery()
  const { data: completedrawdata, error: completedDrawError, isLoading: completedDrawLoading } = usePastDrawsStartingPointQuery(drawQuery,
    {
      skip: drawQuery.drawid === '' && drawQuery.number === 0 && drawQuery.sort === '',
      refetchOnMountOrArgChange: true
    });

  useEffect(() => {
    if (!singleRecentDrawLoading && !singleRecentDrawError) {
      setcompleteDataLoading(true)
      setDrawQuery({ drawid: singleRecentDraw[0].gameNumber, number: 20, sort: 'dsc' })
    }
  }, [singleRecentDrawLoading])

  useEffect(() => {
    if (!completedDrawLoading && completedrawdata) {
      setcompleteData([...completeData, ...completedrawdata])
      setcompleteDataLoading(false)

    }
  }, [completedrawdata])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setDrawQuery({ drawid: completedrawdata[completedrawdata.length - 1].gameNumber, number: 20, sort: 'dsc' })
      setcompleteDataLoading(true)

    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [completedrawdata]);



  const rows = [...Array( Math.ceil(completeData.length / 5) )];
  const KinoRows = rows.map((row, idx) =>(completeData.slice(idx * 5, idx * 5 + 5) ));
  // map the rows as div.row


  return (
    <Container>
      {!completedDrawLoading && completeData.length >= 1 && KinoRows.map((row, idx) => (
  <Row>    
    { row.map( (obj:any) => <Col key={obj.gameNumber}>{ obj.gameNumber }</Col> )}
  </Row> 
))}
    {completeDataLoading && <h2>LOADING NEW DATA</h2>}
    </Container>
  );
}

export default App;
