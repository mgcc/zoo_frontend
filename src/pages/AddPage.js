import { useState, useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { AlertDispatchContext } from '../utility/AlertContext';

export default function AddPage() {

  const [fields, setFields] = useState({ name: '', type: '', conservationStatus: ''})

  const alertDispatch = useContext(AlertDispatchContext);

  function handleFieldChange(e) {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = fields;

    fetch('http://localhost:8000/api/animal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          // Clear form, update table contents
          setFields({ name: '', type: '', conservationStatus: '' });
          alertDispatch({
            type: 'add',
            newAlert: {
              variant: 'success',
              content: `New Animal saved: ${payload.name}`
            }
          })
        }
        else {
          // Show error
          alertDispatch({
            type: 'add',
            newAlert: {
              variant: 'danger',
              content: `Failed to save animal: ${fields.name}`
            }
          });
        }
      })
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label><span className='label'>Name: </span></Form.Label>
              <Form.Control
                name='name'
                type='string'
                placeholder='Name of animal'
                required={true}
                value={fields.name}
                onChange={handleFieldChange} /><br/>

              <Form.Label><span className='label'>Type: </span></Form.Label>
              <Form.Select
                aria-label='Default select example'
                name='type'
                value={fields.type}
                onChange={handleFieldChange}
                >
                <option>--Select animal type--</option>
                <option value='Mammal'>Mammal</option>
                <option value='Reptile'>Reptile</option>
                <option value='Bird'>Bird</option>
                <option value='Fish'>Fish</option>
              </Form.Select><br/>

              <Form.Label><span className='label'>Conservation Status: </span></Form.Label>
              <Form.Select
                aria-label='Default select example'
                name='conservationStatus'
                value={fields.conservationStatus}
                onChange={handleFieldChange}
                >
                <option>--Select conservation status--</option>
                <option value='Endangered'>Endangered</option>
                <option value='Vulnerable'>Vulnerable</option>
                <option value='Least Concern'>Least Concern</option>
              </Form.Select><br/>
            </Form.Group>

            <Button variant='primary' type='submit' onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}