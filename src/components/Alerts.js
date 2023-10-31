import { useContext } from 'react';
import { AlertContext, AlertDispatchContext } from '../utility/AlertContext';

import CustomAlert from './CustomAlert';

const style = {
  position: 'fixed',
  top: 30,
  left: '70%',
  padding: '10px',
  zIndex: 1000
}

export default function Alerts() {

  const alerts = useContext(AlertContext);

  // structure of alerts:
  // [{ id: number, variant: string, content: string }]

  return (
    <div style={style}>
      {
        alerts.map(a => {
          return (
            <CustomAlert
              key={a.id}
              id={a.id}
              variant={a.variant}
              content={a.content} />
          )
        })
      }
    </div>
  )
}