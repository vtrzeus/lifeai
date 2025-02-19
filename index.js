const express = require('express');
const bodyParser = require('body-parser'); // For handling POST requests
const axios = require('axios'); // For API requests

const app = express();
const port = process.env.PORT || 10000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to handle AI requests
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).send({ error: 'No message provided' });
  }

  try {
    // OpenAI API call (replace with your OpenAI API key)
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003', // or the model of your choice
        prompt: userMessage,
        max_tokens: 100,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.YOUR_OPENAI_API_KEY}`, // Use your environment variable for the API key
          'Content-Type': 'application/json'
        }
      }
    );

    // Send the AI-generated response back
    res.send({ response: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`AI server is running on port ${port}`);
});
