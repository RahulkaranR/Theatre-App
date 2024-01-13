import React, { useEffect } from 'react'
import { useSendLogoutMutation} from '../auth/authApiSlice'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const [sendLogout, {
        isSuccess,
        isError
    }] = useSendLogoutMutation()

    const logoutClick = async() => {
        await sendLogout()
    }

    useEffect(() => {
        if(isSuccess){
            navigate("/login")
        }
    })



  return (
    <Button variant='danger' onClick={logoutClick}>Logout</Button>
  )
}

export default Profile