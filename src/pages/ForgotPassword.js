import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import {Link,useNavigate} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from "react-toastify";
import "../styles/forgotpassword.css"

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try{
        const auth = getAuth()
        await sendPasswordResetEmail(auth,email)
        toast.success("Email was sent");
        navigate("/signin");
    }catch(error){
      toast.error('Something went wrong')
    }
  }
  return (
    <Layout>
      <div className='row forgot-password-container'>
        <div className='col-md-7 forgot-password-col1'>
          <img src='./assets/forgot.png' alt='forgot-img' />
        </div>
      </div>
      <div className='col-md-5 forgot-password-col2'>
      <h1>Reset your password</h1>
      <form onSubmit={onSubmitHandler}>
      <div className="container mb-3">
        <label
         htmlFor="exampleInputEmail1"
          className="form-label">Email address</label>
        <input
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         className="form-control"
         id="exampleInputEmail1"
         aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className='d-flex justify-content-between'>
      <button type="submit" className="btn btn-primary">
      Reset</button>
      
      <Link to="/signin">
        <button className='signin'>
          Sign In
        </button>
      </Link>
      </div>
      </form>
    </div>
    </Layout>
  )
}

export default ForgotPassword