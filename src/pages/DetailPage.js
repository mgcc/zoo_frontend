import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// React Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { AlertProvider } from '../utility/AlertContext';
import { AlertDispatchContext } from '../utility/AlertContext';

import formatDateString from '../utility/FormatDateString';

export default function DetailPage() {

  const navigate = useNavigate();

  let { id } = useParams();

  const [animal, setAnimal] = useState({})
  const [details, setDetails] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [formFields, setFormFields] = useState({ name: '', type: '', conservationStatus: '' });

  const alertDispatch = useContext(AlertDispatchContext);

  // Fetch animal data
  useEffect(() => {
    fetch(`http://localhost:8000/api/animal/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        else {
          navigate('/');
          alertDispatch({
            type: 'add',
            newAlert: {
              variant: 'warning',
              content: `Not found: Animal with id ${id} `
            }
          });
          return null;
        }
      })
      .then(body => {
        if (body) {
          setAnimal(body)
          setFormFields({
            name: body.name,
            type: body.type,
            conservationStatus: body.conservationStatus });
        }
      })

  }, []);

  // Fetch adiitional details from dictionary API
  useEffect(() => {

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${animal.name}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setDetails([{ definition: "No definitions found"}])
          return null;
        }
      })
      .then(body => {
        if (body) {
          setDetails(body[0].meanings[0].definitions)
        }
      })
  }, [animal])

  function handleFormFieldsChange(e) {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value
    })
  }

  function handleEditClick(e) {
    e.preventDefault();

    if (isEditing) {
      // Check if there's new data
      if (formFields.name === animal.name
        && formFields.type === animal.type && formFields.conservationStatus === animal.conservationStatus) {
          setIsEditing(!isEditing);
          return;
      }

      // Save new data
      const newData = formFields;

      console.log("new data: ")
      console.log(newData)

      editAnimal(newData, (success) => {
        if (!success) {
          setFormFields({ name: animal.name, type: animal.type, conservationStatus: animal.conservationStatus })
        }
      });
    }

    setIsEditing(!isEditing);
  }

  function editAnimal(newData, updateSuccessCallback) {
    fetch(`http://localhost:8000/api/animal/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alertDispatch({
            type: 'add',
            newAlert: {
              variant: 'danger',
              content: `Failed to update animal with id: ${id}`
            }
          });
          updateSuccessCallback(false);
          return null;
        }
      })
      .then(body => {
        if (body) {
          alertDispatch({
            type: 'add',
            newAlert: {
              variant: 'success',
              content: `Successfully updated animal with id: ${id}`
            }
          });
          setAnimal(body.animal)
          updateSuccessCallback(true);
        }
      })
  }

  function deleteAnimal() {
    if (!animal) return;

    fetch(`http://localhost:8000/api/animal/${animal.id}`,
    {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alertDispatch({
          type: 'add',
          newAlert: {
            variant: 'danger',
            content: `Failed to delete animal with id: ${id} `
          }
        });
        return null;
      }
    })
    .then(body => {
      if (body) {
        // Show alert, redirect to table page
        alertDispatch({
          type: 'add',
          newAlert: {
            variant: 'success',
            content: `Successfully deleted animal: ${animal.name}`
          }
        });
        navigate('/');
      }
    })
  }


  return (
    <Container>
      <AlertProvider>
        <Row>
          <Col>
            <Button
              variant={isEditing ? 'primary' : 'secondary'}
              onClick={handleEditClick}>
              { isEditing ? 'Save' : 'Edit' }
            </Button> &nbsp;
            <Button
              variant='danger'
              onClick={deleteAnimal}>
              Delete
            </Button>
          </Col>
        </Row><br />
        <Row>
          <Col>
          <ListGroup>
            <ListGroup.Item>
              <span className='label'>Id: </span>
              {id}
            </ListGroup.Item>

            <ListGroup.Item>
              <span className='label'>Name: </span>
              { isEditing ?
                <Form>
                  <Form.Control
                    name='name'
                    type='string'
                    value={formFields.name}
                    onChange={handleFormFieldsChange} />
                </Form> :
                animal.name
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <span className='label'>Type: </span>
              { isEditing ?
                <Form>
                  <Form.Select
                    aria-label='Default select example'
                    name='type'
                    value={formFields.type}
                    onChange={handleFormFieldsChange}
                    >
                    <option value='Mammal'>Mammal</option>
                    <option value='Reptile'>Reptile</option>
                    <option value='Bird'>Bird</option>
                    <option value='Fish'>Fish</option>
                  </Form.Select>
                </Form> :
                animal.type
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <span className='label'>Conservation Status: </span>
              { isEditing ?
                <Form>
                  <Form.Select
                    aria-label='Default select example'
                    name='conservationStatus'
                    value={formFields.conservationStatus}
                    onChange={handleFormFieldsChange}
                    >
                    <option value='Endangered'>Endangered</option>
                    <option value='Vulnerable'>Vulnerable</option>
                    <option value='Least Concern'>Least Concern</option>
                  </Form.Select>
                </Form> :
                animal.conservationStatus
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <span className='label'>Details from <a href='https://dictionaryapi.dev/' target='_blank'>https://dictionaryapi.dev/</a>: </span>
              <ul>
                {
                  details.length === 0 ?
                  <Spinner animation='border' variant='secondary' />
                  :
                  details.map((detail, i) => { return <li key={i}>{detail.definition}</li> })
                }
              </ul>
            </ListGroup.Item>

            <ListGroup.Item>
              <span className='label'>Created at: </span>
              {animal.created_at ? formatDateString(animal.created_at) : ''}
            </ListGroup.Item>

            <ListGroup.Item>
              <span className='label'>Updated at: </span>
              {animal.updated_at ? formatDateString(animal.updated_at) : ''}
            </ListGroup.Item>

          </ListGroup>
          </Col>
        </Row>
      </AlertProvider>
    </Container>
  )
}