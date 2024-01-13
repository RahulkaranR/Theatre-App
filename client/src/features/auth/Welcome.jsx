import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllMovies } from '../movies/moviesApiSlice'
import { selectAllShows } from '../shows/showsApiSlice'

const Welcome = () => {

  

  const Movies = useSelector(selectAllMovies)
  const Shows = useSelector(selectAllShows)

  console.log(Movies);
  console.log(Shows);

  const movieslist = Movies.map((item) => {
    return <p>{item.movieName}</p>
  })
  const ShowsList = Shows.map((item) => {
    return <p>{item.price}</p>
  })


  return (
    <div>
      <div>
        {movieslist}
      </div>
      <div>
        {ShowsList}
      </div>
    </div>
  )
}

export default Welcome