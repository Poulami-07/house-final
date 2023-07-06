import React from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from '../components/Slider.js'
import Layout from '../components/layout/Layout'
import "../styles/homepage.css";



const HomePage = () => {
  const navigate = useNavigate();
  const img1 = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  const img2 = "https://plus.unsplash.com/premium_photo-1661754928502-e0d474818e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGhvbWUlMjBzYWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"

  return (
    <Layout>
      <div className='container mt-3 bg-image'>
        {/* <Slider /> */}
        <div className='home-cat row d-flex align-items-center justify-content-center'>
          <h1>Category</h1>
          <div className='col-md-5'>
            <div className='Imagecontainer'>
              <img src={img1} alt='Rent' style={{ width: "100%" }} />
              <button className='btn'
                onClick={() => navigate('/category/rent')}>For Rent</button>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='Imagecontainer'>
              <img src={img2} alt='Rent' style={{ width: "100%" }} />
              <button className='btn' onClick={() => navigate('/category/sale')}>To Sale</button>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default HomePage