import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import {Row, Col, Container} from "react-bootstrap"

const theaterSeats = () => {
  const [seats, setSeats] = useState([])
  let list = []
  for(let i=1; i <= 60; i++){
    list[list.length] = i;
  }
  const addtolist = (value) => {
    if(seats.includes(value)){
      const index = seats.indexOf(value);
      seats.splice(index, 1);
      return setSeats([...seats]);
    }
    console.log("second ",value);
    return setSeats([value, ...seats])
  }

  const content = list.map((i, index) => {

    if(seats.includes(i)){
      return <Button key={index} className='seat-button' variant="warning" onClick={() =>addtolist(i)}>{i}</Button>
    }
  
  return <Button key={index} className='seat-button' onClick={() =>addtolist(i)}>{i}</Button>

  })

  return (
    <Container className='seat-container'>
      {seats}
      <Row >
        <Col md={10} lg={10} sm={10} xs={10} className='seat-coln'>
          {content}
        </Col>
      </Row>
    </Container>
  )
}

export default theaterSeats
    