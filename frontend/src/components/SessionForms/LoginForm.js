import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { closeModal } from "../../store/ui";
import './LoginForm.css';
import { closeModal } from "../../store/ui";

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.modal); // Naoko added

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
    dispatch(closeModal())
    dispatch(login({ email, password }));
  }

  return (
    <>
      { (modal === "login") && // Naoko added 
<<<<<<< HEAD
        <div className="modal-body" onClick={() => dispatch(closeModal())}>
          <form className="session-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
            <h2>Log In Form</h2>
            <div className="errors">{errors?.email}</div>
            <label>
              <span>Email</span>
              <input type="text"
                value={email}
                onChange={update('email')}
                placeholder="Email"
              />
            </label>
            <div className="errors">{errors?.password}</div>
            <label>
              <span>Password</span>
              <input type="password"
                value={password}
                onChange={update('password')}
                placeholder="Password"
              />
            </label>
            <input
              type="submit"
              value="Log In"
              disabled={!email || !password}
            />
          </form>
        </div>
=======
        <form className="modal-body session-form" onSubmit={handleSubmit}>
          <h2>Log In Form</h2>
          <div className="errors">{errors?.email}</div>
          <label>
            <span>Email</span>
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            <span>Password</span>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <input
            type="submit"
            value="Log In"
            disabled={!email || !password}
          />
        </form>
>>>>>>> 73873053e42fcaff32e8ef7d5bdb7b9842a9b0d1
      } 
    </>
  )

}

export default LoginForm;
