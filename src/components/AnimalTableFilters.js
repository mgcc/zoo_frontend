import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AnimalTableFilters({ fetchAnimalData }) {

  const [fields, setFields] = useState({ name: '', type: '', conservationStatus: ''})
  const [isFormEmpty, setIsFormEmpty] = useState(true);


  function handleFieldChange(e) {
    setIsFormEmpty(false);
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    });
  }

  function filterAnimals() {
    fetchAnimalData(fields)
  }

  function clearFilters() {
    setIsFormEmpty(true);
    setFields({ name: '', type: '', conservationStatus: '' });
    fetchAnimalData({ name: '', type: '', conservationStatus: '' });
  }

  return(
    <>
      <br />
      <Row>
        <Col xs={1}>Filters: </Col>
        <Col>
          <Form.Control
            aria-label='name'
            name='name'
            type='string'
            placeholder='Name'
            value={fields.name}
            onChange={handleFieldChange} />
        </Col>

        <Col>
          <Form.Select
            aria-label='type'
            name='type'
            value={fields.type}
            onChange={handleFieldChange}>
            <option value=''>Any Type</option>
            <option value='Mammal'>Mammal</option>
            <option value='Reptile'>Reptile</option>
            <option value='Bird'>Bird</option>
            <option value='Fish'>Fish</option>
          </Form.Select>
        </Col>

        <Col>
          <Form.Select
            aria-label='conservationStatus'
            name='conservationStatus'
            value={fields.conservationStatus}
            onChange={handleFieldChange}
            >
            <option value=''>Any Status</option>
            <option value='Endangered'>Endangered</option>
            <option value='Vulnerable'>Vulnerable</option>
            <option value='Least Concern'>Least Concern</option>
          </Form.Select>
        </Col>

      </Row>

      <br />

      <Row>
        <Col>
          <Button
            variant='primary'
            disabled={isFormEmpty ? true : false}
            onClick={filterAnimals}>
            Filter
          </Button> &nbsp;

          <Button variant={isFormEmpty ? 'secondary' : 'primary'} disabled={isFormEmpty ? true : false} onClick={() => {clearFilters()}}>
            Clear filters
          </Button>
        </Col>
      </Row>
    </>
  )
}