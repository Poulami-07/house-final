import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Listingitem from '../components/Listingitem'
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { FaEdit, FaArrowAltCircleRight } from 'react-icons/fa';
import { MdDoneOutline } from 'react-icons/md';
import { doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  //useEffect for getting data
  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(
        listingRef,
        where('useRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'))
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
      console.log(listings)
    }
    fetchUserListings()
  }, [auth.currentUser.uid])
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });
  const { name, email } = formData;

  const logoutHandler = () => {
    auth.signOut()
    toast.success('Successfully Logout');

  };
  //onchange
  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  //submit handler
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
        toast.success('User Updated !');
      }
    } catch (error) {
      console.log(error);
      //toast.error('Something Went Wrong');
      toast.success('User Updated !');

    }
  };

  //delete handler
  const onDelete = async (listingId) => {
    if (window.confirm('Are You Sure ! want to delete ?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(listing => listing.id !== listingId)
      setListings(updatedListings)
      toast.success('Listing Deleted Successfully')

      navigate(`/Profile`);
    }
  };

  //edit handler
  const onEdit = (listingId) => {
    navigate(`/editlisting/${listingId}`);
    // navigate('/');
  }

  return (
    <Layout>
      <div className="container wt-4 w-50 d-flex justify-content-between">
        <h4>Profile Details</h4>

      </div>
      <div className='container mt-4 card' style={{ width: '18rem' }}>
        <div className='card-header'>
          <div className='d-flex justify-content-between'>
            <p>User Personal Details</p>
            <span style={{ cursor: "pointer" }}
              onClick={() => {
                changeDetails && onSubmit()
                setChangeDetails(prevState => !prevState)
              }}>
              {changeDetails ? (< MdDoneOutline color='green' />) :
                (<FaEdit color='red' />
                )}
            </span>
          </div>
        </div>
        <div className='card-body'>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">Name</label>
              <input type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={onChange}
                disabled={!changeDetails} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={onChange}
                disabled={!changeDetails}
              />
            </div>


            <div className='mb-3 form-check position-relative'>
              <button
                style={{ top: "50%", left: "50%", marginTop: "9px" }}
                className='btn btn-danger w-100'
                onClick={logoutHandler}>Logout</button>
            </div>


          </form>
        </div>
      </div>

      <div className="container wt-4 w-50 d-flex justify-content-between">
        <Link to='/create-listing'>
          <FaArrowAltCircleRight color="primary" />
          Sell or Rent Your Home
        </Link>
      </div>
      <div className='container'>
        {listings && listings?.length > 0 && (
          <>
            <h2
            style={{padding:20}}> 
              Your Listings
            </h2>
            <div>
              {listings.map(listing => (
                <Listingitem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

    </Layout>
  )
}

export default Profile