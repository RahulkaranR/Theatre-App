import React from 'react'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewMovieMutation } from './moviesApiSlice'

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


const NewMovieForm = () => {
    const navigate = useNavigate()

    const [ addNewMovie , {
        isLoading,
        isSuccess, 
        isError,
        error
    }] = useAddNewMovieMutation();

    const movietypes = ["action", "adventure", "comedy", "drama", "fantasy", "horror", "musicals", "mystery", "romance", "science fiction", "sports", "thriller"]
    
    
    const [movieName, setMovieName] = useState("")
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [imageurl, setImageurl] = useState("")
    const [rating, setRating] = useState(7.5)
    const [movietype, setMovietype] = useState([])
    const [language, setLanguage] = useState("")

    // useEffect(() => {
    //     setMovieName("");
    //     setTitle("");
    //     setSubtitle("");
    //     setImageurl("");
    //     setRating(7.5);
    //     setMovietype([]);
    //     setLanguage("");
    //     //navigate("/dash/Admin/movie");

    // })

    const onMoviNameChange = e => setMovieName(e.target.value) 
    const onTitleChange = e => setTitle(e.target.value) 
    const onSubtitleChange = e => setSubtitle(e.target.value) 
    const onImageurlChange = e => setImageurl(e.target.value) 
    const onRatingChange = e => setRating(e.target.value) 
    const onLanguageChange = e => setLanguage(e.target.value) 
    
    
    const onMovietypeChange = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setMovietype(values)
    }
    
    
    
    
    const canSave = [movieName, title, subtitle, imageurl, rating, movietype, language].every(Boolean) && !isLoading
    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if(canSave){
            console.log("canSave working");
            const result = await addNewMovie({movieName, title, subtitle, imageurl, rating, movietype, language})
            console.log("this also working that own", result);
            setMovieName("");
            setTitle("");
            setSubtitle("");
            setImageurl("");
            setRating(7.5);
            setMovietype([]);
            setLanguage("");
            navigate("/dash/Admin/movie");
        }

    }
    const movietypeOption = movietypes.map( (items, index) => {
            return <option key={index} value={items}>{items}</option>
        })
    

  return (
    <>
        <p>{error?.data?.message}</p>
        <Form onSubmit={onSaveUserClicked}>
        <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>MovieName</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Movie Name"
                onChange={onMoviNameChange}
            />
            </Form.Group>
            <Form.Group as={Col} md="4" >
            <Form.Label>Title</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Title"
                onChange={onTitleChange}
            />
            </Form.Group>
            <Form.Group as={Col} md="4" >
            <Form.Label>SubTitle</Form.Label>
            <InputGroup hasValidation>
                <Form.Control
                type="text"
                as="textarea"
                placeholder="Subtitle"
                aria-describedby="inputGroupPrepend"
                required
                onChange={onSubtitleChange}
                />
            </InputGroup>
            </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="4" >
            <Form.Label>Imageurl</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="text"
                required
                onChange={onImageurlChange}
                
            />
            </Form.Group>
            <Form.Group as={Col} md="4">
            <Form.Label>Rating</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Rating" 
                value={rating}
                required 
                onChange={onRatingChange}
            />
            </Form.Group>
            <Form.Group as={Col} md="4" >
            <Form.Label>Movietype</Form.Label>
            <Form.Select onChange={onMovietypeChange} multiple={true}>
                <option>MovieType</option>
                {movietypeOption}
            </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" >
            <Form.Label>Language</Form.Label>
            <Form.Select onChange={onLanguageChange}>
                <option> Select Langauge</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Hindi">Hindi</option>
            </Form.Select>
            </Form.Group>
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

export default NewMovieForm