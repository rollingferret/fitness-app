import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRunErrors, fetchRuns } from '../../store/runs';
import RunBox from './RunBox';

function Runs () {
  const dispatch = useDispatch();
  const runs = useSelector(state => Object.values(state.runs.all));

  useEffect(() => {
    dispatch(fetchRuns());
    return () => dispatch(clearRunErrors());
  }, [dispatch])

  if (runs.length === 0) return <div>There are no Runs</div>;

  return (
    <>
      <h2>All Runs</h2>
      {runs.map(run => (
        <RunBox key={run._id} run={run} />
      ))}
    </>
  );
}

export default Runs;
