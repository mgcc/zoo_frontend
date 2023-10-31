 import { useContext, useEffect } from 'react';

 import { AlertDispatchContext } from '../utility/AlertContext';
import Alert from 'react-bootstrap/Alert';


export default function CustomAlert({ id, variant, content }) {

  const alertDispatch = useContext(AlertDispatchContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      alertDispatch({
        type: 'dismiss',
        id: id });
    }, 4000)
  })

  return (
    <Alert
      variant={variant}
      onClose={() =>
        {
          alertDispatch({
            type: 'dismiss',
            id: id })
        }}
      dismissible>
      {content}
    </Alert>
  );
}