import React from 'react'
import { useAppState } from '../../app/App';

function Educateur() {

  const{state}=useAppState();
  return (
    <div>Educateur  {state.user.username}</div>
  )
}

export default Educateur