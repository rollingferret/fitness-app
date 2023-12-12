// Function to make a POST request to the GPT-3.5 Turbo model
const makeRequestToGPT3Turbo = (userInput) => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        prompt: userInput,
        max_tokens: 150,
        model: "gpt-3.5-turbo-1106", // Specify the GPT-3.5 Turbo model
      });

      const options = {
        hostname: 'api.openai.com',
        path: '/v1/engines/content-filter-alpha-003/completions', // Update the path for GPT-3.5 Turbo
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`, // Replace with your OpenAI API key
        },
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          resolve(responseData);
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(data);
      req.end();
    });
  };

  // Route to handle GPT-3.5 Turbo API request
  app.post('/api/gpt3-turbo', async (req, res) => {
    try {
      const { userInput } = req.body; // Assuming the user input is sent as userInput

      // Make a request to GPT-3.5 Turbo using the updated function
      const response = await makeRequestToGPT3Turbo(userInput);
      res.json(JSON.parse(response));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
