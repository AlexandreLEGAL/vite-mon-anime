const express = require('express')
const path = require('path')
const fs = require('fs');
require('dotenv').config()

const PORT = process.env.PORT || 4004

const app = express()

app.use(express.json())

app.use(express.static('client/build'))

app.get('/api/youtube', (_, res) =>{
    res.send({
        msg: 'Hello world'
    })
});
app.get('/animes', (_, res) =>{
    res.json(
        JSON.parse(fs.readFileSync('./donnee.json'))
    )
});
app.get('/animes/:id', (req, res) =>{
    res.json(
        JSON.parse(fs.readFileSync('./donnee.json'))[req.params.id-1]
    )
});
app.get('/', (_,res) =>{
	res.send({
		msg: 'Page home'
	})
});
app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
});
app.listen(PORT, () => {
    console.log(`Server start on port : ${PORT}`)
});
