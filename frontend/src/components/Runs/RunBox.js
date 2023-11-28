import { Link } from 'react-router-dom';
import {useSelector } from 'react-redux';
import "./RunBox.css"
import { useDispatch } from 'react-redux';
import { deleteRun } from '../../store/runs';

function RunBox({ run }) {
  const { text, author, _id: runId } = run;
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRun(runId));
  };

  return (
    <div className="run">
      <h3>{author.username}</h3>
      <p>{text}</p>
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