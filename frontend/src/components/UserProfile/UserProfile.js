import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const loggedIn = useSelector(state => !!state.session.user);

  if (!user) {
    return null;
  }

  if (loggedIn) {
    return (
        <main>

            <h1>User Profile</h1>
            <div>Name : {user.username}</div>
            <div>Email : {user.email}</div>
            <div>Gender :</div>
            <div>Age :</div>
            <div>Location :</div>
            <div>Height :</div>
            <div>Weight :</div>

        </main>
    )
  }
};

export default UserProfile;
