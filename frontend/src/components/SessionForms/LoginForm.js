import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { closeModal } from "../../store/ui";
import './LoginForm.css';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.modal);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <>
      { (modal === "login" && !user ) && 
        <div className="modal-body" onClick={() => dispatch(closeModal())}>
          <div className='wrapper'>
            <form className="session-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
              <h2>Log In</h2>
              <div className='session-form-cussion'></div>
              <div className="errors">{errors?.email}</div>
              <input type="text"
                value={email}
                onChange={update('email')}
                placeholder="Email"
              />
              <div className="errors">{errors?.password}</div>
              <input type="password"
                value={password}
                onChange={update('password')}
                placeholder="Password"
              />
              {/* <input
                type="submit"
                value="Log In"
                disabled={!email || !password}
              /> */}
              <div className='session-form-cussion2'></div>
              <button
                type="submit"
                disabled={!email || !password}
              >
                 Log In
              </button>
            </form>
          </div>
        </div>
      } 
    </>
  )

}

export default LoginForm;
