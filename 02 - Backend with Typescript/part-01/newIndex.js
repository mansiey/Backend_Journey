//Writing server code using express

const express = require('express');
// import express from 'express';

const app = express();
app.use(express.json());

app.get('/menu', (req, res) => res.json({
    items: ['thali', 'Biryani']
}));

app.post('/order', (req, res) => {
    res.status(200).json({
        status: 'received',
        order: req.body
    })
});



//Part-02 : Piyush sir's notes

