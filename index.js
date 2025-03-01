import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;

// Configuración del middleware para analizar JSON
app.use(express.json());

// Ruta para manejar los mensajes del chatbot
app.post('/chatbot', async (req, res) => {
  const userMessage = req.body.message;

  // Verifica que se haya enviado un mensaje
  if (!userMessage) {
    return res.status(400).json({ error: 'Se requiere un mensaje del usuario' });
  }

  try {
    // Solicitud a la API de OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini', // Modelo que deseas usar
        store: true,
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    // Enviar la respuesta del chatbot al usuario
    const botMessage = response.data.choices[0].message.content;
    res.json({ response: botMessage });
    console.log({ response: botMessage });
  } catch (error) {
    console.error('Error al llamar a la API de OpenAI:', error.message);
    res.status(500).json({ error: 'Error al procesar el mensaje' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});