import React from 'react';
import {
  BsSuitHeartFill,
  BsGithub,
  BsInstagram,
  BsTelegram,
  BsYoutube,
} from "react-icons/bs";
import { BiHeart } from "react-icons/bi"
import {Link } from "react-router-dom"
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-container'>
        <h3>
        Made By
        <img
        src='/assets/giphy.gif'
        alt=""
        height={60}
        width={80}
        className='mx-3' />
        Poulami Gandhi
      </h3>
      <h6>All Right Reserved &copy; POULAMI - 2024</h6>
      <div className='d-flex flex-row p-2'>

      <p className='me-4 images_footer' title='Github'>
          <Link to="https://github.com/Poulami-07">
            <BsGithub color='black' size={30} />
          </Link>
        </p>

        <p className='me-4 images_footer' title='Instagram'>
          <Link target=" " to="https://www.instagram.com/that________cupidgirl">
            <BsInstagram color='black' size={30} />
          </Link>
        </p>

        <p className='me-4 images_footer' title='Telegram'>
          <Link to="https://telegram.org/dl">
            <BsTelegram color='black' size={30} />
          </Link>
        </p>

        <p className='me-4 images_footer' title='Youtube'>
          <Link to="https://youtube.com">
            <BsYoutube color='black' size={30} />
          </Link>
        </p>
        
      </div>
        </div>
    </div>
  );
};

export default Footer;
