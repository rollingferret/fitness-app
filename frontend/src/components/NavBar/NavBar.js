import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import './NavBar.css';
import { logout } from '../../store/session';
import { openModal, closeModal } from "../../store/ui"; // Naoko added

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  // Naoko added start ----------------------
  const openLogin = (e) => {
    e.preventDefault();
    e.stopPropagation()
    dispatch(openModal("login"));
  }
  
  const openSignup = (e) => {
    e.preventDefault();
    e.stopPropagation()
    dispatch(openModal("signup"));
  }
  // Naoko added end ----------------------

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/runs'}>All Exercises</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/runs/new'}>Write a Run</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          {/* <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link> */}
          {/* // Naoko added start ---------------------- */}
          <button
            className='' 
            type="submit" 
            onClick={openLogin}
          >
            <div className=''  data-font-weight="semibold">
              Log In
            </div>
          </button>
          <button 
              className='' 
              type="submit" 
              onClick={openSignup}
            >
            <div className=''  data-font-weight="semibold" >
              Sign Up
            </div>
          </button>
          {/* // Naoko added end ---------------------- */}
        </div>
      );
    }
  }

  return (
    <>
      <h1 style={{ color: 'blue', textAlign: 'center' }}>Fitness App</h1>
      {getLinks()}
    </>
  );
}

export default NavBar;
