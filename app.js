const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Welcome</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f0f0f0; }
            .container { max-width: 800px; margin: 50px auto; padding: 20px; background: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            h1 { color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to the Geolocation and Weather API</h1>
            <h4>Intern Name: Edoh Emmanuel Gideon</h4>
            <h4>Email: edohemmanuel082@gmail.com</h4>
            <p>Use the <code>/api/hello?visitor_name=yourName</code> endpoint to get your geolocation and weather information.</p>
          </div>
        </body>
        </html>
      `);
  });

app.get('/api/hello', async (req, res) => {
    const client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const visitor_name = req.query.visitor_name || 'Mark';

    const apiKey = '8adfe75094344d2c9f1120543231107';
    const baseUrl = `http://api.weatherapi.com/v1`;
    const url = `${baseUrl}/current.json?key=${apiKey}&q=${client_ip}`;

    try {
        const response = await axios.get(url);
        const data  = response.data;

        const location = data.location.name;
        const temp = data.current.temp_c;

        res.json({
            client_ip: client_ip,
            location: location,
            greeting: `Hello, ${visitor_name}!, the temperature is ${temp} degree Celcius in ${location}`
        });

    } catch (error) {
        console.error('Error Encountered: ', error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});