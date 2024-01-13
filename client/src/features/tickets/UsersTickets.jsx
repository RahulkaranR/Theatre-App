import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectMoviesById } from '../movies/moviesApiSlice'
import { useGetallticketQuery, useGetsingleticketQuery } from "./ticketsApiSlice"
import SingleTicket from './SingleTicket'
import { Row } from 'react-bootstrap'

const UsersTickets = () => {
    const [ticket, setTicket] = useState([])

    const { 
        data: tickets,
        isSuccess
    } = useGetallticketQuery()

    useEffect(() => {
        if(isSuccess){
            setTicket(tickets);
        }
    },[isSuccess])

    const content = ticket.map((ticket) => {
        return <SingleTicket key={ticket._id} ticket={ticket} />
            

    })
    

  return (
    <Row>
        {content}
    </Row>
  )
}

export default UsersTickets