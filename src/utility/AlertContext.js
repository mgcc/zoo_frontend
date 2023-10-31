
import { createContext, useReducer } from 'react';

export const AlertContext = createContext(null)
export const AlertDispatchContext = createContext(null);

export function AlertProvider({ children }) {
  const [alerts, alertDispatch] = useReducer(alertReducer, [])


  return (
    <AlertContext.Provider value={alerts}>
      <AlertDispatchContext.Provider value={alertDispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertContext.Provider>
  )
}

function alertReducer(alerts, action) {

  switch(action.type) {
    case 'add': {
      action.newAlert.id = Date.now();
      return [
        ...alerts,
        action.newAlert
      ]
    }
    case 'dismiss': {
      return alerts.filter((a) => {
        return a.id != action.id
      })
    }
    default: {
      throw Error('Unsupported action: ' + action.type)
    }
  }
}