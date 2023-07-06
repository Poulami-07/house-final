import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase.config";
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';
import "../styles/contact.css"
const Contact = () => {
    const [message, setMessage] = useState(' ')

    const [landlord, setLandlord] = useState(' ')
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()

    const form = useRef();

    // const sendEmail = (e) => {
    //     e.preventDefault();
    //     emailjs.sendForm('service_mv3rb0h', 'template_1yauqxk', form.current, 'rmjuUafQR1WA1w_gZ')
    //         .then((result) => {
    //             console.log(result.text);
    //         }, (error) => {
    //             console.log(error.text);
    //         });
    //     e.target.reset()
    // };
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_mv3rb0h', 'template_1yauqxk', form.current, 'rmjuUafQR1WA1w_gZ')
            .then((result) => {
                console.log(result.text);
                // Reset the form fields
            })
            .catch((error) => {
                console.log(error.text);
            });
        form.current.reset();
    };

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, "users", params.landlordId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {

                setLandlord(docSnap.data());
            }
            // else {
            //     toast.error("Unable to fetch data");
            // }
        };
        getLandlord();
    }, [params.landlordId]);
    return (
        <Layout>
            <div className='row contact-container'>
                <div className='col-md-6 mt-5 contact-container-col-2'>
                    <h1>Contact Details</h1>
                
                <div>
                    {landlord !== {} && (
                        <main>
                            {/* <h2>name: {landlord?.name}</h2> */}
                            <form ref={form} onClick={sendEmail}>
                                <div className='form-floating'>
                                    <textarea
                                        className='form-control'
                                        placeholder='Leave a comment here'
                                        value={message}
                                        id='message'
                                        onChange={(e) => { setMessage(e.target.value) }}
                                        name='message'
                                    />
                                    <label htmlFor='floatingTextarea'>Write your contact details</label>
                                </div>

                                <div className='position-relative' >
                                    <div className="form-check mb-5 mt-4">
                                        <button className='btn btn-primary mt-2' type='submit'>
                                            send message
                                        </button>
                                    </div>
                                </div>
                                

                            </form>

                        </main>
                    )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;