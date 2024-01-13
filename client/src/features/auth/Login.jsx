import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import {Form , Container, Row, Col}  from 'react-bootstrap';
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { setCredentials } from './authSlice';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState('')

  const [login, {
    isLoading
  }] = useLoginMutation()

  const onUsernameChange = (e) => setUsername(e.target.value); 
  const onPasswordChange = (e) => setPassword(e.target.value); 

  useEffect(() => {
    setErrMsg("")
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const { accessToken } = await login({username, password}).unwrap();
      dispatch(setCredentials({accessToken}))
      //console.log(useSelector(selectCurrentToken));
      console.log(accessToken);
      setUsername("")
      setPassword("")
      navigate("/dash/Admin/movie")
      
    } catch (err) {
      if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg(err.data?.message);
        }
    }
    }
    
  

  

  let content = (
    
    <>
     <p>{errMsg}</p>
     <Container>
      <h3 className='text-center'>Login</h3>
      
      <Form onSubmit={handleSubmit} className='d-flex justify-content-center'>
      <Row>
        <Col>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Username"
            onChange={onUsernameChange}
            value={username}  
          />
        </Form.Group>
        </Col>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter Password"
            onChange={onPasswordChange}
            value={password}
           />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </Row>
      </Form>
      
      </Container>
    </>
  )

  return content
}


export default Login