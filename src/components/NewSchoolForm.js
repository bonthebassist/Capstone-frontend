import React, { useState, useContext } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CirclePicker } from 'react-color';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { Container } from 'react-bootstrap';

export default function NewSchoolForm() {

  //Context
  const { auth } = useContext(AuthContext)

  //States
  const [School, setSchool] = useState({ schoolName: '' })
  const [UsefulLinks, setUsefulLinks] = useState([])
  const [SchoolAdminDetails, setSchoolAdminDetails] = useState({
    "title": null,
    "email": null
  })
  const [SchoolColor, setSchoolColor] = useState('')
  const [success, setSuccess] = useState(false);

  //Request body for adding the school
  const reqBody =
  {
    "tutor_id": auth.user_id,
    "schoolName": School.schoolName,
    "schoolAdmin": {
      "contactName": SchoolAdminDetails.title,
      "contactEmail": SchoolAdminDetails.email
    },
    "usefulLinks": {
      "linkTitle": UsefulLinks.linkTitle,
      "linkURL": UsefulLinks.linkURL
    },
    "schoolColor": SchoolColor
  }


  //Axios headers configuration
  const config = {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': auth.token
    }
  };

  // url for Axios post
  const url = `http://localhost:4000/post/school`;

  //Post new school to DB
  const handleClick = (e) => {
    e.preventDefault()
    axios.post(url, reqBody, config)
      .then(response => {
        console.log(response.data)
        setSuccess(true);
      }).catch(error => {
        console.log(error)
        alert(error)
      })
  }

  //for setting color picker state
  function handleChange(color, event) {
    setSchoolColor(color.hex)
  }


  return (
    <Container className="form-container">
      {!auth.user_id ? (
        <h2>Please <NavLink to="/Login">Login</NavLink></h2>
      ) : (
        <div className='content-div'>
          {success ? (
            <Navigate to="/Schools" />
          ) : (
            <>
              <h2>Add a school</h2>
              <Form className='form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>School Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg. Hills School"
                    value={School.schoolName}
                    onChange={e => setSchool({ schoolName: e.target.value })}
                    required
                    autoFocus />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Contacts</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg. Music Secretary"
                    value={SchoolAdminDetails.title}
                    onChange={e => setSchoolAdminDetails({ ...SchoolAdminDetails, title: e.target.value })}
                  />
                  <Form.Control
                    type="email"
                    placeholder="contact email for above"
                    value={SchoolAdminDetails.email}
                    onChange={e => setSchoolAdminDetails({ ...SchoolAdminDetails, email: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Useful Links</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg. Hills School Timetable"
                    value={UsefulLinks.linkTitle}
                    onChange={e => setUsefulLinks({ linkTitle: e.target.value, linkURL: null })}
                  />
                  <Form.Control
                    type="text"
                    placeholder="URL for link above"
                    value={UsefulLinks.linkURL}
                    onChange={e => setUsefulLinks({ ...UsefulLinks, linkURL: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Pick a colour for your school</Form.Label>
                  <CirclePicker
                    onChange={handleChange} />
                </Form.Group>
                <Button variant="dark" className="button" type="submit" onClick={handleClick}>
                  Submit
                </Button>
              </Form>
            </>
          )
          }
        </div>
      )
      }
    </Container>
  )
}

