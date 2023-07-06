import React , {useState, useEffect} from 'react'
import {db} from '../firebase.config'
import {collection, getDoc, query, orderBy, limit, getDocs} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import SwipeCore, {EffectCoverflow, Navigation, Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Spinner from '../components/Spinner'

//config
SwipeCore.use([EffectCoverflow,Pagination])

const Slider = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
            const listingRef = collection(db, 'listings');
            const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach(doc => {
                return listings.push({
                    id:doc.id,
                    data:doc.data(),
                });
            });
            setListings(listings);
            setLoading(false);
        };
        fetchListings();
        console.log(listings === null ? "loading" : listings);
    },[]);
    if(loading){
        return <Spinner />;
    }
  return (
    <>
    {/* <div className='container-fluid'>
    {listings === null ? (<Spinner/>) :
             (
              <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides= {true}
              slidesPerView={1} 
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
              }}
              pagination={true}
              className='mySwipe'
              >
                {listings.map(({data, id}) =>(
                  <SwiperSlide key ={id}>
                    <img src={data.imgUrls[0]}
                    height={400}
                    width={800}
                    alt={data.name} />
                  </SwiperSlide>
                ))}

              </Swiper>
            )}
    </div> */}
    </>
  )
}

export default Slider