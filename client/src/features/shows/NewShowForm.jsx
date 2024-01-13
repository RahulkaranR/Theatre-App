import React from 'react'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewShowMutation } from "./showsApiSlice";
import { useSelector } from 'react-redux';
import { selectAllMovies } from "../movies/moviesApiSlice" 


import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const NewShowForm = () => {
    const navigate = useNavigate()

    const [dateforshow, setDateforshow] = useState("");
    const [batch, setBatch] = useState(1);
    const [movie, setMovie] = useState("");
    const [price, setPrice] = useState(100);

    const movies = useSelector(selectAllMovies);

    const movieOptions = movies.map((item) => {
        return <option key={item._id} value={item._id}>{item.movieName}</option>
    })

    
    
    const [addNewShow, {
        isLoading,
        isSuccess,
        isError
        }] = useAddNewShowMutation()
    let canSave = [dateforshow, batch, movie, price].every(Boolean) 

    const onMovieChange = e => setMovie(e.target.value);
    const onBatchChange = e => setBatch(e.target.value);
    const onDateChange = e => setDateforshow(e.target.value);
    const onPriceChange = e => setPrice(e.target.value);

    useEffect(() => {
        if(isSuccess){
            console.log("this is running");
            setMovie("")
            setBatch(0)
            setDateforshow("")
            navigate("/dash/Admin/show")
        } 
    }, [isSuccess])

    const saveShow = async (e) => {
        e.preventDefault()
        if(canSave){
            addNewShow({movie, batch, dateforshow, price});
        }
    }
    let errorcontent ;
    if(isError){
        errorcontent = "some thing goes wrong"
    }




  return (
    <>
        {errorcontent}
        <Form onSubmit={saveShow}>
        <Row className="mb-3">
            <Col md="6">
                <Form.Group md="4" controlId="validationCustom01">
                <Form.Label>Select Movie</Form.Label>
                <Form.Select onChange={onMovieChange}>
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

export default NewShowForm