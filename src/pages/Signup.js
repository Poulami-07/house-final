import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Layout from '../components/layout/Layout';
import { toast } from 'react-toastify';
import {BsEyeFill} from 'react-icons/bs';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config';
import {doc, setDoc, serverTimestamp } from 'firebase/firestore';
import OAuth from '../components/OAuth';
import "../styles/signup.css"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:'',
    name:'',
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

  const onSubmitHndler =async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth,email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser,{displayName:name})
      navigate('/')
      toast.success("Signup Successfully !")
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong")
    }
  }
  return (
    <Layout>
      <div className='row signup-container'>
        <div className='col-md-6 signup-container-col-2'>
        <form  onSubmit={onSubmitHndler}>
          <h3 className='mt-2 text-center'> Sign up</h3>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Enter Name
          </label>
        <input 
        type="text"
        value={name}
        className="form-control"
         id="name"
         onChange={onChange}
         aria-describedby="nameHelp" />
      </div>

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
        </span>
      </div>
      
      <button type="submit" className="btn btn-primary">
        Sign up
      </button>
      <OAuth />
      <span>ALready User</span>
      <Link to="/signin">Login</Link>
    </form>
        </div>
        </div>
    </Layout>
  )
}

export default Signup;