import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateRun, fetchRun } from '../../store/runs'; 

export default function RunUpdateForm() {
  const [text, setText] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const run = useSelector(state => state.runs.all[id]);
  const errors = useSelector(state => state.runs.errors); 

  useEffect(() => {
    if (!run) {
      dispatch(fetchRun(id));
    } else {
      setText(run.text);
    }
  }, [dispatch, id, run]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateRun(id, { text }))
      .then(() => history.push('/runs')); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      {errors && <div className="errors">{errors.text}</div>}
      <button type="submit">Update Run</button>
    </form>
  );
}
