
import { useState, useEffect } from 'react';

import Table from 'react-bootstrap/Table';

import SortingIcon from './SortingIcon';
import Sort from '../utility/Sort';

export default function AnimalTable({ animalData }) {

  const [sortRules, setSortRules] = useState([]);
  // Structure of sortRules:
  // [{ field: string, sort: string }, ...]
  //   - field can be name|type|conservationStatus
  //   - sort can be asc|desc

  const sortedAnimals = Sort([...animalData], sortRules);

  function changeSorting(field) {
    const ruleIndex = sortRules.findIndex(sr => sr.field === field);

    let newSortRules = [...sortRules];


    if (ruleIndex !== -1) {
      if (newSortRules[ruleIndex].sort === 'asc') {
        // Change existing 'asc' to 'desc'
        newSortRules[ruleIndex].sort = 'desc';
      } else {
        // Remove existing 'desc' rule
        newSortRules = newSortRules.filter(sr => sr.field !== field);
      }

    } else {
      // Rule doesn't exist yet, add it to the list as 'asc'
      newSortRules.push({ field, sort: 'asc' });
    }

    setSortRules(newSortRules)
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name
            <SortingIcon
              rank={sortRules.findIndex(sr => sr.field === 'name') + 1}
              handleClick={() => {changeSorting('name')}} />
          </th>
          <th>Type
            <SortingIcon
              rank={sortRules.findIndex(sr => sr.field === 'type') + 1}
              handleClick={() => {changeSorting('type')}} />
          </th>
          <th>
            Conservation Status
            <SortingIcon
              rank={sortRules.findIndex(sr => sr.field === 'conservationStatus') + 1}
              handleClick={() => {changeSorting('conservationStatus')}} />
          </th>
        </tr>
      </thead>
      <tbody>
        {
          sortedAnimals.map((animal, index) => {
            return (
              <tr key={animal.id}>
                <td>{index + 1}</td>
                <td><a href={`/animal/${animal.id}`}>{animal.name}</a></td>
                <td>{animal.type}</td>
                <td>{animal.conservationStatus}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}