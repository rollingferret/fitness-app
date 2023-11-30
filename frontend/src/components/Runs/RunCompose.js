import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRunErrors, composeRun } from '../../store/runs';
import RunBox from './RunBox';
import './RunCompose.css';
import RunGraph from './RunGraph';

function RunCompose () {
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
    return () => dispatch(clearRunErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    const newRunData = { 
      distance, 
      time: (hours * 60 + minutes + seconds / 60) 
    };
    // Ensure distance, hours, minutes, and seconds are defined
    if (distance && hours && minutes && seconds) {
      dispatch(composeRun({ distance, hours, minutes, seconds }));
      setRunningData(prevData => [...prevData, newRunData]);
      // Reset form fields
      setDistance('');
      setHours('');
      setMinutes('');
      setSeconds('');
    } else {
      console.error("Run data is incomplete");
    }
  };
  // const update = e => setText(e.currentTarget.value);

  return (
    <>
    <div className="run-compose-container">
      <div className="left-column">
        <form className="compose-run" onSubmit={handleSubmit}>
          <input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="Distance" required />
          <input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Hours" required />
          <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="Minutes" required />
          <input type="number" value={seconds} onChange={e => setSeconds(e.target.value)} placeholder="Seconds" required />
          <input type="submit" value="Submit" />
          <div className="errors">{errors?.text}</div>
        </form>
        <div className="run-preview">
          <h3>Run Preview</h3>
          {/* {text ? <RunBox run={{text, author}} /> : undefined} */}
        </div>
        <div className="previous-run">
          <h3>Previous Run</h3>
          {newRun ? <RunBox run={newRun} /> : undefined}
        </div>
      </div>

      <div className="right-column">
        <div className="run-graph">
          <h3>Run Data Visualization</h3>
          <RunGraph runningData={runningData} />
        </div>
      </div>
    </div>

    {/* Another set of elements */}
    <div className="compose-run-container">
      <form className="compose-run" onSubmit={handleSubmit}>
        {/* ... (existing input fields) */}
      </form>
      <div className="run-preview">
        <h3>Run Preview</h3>
        {/* Render RunBox here if needed */}
      </div>
      <div className="previous-run">
        <h3>Previous Run</h3>
        {newRun ? <RunBox run={newRun} /> : undefined}
      </div>
    </div>
  </>
  )
}

export default RunCompose;
