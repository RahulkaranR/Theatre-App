import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetShowQuery } from "../shows/showsApiSlice"
import { useBookticketMutation } from "./ticketsApiSlice"
import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/esm/Button';
import {Row, Col, Container} from "react-bootstrap"


const TicketBooking = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState({})
    const [seats, setSeats] = useState([])
    const [bookedseats, setBookedSeats] = useState([])
    const [price, setPrice] = useState(0)
    const location = useLocation();

    const [bookTicket, {
        isSuccess: TickSuccess
    }] = useBookticketMutation()

    const {
        data: gshow,
        isSuccess
    } = useGetShowQuery({id: location.state.id})
    useEffect(() => {
        if(isSuccess){
            setShow(gshow.shows)
            console.log(gshow.shows.bookedseats);
            console.log(gshow.movie);
            if(gshow.shows.bookedseats?.length){
                setBookedSeats(gshow.shows.bookedseats)
            }
            
        }
    })

    useEffect(() => {
        setPrice(seats.length * show.price)
    }, [seats])
    console.log(show);
    console.log(bookedseats);
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
    if(bookedseats.includes(i)){
        return <Button key={index} className='seat-button' disabled={true} variant='danger'>{i}</Button>
    }

    if(seats.includes(i)){
      return <Button key={index} className='seat-button' variant="warning" onClick={() =>addtolist(i)}>{i}</Button>
    }
    
    return <Button key={index} className='seat-button' onClick={() =>addtolist(i)}>{i}</Button>

    })
    const canSave = [Array.isArray(seats), seats.length].every(Boolean) 
    const bookTickeButton = async () => {
        await bookTicket({showsId: location.state.id, seats})
    }

    useEffect(() => {
        if(TickSuccess){
            navigate("/dash/booking/tickets")

        }
    }, [TickSuccess])

    
    
  return (
    <>
        
        <Container className='seat-container'>
        <Row >
            <Col md={10} lg={10} sm={10} xs={10} className='seat-coln'>
            {content}
            </Col>
        </Row>
        <Row>
            <Col>price {price}</Col>
            <Col>
                <Button variant='success' onClick={bookTickeButton} disabled={!canSave} >BookTicket</Button>
            </Col>
        </Row>
        </Container>
    </>
  )
}

export default TicketBooking