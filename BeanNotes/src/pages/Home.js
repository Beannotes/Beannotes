import React from 'react'
import BrewList from '../components/Brews'

const Home = () => {
  return (
    <div>
      <h1 className='text-center text-3xl font-bold py-8'>Home Page</h1>
      <BrewList />
    </div>
  )
}

export default Home