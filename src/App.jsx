import { useState } from 'react'
import './App.css'
import Header from './Header'
import Tasks from './Tasks'
import Contex from './Contex'

function App() {

  return (
    <Contex>
      <Header userName='Shayan' />
      <Tasks/>
    </Contex>
  )
}

export default App
