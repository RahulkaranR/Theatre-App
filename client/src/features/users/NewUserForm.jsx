import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewUserMutation } from './usersApiSlice'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


const USER_REGEX = /^[0-9A-Za-z]{6,16}$/
const PWD_REGEX = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/


const NewUserForm = () => {

    const [addNewUser , {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()
    const gender = ["male", "femail"] 

    const naviagete = useNavigate()

    const [username, setUsername] = useState("")
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [sex, setSex] = useState("")
    const [dateofbirth, setDateofBirth] = useState("")

    useEffect(() => {
      setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
      setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
      if(isSuccess){
        setUsername("")
        setPassword("")
        setFirstname("")
        setLastname("")
        setEmail("")
        setSex("")
        setDateofBirth("")
        naviagete("/login")
      }
    })

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onfirstnameChanged = e => setFirstname(e.target.value)
    const onlastnameChanged = e => setLastname(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onDateofBirthChanged = e => setDateofBirth(e.target.value)
    
    const canSave = [ firstname, lastname, email, dateofbirth, sex, validUsername, validPassword].every(Boolean) && !isLoading
    
    const onSaveUserClicked = async (e) => {
      e.preventDefault()
      console.log(canSave);
      if(canSave) {
        await addNewUser({ username, firstname, lastname, email, dateofbirth, sex, password })
        console.log({ username, firstname, lastname, email, dateofbirth, sex, password });
      }
    }
    
    const genderChange = e => {
      console.log(canSave);
      const value = e.target.value;
      setSex(value);
    } 
  


  return (
    <>
    <p>{error?.data?.message}</p>
    <h2 className='text-center'>Register</h2>
    <Form onSubmit={onSaveUserClicked}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            onChange={onfirstnameChanged}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            onChange={onlastnameChanged}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Username[3-20 letters]</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={onUsernameChanged}
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" >
          <Form.Label>Password[4-12 chars incl. !@#$%]</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            required
            onChange={onPasswordChanged}
             
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="Email" 
            placeholder="Email" 
            required 
            onChange={onEmailChanged}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Sex</Form.Label>
          <Form.Select onChange={genderChange}>
            <option>Please select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>dateofbirth</Form.Label>
          <div>
          <input 
          type='date'
          required
          onChange={onDateofBirthChanged}
          />
          </div>
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
  );
}

export default NewUserForm