import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateRun, fetchRun } from '../../store/runs';

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
    <form onSubmit={handleSubmit}>
      {/* Add input fields for distance, hours, minutes, and seconds */}
      <input type="number" value={distance} onChange={e => setDistance(e.target.value)} required />
      <input type="number" value={hours} onChange={e => setHours(e.target.value)} required />
      <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} required />
      <input type="number" value={seconds} onChange={e => setSeconds(e.target.value)} required />
      {errors && <div className="errors">{errors.text}</div>}
      <button type="submit">Update Run</button>
    </form>
  );
}
