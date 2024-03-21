import React from 'react'
import Navbar from '../../layouts/frontend/Navbar'
import Sliders from './Sliders'
import Featured from './collections/Featured'
import Popular from './collections/Popular'
import Footer from './Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Sliders/>
      <Featured/>
      <Popular/>
      <Footer/>
    </div>
  )
}

export default Home