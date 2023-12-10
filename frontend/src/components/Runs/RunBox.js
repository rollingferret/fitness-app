import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteRun } from '../../store/runs';
import "./RunBox.css";

function RunBox({ run }) {
  const { distance, hours, minutes, seconds, author, _id: runId, createdAt } = run;
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRun(runId));
  };

  // const formatRunDistance = () => {
  //   return (
  //     <p style={{ color: '#000', fontSize: '24px' }}>
  //       <span style={{ fontSize: '36px', color: 'green' }}>{distance}</span> <span style={{ fontSize: '36px', color: 'green' }}>miles</span>
  //     </p>
  //   );
  // };

  // const calculatePace = () => {
  //   const totalMinutes = hours * 60 + minutes + seconds / 60;
  //   const pace = totalMinutes / distance;

  //   const paceMinutes = Math.floor(pace);
  //   const paceSeconds = Math.round((pace - paceMinutes) * 60);

  //   return (
  //     <p style={{ color: '#000', fontSize: '18px' }}>
  //       Pace: {paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds} <span style={{ fontSize: 'medium' }}>min/mile</span>
  //     </p>
  //   );
  // };

  // const formatRunTime = () => {
  //   const formattedHours = hours < 10 ? `0${hours}` : hours;
  //   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //   const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  //   return (
  //     <p style={{ color: '#000', fontSize: '18px' }}>
  //       Time: {formattedHours}:{formattedMinutes}:{formattedSeconds}
  //     </p>
  //   );
  // };

  // const formatCreatedAt = () => {
  //   const createdDate = new Date(createdAt);
  //   const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  //   return (
  //     <p style={{ fontWeight: 'bold', color: '#000' }}>
  //       {createdDate.toLocaleDateString(undefined, options)}
  //     </p>
  //   );
  // };




  
  const formatRunDistance = () => {
    return (
      <p style={{ color: '#000', fontSize: '24px' }}>
        <span style={{ fontSize: '36px', color: 'green' }}>{distance}</span> <span style={{ fontSize: '36px', color: 'green' }}>miles</span>
      </p>
    );
  };

  const calculatePace = () => {
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    const pace = totalMinutes / distance;

    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.round((pace - paceMinutes) * 60);

    return (
      <p>
        Pace: {paceMinutes}:{paceSeconds < 10 ? `0${paceSeconds}` : paceSeconds} <span style={{ fontSize: 'medium' }}>min/mile</span>
      </p>
    );
  };

  const formatRunTime = () => {
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
      <p>
        Time: {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </p>
    );
  };

  const formatCreatedAt = () => {
    const createdDate = new Date(createdAt);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return (
      <p>
        {createdDate.toLocaleDateString(undefined, options)}
      </p>
    );
  };




  return (
    // <div className="run">
    //   {/* <h3>{author.username}</h3> */}
    //   <p>{formatCreatedAt()}</p>
    //   <p>{formatRunDistance()}</p>
    //   <p>{formatRunTime()}</p>
    //   <p>{calculatePace()}</p>
    //   {currentUser && currentUser._id === author._id && (
    //     <div className="button-container">
    //     <button className="edit-button">
    //       <Link to={`/runs/update/${runId}`}>Edit</Link>
    //     </button>
    //     <button onClick={handleDelete} className="delete-button">
    //       Delete
    //     </button>
    //   </div>
    //   )}
    // </div>

  <div id="run">
    <div className='user-pic-name'>
      <img id="run-image" src="" alt="user-image" />
      <p id="run-authur">{author.username}</p>
    </div>
    <div id="run-container">
      
      <span>{formatCreatedAt()}</span>
      <span>{formatRunDistance()}</span>
      <span>{formatRunTime()}</span>
      <span>{calculatePace()}</span>
      {currentUser && currentUser._id === author._id && (
        <div className="button-container">
          <button className="edit-button">
            <Link to={`/runs/update/${runId}`}>Edit</Link>
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      )}
    </div>
  </div>
  );
}

export default RunBox;
