import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RunGraph from '../Runs/RunGraph';
import { fetchUserRuns } from '../../store/runs';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const runs = useSelector(state => state.runs.user);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      dispatch(fetchUserRuns(user._id))
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [user, dispatch]);

  if (!user) {
    return null;
  }

  // Ensure that 'runs' is always an array before passing it to RunGraph
  const runsArray = Array.isArray(runs) ? runs : [];

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
 
            {isLoading ? (
        <p>Loading runs...</p>
      ) : (
        <RunGraph runs={runsArray || []} />
      )}
    </main>
  )
};
export default UserProfile;
