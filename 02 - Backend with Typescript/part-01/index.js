const http = require('http');

//how the raw server is written without express and other libraries

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/menu') {
        res.writeHead(200, {
            'content-Type': 'application/json'
        });
        res.end(JSON.stringify({ items: ['thali', 'Biryani'] }));
    } else if (req.method === 'POST' && req.url === '/order') {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            const order = JSON.parse(data);
            res.writeHead(200, {
                'content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                status: 'Order received',
                order
            }));
        })
    }
}) 