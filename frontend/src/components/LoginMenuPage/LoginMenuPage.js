import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from "../../store/ui";
import { login } from '../../store/session';
import './LoginMenuPage.css';

const LoginMenuPage = () => {

  const dispatch = useDispatch();
  const openLogin = (e) => {
    e.preventDefault();
    // e.stopPropagation()
    dispatch(openModal("login"));
  }

  const openSignup = (e) => {
    e.preventDefault();
    e.stopPropagation()
    dispatch(openModal("signup"));
  }

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email:"abc@abc.com", password:"password" }));
  }


  return (
    <>
    {/* <Link to="/NavBar"> */}
    <div className='loginmenu-body'>
      <div id="video-area">
        <video id="video"  webkit-playsinline playsInline muted autoPlay loop>
          <source src={require('./beach_-_29982 (720p).mp4')} type="video/mp4" />
          <p>動画を再生できる環境ではありません。</p>
        </video>
      </div>
      <div className="flex" >
        <button
            className='box fadeUp'
            type="submit"
            onClick={openLogin}
          >
            <div className=''  data-font-weight="semibold">
              Log In
            </div>
          </button>
          <button
            className='delay-time02 box fadeUp'
            type="submit"
            onClick={openSignup}
          >
            <div className=''  data-font-weight="semibold">
            Sign Up
            </div>
          </button>
          <button
            className='delay-time04 box fadeUp'
            type="submit"
            onClick={handleDemoSubmit}
          >
            <div className=''  data-font-weight="semibold">
            Demo
            </div>
          </button>
      </div>
    </div>
{/* </Link> */}
    </>
  );
};

export default LoginMenuPage;