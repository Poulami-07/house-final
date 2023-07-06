import React,{useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {doc, updateDoc } from 'firebase/firestore';
import Layout from '../components/layout/Layout'
import {BsEyeFill} from 'react-icons/bs'
import OAuth from '../components/OAuth';
import "../styles/signin.css"

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:'',
    
    password:''
  })
  const {name, email, password} = formData
  const navigate= useNavigate();
  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //loginHandler
  const loginHandler =async (e) => {
    e.preventDefault()
    try{
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if(userCredential.user){
        toast.success('Login Success')
        navigate('/');
      }
    } catch (error) {
      console.log(error)
      toast.error("Invalid email or password")
    }
  }
  return (
    <Layout>
        <div className='d-flex align-items-center justify-content-center w-100 mb-4'>
        <form className='bg-light p-2' onSubmit={loginHandler}>
          <h4 className='bg-dark p-2 mt-2 text-light text-center'> Sign In</h4>
      
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input 
        type="email" 

        value={email}
        onChange={onChange}
        className="form-control"
        id="email"
        aria-describedby="emailHelp" />
       
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input 
        type={showPassword ? 'text':"password"}
        value={password}
        onChange={onChange}
         className="form-control"
         id="password" />
         <span>
          show password
          <BsEyeFill 
         className='text-danger bs-2'
         style={{cursor: "pointer", mixBlendMode:'multiply'}} 
         onClick={() => 
          {setShowPassword((prevState) => !prevState);
         }}/>
        </span> <Link to="/forgot-password">forgot password</Link>
      </div>
      
      <button type="submit" className="btn btn-primary">
        Sign In
      </button>
    
  
      <OAuth />
         <div className='mt-2'>

         <span>New User</span>
        <Link to="/signup">Sign up</Link>
         </div>
     
    </form>
        </div>
    </Layout>
  )
}

export default Signin;