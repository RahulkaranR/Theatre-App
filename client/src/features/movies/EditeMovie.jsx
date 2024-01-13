import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMoviesById } from './moviesApiSlice'
import EditeMovieForm from './EditeMovieForm'


const EditeMovie = () => {
    const { id } = useParams()

    const movie = useSelector(state => selectMoviesById(state, id))
    console.log(movie, id);

    const content = movie ? <EditeMovieForm movie={movie} /> : <p>Loading...</p>


  return content
}

export default EditeMovie