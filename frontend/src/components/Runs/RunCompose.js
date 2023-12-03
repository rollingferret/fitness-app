import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRunErrors, composeRun } from '../../store/runs';
import RunBox from './RunBox';
import './RunCompose.css';
import stockPortrait from './face.jpg';

function RunCompose() {
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newRun = useSelector(state => state.runs.new);
  const errors = useSelector(state => state.errors.runs);
  const [runningData, setRunningData] = useState([]);

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
    return () => dispatch(clearRunErrors()); // Clean up error messages on unmount
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const newRunData = {
      distance,
      time: hours * 60 + Number(minutes) + Number(seconds) / 60
    };

    if (distance && hours && minutes && seconds) {
      dispatch(composeRun({ distance, hours, minutes, seconds }));
      setRunningData(prevData => [...prevData, newRunData]);
      setDistance('');
      setHours('');
      setMinutes('');
      setSeconds('');
    } else {
      console.error("Run data is incomplete");
    }
  };

  return (
    <>
    <div className="run-compose-container">
        <form className="compose-run" onSubmit={handleSubmit}>
          {/* Input fields for distance, hours, minutes, seconds */}
          <input
            type="number"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            placeholder="Distance"
            required
          />
          <input
            type="number"
            value={hours}
            onChange={e => setHours(e.target.value)}
            placeholder="Hours"
            required
          />
          <input
            type="number"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
            placeholder="Minutes"
            required
          />
          <input
            type="number"
            value={seconds}
            onChange={e => setSeconds(e.target.value)}
            placeholder="Seconds"
            required
          />
          <input type="submit" value="Submit" />
          <div className="errors">{errors?.text}</div>
        </form>

    {/* Previous run */}
        <div className="previous-run">
          {newRun ? <RunBox run={newRun} /> : null}
        </div>
      </div>

    {/* User profile*/}
    <div className="profile-content">
    <div className="user-info-container">
      <div className="profile-image-container">
        <img src={stockPortrait} alt="Stock Portrait" className="profile-image" />
      </div>
      <div className="user-details">
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

export default RunCompose;
