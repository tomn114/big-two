const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT | 3000
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);


const Card = require('./card.js')
const Deck = require('./deck.js')

const numPlayers = 4;

var ids = []

const publicPath = path.join(__dirname, 'public')

app.use(express.static(publicPath))

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

io.on('connection', (socket) => {

    ids.push(socket.id);
    console.log(ids);

    socket.on('generate', () => {
        d = new Deck();
        d.generate_deck();
    })

    socket.on('shuffle', () => {
        d.shuffle_deck();
        io.emit('shuffled', d.getDeck())
    })

    socket.on('deal', () => {
        var hands = d.deal_deck(numPlayers);
        for(var i = 0; i < ids.length; i++){
            io.to(ids[i]).emit('dealt', hands[i]);
        }
    })


})



