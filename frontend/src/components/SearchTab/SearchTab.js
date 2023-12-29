import React, { useState } from 'react';
import RunBox from '../Runs/RunBox'; // Reuse the RunBox component

const SearchTab = () => {
  const [username, setUsername] = useState('');
  const [runs, setRuns] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/users/search/${username}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setRuns(data);
      } else {
        console.error('Data is not an array:', data);
        setRuns([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search by username"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {runs.map(run => (
          <RunBox key={run._id} run={run} />
        ))}
      </div>
    </div>
  );
};

export default SearchTab;
