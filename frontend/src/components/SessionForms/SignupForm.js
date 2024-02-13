import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup, clearSessionErrors, RECEIVE_CURRENT_USER } from '../../store/session';
import { closeModal } from "../../store/ui";

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [geographicState, setGeographicState] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const errors = useSelector(state => state.errors.session);
  const modal = useSelector(state => state.ui.modal); 
  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => (e) => {
    switch (field) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'username':
        setUsername(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'password2':
        setPassword2(e.target.value);
        break;
      case 'gender':
        setGender(e.target.value);
        break;
      case 'dob':
        setDob(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'state':
        setGeographicState(e.target.value);
        break;
      case 'weight':
        setWeight(e.target.value);
        break;
      case 'height':
        setHeight(e.target.value);
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      gender,
      dob,
      city,
      state: geographicState,
      weight,
      height
    };
    const action = await dispatch(signup(user));
    
    if (action.type === RECEIVE_CURRENT_USER) {
      dispatch(closeModal());
    }
  };

  return (
    <>
      { (modal === "signup" && !user) &&
        <div className="modal-body" onClick={() => dispatch(closeModal())}>
          <div className='wrapper'>
            <form className="session-form signup-session-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <div className='session-form-cussion'></div>
              
              <div className="signup-form-container">
                <div className="errors">{errors?.email}</div>
                <input type="text" value={email} onChange={update('email')} placeholder="Email" />
                <div className="errors">{errors?.username}</div>
                <input type="text" value={username} onChange={update('username')} placeholder="Username" />
                <div className="errors">{errors?.password}</div>
                <input type="password" value={password} onChange={update('password')} placeholder="Password" />
                <div className="errors">{password !== password2 && 'Confirm Password field must match'}</div>
                <input type="password" value={password2} onChange={update('password2')} placeholder="Confirm Password" />
                <input type="text" value={gender} onChange={update('gender')} placeholder="Gender" />
                <input type="date" value={dob} onChange={update('dob')} placeholder="Date of Birth" />
                <input type="text" value={city} onChange={update('city')} placeholder="City" />
                <input type="text" value={geographicState} onChange={update('state')} placeholder="State" />
                <input type="number" value={weight} onChange={update('weight')} placeholder="Weight" />
                <input type="number" value={height} onChange={update('height')} placeholder="Height" />
              </div>

              <div className='session-form-cussion2'></div>
              <div className='button-container'> {/* Container for the button */}
                <button type="submit" disabled={!email || !username || !password || password !== password2}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
}

export default SignupForm;
