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
            <RunGraph runs={runsArray || []} />
          </div>
          <div className="graph-item">
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
              <span className="username">{user.username}</span>
            </div>
            <div className="detail-item">{user.email}</div>
            <div className="detail-item">
              <span>Male</span> {/* Add user gender */}
            </div>
            <div className="detail-item">
              <span>25 years old</span> {/* Add user age */}
            </div>
            <div className="detail-item">
              <span>New York, NY</span> {/* Add user location */}
            </div>
            <div className="detail-item">
              <span>6' 0"</span> {/* Add user height */}
            </div>
            <div className="detail-item">
              <span>180 lbs</span> {/* Add user weight */}
            </div>
          </div>
        </div>
      </div>

      <div className="animated-background"></div>
    </>
  );

}

export default UserProfile;
