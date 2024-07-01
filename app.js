const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');

async function getLocation(ip) {
    const url = `http://ipwhois.app/json/${ip}`;
    try {
        const response = await axios.get(url);
        return response.data.city;
    } catch (error) {
        console.error('Error Fetching Location: ', error);
        return 'Unknown';
    }
}

async function getTemperature(city) {
    const apiKey = '0fd2300c8e28aff4c85bca10407cc626';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await axios.get(url);
        return response.data.main.temp;
    } catch (error) {
        console.error('Error Fetching Weather: ', error)
        return 0;
    }
}

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
            <p>Use the <code>/api/hello</code> endpoint to get your geolocation and weather information.</p>
          </div>
        </body>
        </html>
      `);
  });

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const location = await getLocation(clientIp);
    const temperature = await getTemperature(location);

    res.json({
        clientIp: clientIp,
        location: location,
        greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degree Celcius in ${location}`
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});