import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RunGraph from '../Runs/RunGraph';
import MileTimeGraph from '../MileTimeGraph/MileTimeGraph';
import { fetchUserRuns } from '../../store/runs';
import './UserProfile.css';
import stockPortrait from './face.jpg';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const runs = useSelector(state => state.runs.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const animatedBg = document.querySelector('.animated-background');

    const resizeHandler = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      animatedBg.style.width = `${width}px`;
      animatedBg.style.height = `${height}px`;
    };

    resizeHandler(); // Set initial size

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setIsLoading(true);
        try {
          await dispatch(fetchUserRuns(user._id));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          // Handle error if needed
        }
      }
    };

    fetchData();
  }, [user, dispatch]);

  if (!user) return null;

  const runsArray = Array.isArray(runs) ? runs : [];

  return (
    <>
        <div className="graph-container">
      {isLoading ? (
        <p>Loading runs...</p>
      ) : (
<div className="graph-wrapper">
  <div className="graph-item">
    <h2>Distance per Run</h2>
    <RunGraph runs={runsArray || []} />
  </div>
  <div className="graph-item">
    <h2>Pace per Run</h2>
    <MileTimeGraph runs={runsArray || []} />
  </div>
</div>
      )}
    </div>

      <div className="profile-content">
        <div className="user-info-container">
          <div className="profile-image-container">
            <img src={stockPortrait} alt="Stock Portrait" className="profile-image" />
          </div>
          <div className="user-details">
  <div className="detail-item">
    <span className="username">{user.username || 'N/A'}</span>
  </div>
  <div className="detail-item">{user.email || 'N/A'}</div>
  <div className="detail-item">
    <span>{user.gender || 'Gender: N/A'}</span>
  </div>
  <div className="detail-item">
    <span>{user.age || 'Age: N/A'}</span>
  </div>
  <div className="detail-item">
    <span>{(user.city && user.state) ? `${user.city}, ${user.state}` : 'Location: N/A'}</span>
  </div>
  <div className="detail-item">
    <span>{user.height ? `${user.height}"` : 'Height: N/A'}</span>
  </div>
  <div className="detail-item">
    <span>{user.weight ? `${user.weight} lbs` : 'Weight: N/A'}</span>
  </div>
</div>
        </div>
      </div>
      <div className="animated-background"></div>
    </>
  );

}

export default UserProfile;
