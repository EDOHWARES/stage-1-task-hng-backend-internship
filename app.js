const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const location = 'New York';
    const temperature = 11;

    res.json({
        clientIp: clientIp,
        location: location,
        greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degree Celcius in ${location}`
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});