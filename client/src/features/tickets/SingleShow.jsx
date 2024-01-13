import React, { useEffect, useState } from 'react'
import { useGetMovieQuery } from '../movies/moviesApiSlice'
import { useSelector } from 'react-redux'
import { selectShowsById } from '../shows/showsApiSlice'
import { useNavigate } from 'react-router-dom'

import { BATCH } from "../../config/batch"

import { Col, Card, Button} from "react-bootstrap"


const Show = ({ showsId }) => {

  const navigate = useNavigate();
  const [movie, setmovie] = useState({})

  const show = useSelector(state => selectShowsById(state, showsId))

  const date = new Date(show.dateforshow);
  const time = BATCH[show.batch];
  const showDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const showTime = time > 12 ? `${time - 12}-00 PM` : `${time}-00 AM`

  const {
    data : Singlemovie,
    isSuccess
  } = useGetMovieQuery({ id: show.movie})

  useEffect(() => {
    if(isSuccess){
      console.log(Singlemovie.movie);
      setmovie(Singlemovie.movie)

    }

  }, [isSuccess])
  

  let content;
  let movietype;
  if(movie?.movietype){
    movietype = movie.movietype.map(item => `${item}, `)
  }

  if(!show){
    content = <p>Movie Don't find</p>
  }

  const bookingTicket = () => navigate(`/dash/booking/show`, {
    state: {
        id: show._id
    }
  })

  content = (
    <Col md={3} lg={3}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={movie.imageurl} />
                <Card.Body>
                    <Card.Title>ShowDate: {showDate} ShowTime: {showTime}</Card.Title>
                    <Card.Title>{movie.movieName}</Card.Title>
                    <Card.Text>
                    {movie.subtitle}
                    </Card.Text>
                    <Card.Text>
                    {movietype}
                    <br />
                    {`Rating : ${movie.rating}`}
                    <br />
                    {`Price: ${show.price}`}
                    </Card.Text>
                    <Card.Text>
                    </Card.Text>
                    <Button variant="secondary" onClick={bookingTicket}>Book Ticket</Button>
                </Card.Body>
            </Card>
        </Col>

  )

  return content
}

export default Show