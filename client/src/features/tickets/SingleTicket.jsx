import React, { useEffect, useState } from 'react'
import { useGetsingleticketQuery, useDeleteticketMutation } from './ticketsApiSlice'
import { useNavigate } from 'react-router-dom'
import { Col, Card, Button} from "react-bootstrap"
import { BATCH } from '../../config/batch'
import QRCode from "react-qr-code";

const SingleTicket = ({ ticket }) => {
    const navigate = useNavigate()
    const [ticke, setTicke] = useState({})
    const [seat, setSeat] = useState([])
    const {
        data,
        isSuccess
    } = useGetsingleticketQuery({id: ticket._id})

    const[deleteticket, {
        isSuccess: DelSuccess
    }] = useDeleteticketMutation()

    useEffect(()=> {
        if(isSuccess){
            setTicke(data)
            setSeat(data.Seats)
            console.log(data);
        }
    },[isSuccess])
    const time = BATCH[ticke.Batch];
    const date = new Date(ticke.showdate);
    const showDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const showTime = time > 12 ? `${time - 12}-00 PM` : `${time}-00 AM`
    const datetotal = `Date:${showDate}, Time:${showTime}`

    const seats = seat.map((item) => `${item}, `)
    const price = `${ticke.Price * seats.length}`
    const Qrvalue = `http://localhost:5000/api/ticket/${ticke.Id}`

    const deleteButton = async () => {
        await deleteticket({id: ticket._id})
    }

    useEffect(() => {
        if(DelSuccess){
            navigate("/dash/booking/tickets")
        }
    }, [DelSuccess])
    


  return (
    <Col md={3} lg={3}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={ticke.image} />
                <Card.Body>
                    <Card.Title>{datetotal}</Card.Title>
                    <Card.Title>{ticke.movieName}</Card.Title>
                    <Card.Text>
                     Ticket Price: {price}
                    </Card.Text>
                    <Card.Text>
                       Seats Number:  {seats}
                    </Card.Text>
                    <Card.Text>
                        <div >
                            <QRCode 
                                value={Qrvalue}
                                style={{ height: "100px", width: "100px" }}
                            />    
                        </div>
                    </Card.Text>
                    <Button variant='danger' onClick={deleteButton}>
                        DeleteTicket
                    </Button>
                    
                </Card.Body>
            </Card>
        </Col>
  )
}

export default SingleTicket