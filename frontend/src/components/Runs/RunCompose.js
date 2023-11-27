import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRunErrors, composeRun } from '../../store/runs';
import RunBox from './RunBox';
import './RunCompose.css';

function RunCompose () {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newRun = useSelector(state => state.runs.new);
  const errors = useSelector(state => state.errors.runs);

  useEffect(() => {
    return () => dispatch(clearRunErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(composeRun({ text }));
    setText('');
  };

  const update = e => setText(e.currentTarget.value);

  return (
    <>
      <form className="compose-run" onSubmit={handleSubmit}>
        <input
          type="textarea"
          value={text}
          onChange={update}
          placeholder="Write your run..."
          required
        />
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <div className="run-preview">
        <h3>Run Preview</h3>
        {text ? <RunBox run={{text, author}} /> : undefined}
      </div>
      <div className="previous-run">
        <h3>Previous Run</h3>
        {newRun ? <RunBox run={newRun} /> : undefined}
      </div>
    </>
  )
}

export default RunCompose;
