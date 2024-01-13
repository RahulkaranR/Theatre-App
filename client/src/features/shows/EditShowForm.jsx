import React from 'react'
import { useUpdateShowMutation } from "./showsApiSlice"
import { selectAllMovies } from '../movies/moviesApiSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';

const EditShowForm = ({show}) => {

  const navigate = useNavigate()

  const [updateShow, {
    isSuccess,
    isLoading,
    isError
  }] = useUpdateShowMutation()

  const datetoshow = show.dateforshow.slice(0,10)
  const [dateforshow, setDateforshow] = useState(datetoshow);
  const [batch, setBatch] = useState(show.batch);
  const [movie, setMovie] = useState(show.movie);
  const [price, setPrice] = useState(show.price);

  
  const movies = useSelector(selectAllMovies);

    const movieOptions = movies.map((item) => {
        return <option key={item._id} value={item._id}>{item.movieName}</option>
    })

  const onMovieChange = e => setMovie(e.target.value);
  const onBatchChange = e => setBatch(e.target.value);
  const onDateChange = e => setDateforshow(e.target.value);
  const onPriceChange = e => setPrice(e.target.value);

  const canSave = [movie, batch, dateforshow, price].every(Boolean)

  useEffect(() => {
    if(isSuccess){
        console.log("this is running");
        setMovie("")
        setBatch(0)
        setDateforshow("")
        navigate("/dash/Admin/show")
    } 
}, [isSuccess])

const saveEditShow = (e) => {
  e.preventDefault()
  if(canSave){
    updateShow({movie, batch, dateforshow, price, id: show.id})
  }
}



  return (
    <>
        <Form onSubmit={saveEditShow}>
        <Row className="mb-3">
            <Col md="6">
                <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Select Movie</Form.Label>
                <Form.Select onChange={onMovieChange} value={movie}>
                    <option> Select movie</option>
                        {movieOptions}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md="6">
            <Form.Group>
                <Form.Label>
                    Set Price of Ticket
                </Form.Label>
                <Form.Control 
                    placeholder='100'
                    value={price}
                    type='Number'
                    onChange={onPriceChange}
                />
                </Form.Group>
            </Col>
            <Col md="6">
                <Form.Group>
                    <Form.Label>Show Date</Form.Label>
                    <div>
                    <input 
                    value={dateforshow}
                    onChange={onDateChange}
                    type='date'
                    required
                    />
                    </div>
                </Form.Group>
            </Col>
            <Col md="6">
                <Form.Group md="4" >
                <Form.Label>Show Time</Form.Label>
                <Form.Select 
                    onChange={onBatchChange}
                    value={batch}
                >
                    <option> Select Show Time</option>
                    <option value={1}>5 AM</option>
                    <option value={2}>9 AM</option>
                    <option value={3}>3 PM</option>
                    <option value={4}>7 PM</option>
                </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        <button 
            type="submit"
            disabled={!canSave}
        >
            Submit form
        </button>
        </Form>
    </>
  )
}

export default EditShowForm