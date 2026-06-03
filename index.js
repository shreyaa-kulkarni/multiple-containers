const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    url: 'redis://redis-db:6379'
});

client.on('error', err => console.log('Redis Client Error', err));

async function startServer() {
    await client.connect();
    // Initialize visits if not present
    await client.set('visits', 0);

    app.get('/', async (req, res) => {
        const visits = await client.incr('visits');
        res.send(`Hello! This page has been viewed ${visits} times.`);
    });

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

startServer();

