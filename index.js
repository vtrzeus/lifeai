const express = require('express');
const app = express();

const port = process.env.PORT || 10000;
app.get('/', (req, res) => {
  res.send('Hello, LifeAI is running!');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
