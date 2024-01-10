import React, { useState } from 'react';
import RunBox from '../Runs/RunBox';
import './SearchTab.css';

const SearchTab = () => {
  const [username, setUsername] = useState('');
  const [runs, setRuns] = useState([]);

  const handleSearch = async () => {
    try {
      console.log('Searching for username:', username);
      const response = await fetch(`/api/users/search/${username}`);
      const data = await response.json();
      console.log('Received data:', data);
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
    <div className="SearchTab">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search by username"
        className="SearchInput"
      />
      <button onClick={handleSearch} className="SearchButton">
        Search
      </button>

      <div>
        {runs.map((run) => (
          <RunBox key={run._id} run={run} className="RunBox" />
        ))}
      </div>
    </div>
  );
};

export default SearchTab;
