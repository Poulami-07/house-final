import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner";
import { collection, getDocs, QueryConstraintType, where, orderBy, limit, startAfter, query } from 'firebase/firestore'
import Listingitem from '../components/Listingitem'
import "../styles/offers.css";


const Offers = () => {
  const [listing, setListing] = useState(" ")
  const [loading, setLoading] = useState(true)
  const [lastFetchListing, setLastFetchListing] = useState(null)
  const params = useParams()

  //fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //referrence
        const listingsRef = collection(db, 'listings');
        //query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(2)
        )
        //execute query
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          setLastFetchListing(lastVisible)
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        });
        setListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error)
        toast.error('Unable to fetch data')
      }
    };
    //func call
    fetchListing();
  }, []);


  //Load more pagination
const fetchLoadMoreListing = async () => {
  try{
    //referrence
    const listingsRef = collection(db, 'listings');
    //query
    const q = query(
      listingsRef,
       where('offer', '==',true),
       orderBy('timestamp','desc'),
       startAfter(lastFetchListing),
       limit(10)
       )
      //execute query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchListing(lastVisible)
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
            id:doc.id,
            data:doc.data()
        })            
      });
      setListing(prevState => [...prevState, ...listings]);
      setLoading(false);
  } catch (error){
    console.log(error)
    toast.error('Unable to fetch data')
  }
};

  return (
    <Layout>
      <div className="offers pt-3 container-fluid">
        <h1>
          {" "}
          <img 
          src='/assets/deal.png'
          alt='offers'
          className='offer-img'
          />{" "}
          Best Offers</h1>
        {
          loading ? <Spinner />
            : listing && listing.length > 0 ? (
              <>
                <div>
                  {listing.map((list) => (
                    <Listingitem listing={list.data} id={list.id} key={list.id} />
                  ))}
                </div>
              </>)
              : (<p>There are no current offer </p>)

        }
      </div>
      <div className='d-flex align-items-center justify-content-center mb-4 mt-4'>
      {
        lastFetchListing && (
          <button className='load-btn'
          onClick={fetchLoadMoreListing}>
            {/* <IoReloadXCircle/> */}
            Load more
          </button>
        )
      }
     </div>
    </Layout>
  )
}

export default Offers