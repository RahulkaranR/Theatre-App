import React from 'react'

import { useSelector } from 'react-redux'
import { selectMoviesById } from './moviesApiSlice'
import { useNavigate } from 'react-router-dom'

import { Col, Card, Button } from 'react-bootstrap'

const Movie = ({ movieId }) => {

    const navigate = useNavigate();

    const movie = useSelector(state => selectMoviesById(state, movieId));

    let content;

    if(!movie){
        content = <p>Movie Don't find</p>
    }

    const HandleEdit =  () => navigate(`/dash/Admin/movie/${movieId}`)

    content = (
        <Col md={3} lg={3}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={movie.imageurl} />
                <Card.Body>
                    <Card.Title>{movie.movieName}</Card.Title>
                    <Card.Text>
                    {movie.subtitle}
                    </Card.Text>
                    <Card.Text>
                    {movie.movietype}
                    </Card.Text>
                    <Button variant="secondary" onClick={HandleEdit}>Edit</Button>
                </Card.Body>
            </Card>
        </Col>
    )

  return content
}

export default Movie