import React, { useState } from 'react';

function Workout() {
  const [muscle, setMuscle] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      console.log('Submitting:', muscle);
      const apiKey = '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'; // Replace with your OpenAI API key
      const apiUrl = '/api/workouts/generate'; // Adjusted route

      const result = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ muscle }),
      });

      const data = await result.json();
      console.log('Response from server:', data);
      setResponse(data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Fitness App - Workout Page</h1>
      <input
        type="text"
        placeholder="Enter muscle"
        value={muscle}
        onChange={(e) => setMuscle(e.target.value)}
      />
      <button onClick={handleSubmit}>Generate Exercise</button>
      {response && <div>{response}</div>}
    </div>
  );
}

export default Workout;
