import React from 'react'
import { Link } from 'react-router-dom'
import {FaBath, FaBed} from 'react-icons/fa'
import "../styles/listingitem.css"
const Listingitem = ({listing, id, onDelete, onEdit}) => {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center'>
    <div className='card category-link mb-2' style={{width: "800px"}}>
    <Link to={`/category/${listing.type}/${id}`}>
        <div className='row container p-2' >
          
            <div className='col-md-5'>
                <img 
                src={listing.imgUrls[0]}
                className='img-thumbnail'
                 alt={listing.name}
                  height={200}
                  width={300}
                   />
            </div>
            <div className='col-md-5 item-card-continer2'>
                <h2>{listing.name}</h2>
                <p>{listing.location}</p>
                <p> RS : {listing.offer
                     ? listing.discountedPrice
                     : listing.regularPrice}{" "}
                     {listing.type === 'rent' && ' /Month'}
                     </p>
                     <p>
                        <FaBed /> &nbsp;
                        {listing.bedrooms >1
                         ? `${listing.bedrooms}
                          Bedrooms` : '1 Bedroom'}
                    </p>

                    <p>
                        <FaBath /> &nbsp;
                        {listing.bathrooms >1
                         ? `${listing.bathrooms}
                          Bathrooms` : '1 Bathroom'}
                    </p>

                    {/* delete list button */}

                    {onDelete && (
                      <div className='mb-5 form-check position-relative'>
                    <button
                     className='btn'
                      onClick={ () => {
                        onDelete(listing.id, listing.name)}}>
                         Delete Listing
                      </button>
                      </div>
                         )}

                {onEdit && (
                  <div className='mb-4 form-check position-relative'>
                    <button
                      className='btn'
                      onClick={() => {
                        onEdit(listing.id)
                      }}>
                      Edit Listing
                    </button>
                  </div>
                )}
            </div>
            
        </div>
        </Link>
    </div>
    </div>
    </>
  )
}

export default Listingitem