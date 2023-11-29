import { Link } from 'react-router-dom';
import {useSelector } from 'react-redux';
import "./RunBox.css"
import { useDispatch } from 'react-redux';
import { deleteRun } from '../../store/runs';

function RunBox({ run }) {
  const { distance, hours, minutes, seconds, author, _id: runId } = run;
  // const { text, author,  } = run;
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRun(runId));
  };

  const formatRunData = () => {
    return `${distance} km, ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="run">
      <h3>{author.username}</h3>
      <p>{formatRunData()}</p>
      {currentUser && currentUser._id === author._id && (
        <>
          <Link to={`/runs/update/${runId}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default RunBox;