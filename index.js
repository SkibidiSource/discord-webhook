// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1381281766945460285/gzVY9uwcgRb_BWaMN_vVueh3SnajHKsFyqCwzF4FM6CX32ou-8rhsoSimvm_cmPaXMXC';

app.post('/sendWebhook', async (req, res) => {
	const { message } = req.body;

	if (!message) return res.status(400).json({ error: 'No message provided' });

	try {
		await axios.post(DISCORD_WEBHOOK_URL, {
			content: message,
		});
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(500).json({ error: 'Failed to send to Discord', details: err.message });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
