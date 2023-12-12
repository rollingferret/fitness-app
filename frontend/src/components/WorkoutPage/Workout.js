import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Workout.css';
import React, { useState } from 'react';

function Workout() {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
        const response = await fetch('/api/gpt3-turbo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const responseData = await response.json();

      // Assuming the OpenAI response has a 'choices' property
      setOutput(responseData.choices[0].text.trim());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>OpenAI Integration</h1>
      <textarea value={userInput} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>

      {output && (
        <div>
          <h2>Response:</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}

export default Workout;
