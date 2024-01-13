import React from 'react'

import { useGetShowsQuery } from './showsApiSlice'
import { Container, Row } from 'react-bootstrap';
import Show from './Show';




const ShowsLists = () => {

    const {
        data: Shows,
        isSuccess,
        isLoading,
        isError,
        error
    } = useGetShowsQuery()


    let content;

    if(isLoading) content = <p>Loading...</p>

    if(isError) content = <p>Some thing goes Wrong...</p>

    if(isSuccess){
        const { ids } = Shows
        const ShowsCollection = ids?.length
        ? ids.map(shows => <Show key={shows} showsId={shows} />)
        : null

        content= ([ShowsCollection])
    }

  return (
    <Container>
        <Row>
            {content}
        </Row>
    </Container>
  )
}

export default ShowsLists