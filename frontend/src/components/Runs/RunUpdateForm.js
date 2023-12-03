import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateRun, fetchRun } from '../../store/runs';
import './RunUpdate.css';

export default function RunUpdateForm() {
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const run = useSelector(state => state.runs.all[id]);
  const errors = useSelector(state => state.runs.errors);

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
    if (!run) {
      dispatch(fetchRun(id));
    } else {
      setDistance(run.distance);
      setHours(run.hours);
      setMinutes(run.minutes);
      setSeconds(run.seconds);
    }
  }, [dispatch, id, run]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateRun(id, { distance, hours, minutes, seconds }))
      .then(() => history.push('/runs'));
  };

  return (
    <>
    <div className="run-update-container">
      <form className="update-run" onSubmit={handleSubmit}>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Distance"
          required
        />
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours"
          required
        />
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          placeholder="Minutes"
          required
        />
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          placeholder="Seconds"
          required
        />
        <button type="submit" className="update-button">Update Run</button>
        {errors && <div className="errors">{errors.text}</div>}
      </form>
    </div>
    <div className="animated-background"></div>
    </>
  );

}
