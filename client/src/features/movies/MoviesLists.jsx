import React from 'react'
import { useGetMoviesQuery } from './moviesApiSlice';
import Container from 'react-bootstrap/esm/Container';
import { selectAllMovies } from './moviesApiSlice';
import { Row } from 'react-bootstrap';
import Movie from './Movie';
import { useSelector } from 'react-redux';




const MoviesLists = () => {
  console.log(useSelector(selectAllMovies));
  const { 
    data: Movies,
    isLoading,
    isSuccess,
    isError,
    error
  } =  useGetMoviesQuery()

  let content;

  if(isLoading) content = <p>Loading...</p>

  if(isError) {
    content = <p>there is some error</p>
  }

  if(isSuccess){
    const { ids } = Movies
    const MoviesCollections = ids?.length 
      ? ids.map(movieId => <Movie key={movieId} movieId={movieId} />)
      : null 

    content= ([MoviesCollections])
  }

  return (
    <Container>
      <Row>
        {content}
      </Row>
    </Container>
  )
}

export default MoviesLists