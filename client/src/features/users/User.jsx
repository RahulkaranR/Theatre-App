import React from 'react'
//import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { useNavigate } from "react-router-dom";


const User = ({userId}) => {
    const navigate = useNavigate()

    const user = useSelector(state => selectUserById(state, userId))
    let content;

    if(!user){
      content = <p>User Dosent find </p>
    }

    const HandleEdit = () => navigate(`/dash/Admin/user/${userId}`)

    content = (
      <tbody className=''>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.roles}</td>
        <td>
          <button variant='warning' onClick={() => HandleEdit()}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tbody>
    )


  return content
}

export default User