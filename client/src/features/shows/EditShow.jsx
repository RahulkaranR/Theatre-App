import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectShowsById } from './showsApiSlice'
import EditshowForm from "./EditShowForm"

const EditShow = () => {
  const { id } = useParams()

  const show = useSelector(state => selectShowsById(state, id))

  const content = show ? <EditshowForm show={show}  /> : <p>Loading...</p>

  return content
}

export default EditShow