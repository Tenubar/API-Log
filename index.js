import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;


app.use(express.json());

app.post('/chat', async (req, res) => {
    const postman = req.body.message;
    try {
        const response = await axios.post('https://api-log-upzz.onrender.com/api', {message:postman});
        res.json({response: response.data});
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

app.post('/api', (req, res) => {
    const message = req.body.message;
    console.log(`Received message: ${message}`); 

    res.json({
        status: 'success',
        receivedMessage: message,
        reply: `Hello, you said: "${message}"`,
    });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
