const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/generate', async (req, res) => {
  try {
    const { muscle } = req.body;

    // Replace 'YOUR_OPENAI_API_KEY' with your OpenAI API key
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Generate exercise for ${muscle}`,
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    res.json({ response: data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
