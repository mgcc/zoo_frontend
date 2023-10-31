
import { useState } from 'react';

import Badge from 'react-bootstrap/Badge';

export default function SortingIcon({ rank, handleClick }) {

  const [sortState, setSortState] = useState('inactive'); // 'inactive', 'asc', 'desc'

  function handleSortToggle() {
    handleClick()
    if (sortState === 'inactive') {
      setSortState('asc');
    } else if (sortState === 'asc') {
      setSortState('desc')
    } else {
      setSortState('inactive')
    }
  }

  return (
    <span className='arrow' onClick={handleSortToggle}>
      {
        sortState === 'inactive' ?
        '\u2191\u2193' :
        (sortState === 'asc' ?
        <Badge>{`\u2191`} {rank}</Badge>
         : <Badge>{`\u2193`} {rank}</Badge>)
      }
    </span>
  )
}