import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/send', async (req, res) => {
  const { message } = req.body;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return res.status(500).send('Webhook URL not configured.');

  if (!message) return res.status(400).send('Missing "message" field.');

  try {
    await axios.post(webhookUrl, { content: message });
    res.send('Message sent to Discord.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send message.');
  }
});

app.get('/', (req, res) => {
  res.send('Discord Webhook API is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
