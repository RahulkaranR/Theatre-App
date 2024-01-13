import React from 'react'
import { useGetUsersQuery } from "./usersApiSlice"
import User from './User';

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const Userslists = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content;

  if(isLoading) content = <p>Loading...</p>


  if(isError) {
    content = <p>there is some error</p>
  }

  if(isSuccess){
    const { ids } = users
    console.log(ids);
    const tableContent = ids?.length 
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null 

    content= ([tableContent])
  }

  return (
    <Container>
    <Table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Edit</th>
        </tr>
      </thead>
      {content}
    </Table>
    </Container>
      
    
  )
}

export default Userslists