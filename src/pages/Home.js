import { useState, useEffect } from 'react';

// React Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Custom components
import AnimalTableFilters from '../components/AnimalTableFilters';
import AnimalTable from '../components/AnimalTable';

export default function Home() {

  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    fetchAnimalData()
  }, [])

  function fetchAnimalData(url = 'http://localhost:8000/api/animal') {
    fetch(url)
      .then(response => response.json())
      .then(body => {
        // straight array
        setAnimalData(body);
      })
  }

function fetchAnimalDataWithFilters(filters) {
    let url = 'http://localhost:8000/api/animal?';

    if (filters.name) {
      url += `&name=${filters.name}`;
    }
    if (filters.type) {
      url += `&type=${filters.type}`;
    }
    if (filters.conservationStatus) {
      url += `&conservationStatus=${filters.conservationStatus}`;
    }

    fetchAnimalData(url);
  }

  return (
    <Container>
      <AnimalTableFilters
        fetchAnimalData={fetchAnimalDataWithFilters} />
      <br />
      <Row>
        <Col>
          <AnimalTable
            animalData={animalData} />
        </Col>
      </Row>
    </Container>
  )
}