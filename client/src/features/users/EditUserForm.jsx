import {useState, useEffect} from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


const USER_REGEX = /^[0-9A-Za-z]{6,16}$/
const PWD_REGEX = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/

const EditUserForm = ({user}) => {
    const naviagete = useNavigate();

    const [deleteUser, {
      isLoading: delLoadin,
      isSuccess: delSuccess,
      isError: delError
    }] = useDeleteUserMutation()

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [email, setEmail] = useState(user.email)
    const [sex, setSex] = useState(user.sex)

    
    const date = user.dateofbirth.slice(0,10)

    const [dateofbirth, setDateofBirth] = useState(date);


    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if(isSuccess || delSuccess){
            setUsername("")
            setPassword("")
            setFirstname("")
            setLastname("")
            setEmail("")
            setSex("")
            setDateofBirth("")
            naviagete("/dash/Admin/user")
        }
    },[isSuccess, naviagete, delSuccess])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onfirstnameChanged = e => setFirstname(e.target.value)
    const onlastnameChanged = e => setLastname(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onDateofBirthChanged = e => setDateofBirth(e.target.value)

    let canSave;
    if(password){
        canSave = [ firstname, lastname, email, dateofbirth, sex, validUsername, validPassword].every(Boolean) && !isLoading
    }else {
        canSave = [ firstname, lastname, email, dateofbirth, sex, validUsername].every(Boolean) && !isLoading
    }

    const onSaveEditedUser = async (e) => {
      e.preventDefault()
      if(canSave){
        const value = await updateUser({firstname, lastname, email, dateofbirth, sex, username, password, id: user.id});
        console.log(value, isSuccess, isLoading, isError);
      }
    }
    const genderChange = e => {
      console.log(canSave);
      const value = e.target.value;
      setSex(value);
    }

    const deleteButton = async () => {
      await deleteUser({id: user.id})
    }


  let content =  (
    <>
    <p>{error?.data?.message}</p>
    <Form onSubmit={onSaveEditedUser}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            value={firstname}
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
            value={lastname}
            onChange={onlastnameChanged}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Username[3-20 letters]</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              value={username}
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
            onChange={onPasswordChanged}
             
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="Email" 
            placeholder="Email" 
            required 
            value={email}
            onChange={onEmailChanged}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>Sex</Form.Label>
          <Form.Select onChange={genderChange} >
            <option>{sex}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" >
          <Form.Label>dateofbirth</Form.Label>
          <div>
          <input 
          type='date'
          value={dateofbirth}
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
    <button onClick={deleteButton} >Delete</button>
    </>

    
  )
  return content
}

export default EditUserForm