const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

const bandas = [
  { id: 1, name: 'Nirvana', genre: 'Grunge' },
  { id: 2, name: 'Foo Fighters', genre: 'Hard Rock' }
];
  
const albums = [
  { id: 1, bandId: 1, name: 'Bleach', year: 1989 },
  { id: 2, bandId: 1, name: 'Nevermind', year: 1991 },
  { id: 3, bandId: 2, name: 'Foo Fighters', year: 1995 },
  { id: 4, bandId: 2, name: 'The Colour and the Shape', year: 1997 },
  { id: 5, bandId: 2, name: 'There Is Nothing Left to Lose', year: 1999 }
];

app.get('/api/bands', function(req, res){

  res.json(bandas)
})

app.get('/api/bands/:bandsId', function(req, res){

  const bandsId = parseInt(req.params.bandsId);

  const bandaFiltrada = {...bandas.find(e=> e.id === bandsId)}

  bandaFiltrada.albums = albums.filter(e =>e.bandId == bandsId)

  res.json(bandaFiltrada)
})

app.get('/api/bands/:bandsId/albums', function(req, res){

const id = parseInt(req.params.bandsId);
const discos = albums.filter(e=>e.bandId === id)

res.json(discos)

})

app.delete('/api/bands/:bandsId', function(req, res){
  const id = parseInt(req.params.bandsId);
  
  const bandasPorId=bandas.filter(e=>e.id !== id)

  res.json(bandasPorId)
});

app.post('/api/bands', function(req, res){
  const nuevaBanda= req.body;

  const id = bandas.length ? (bandas[bandas.length-1].id + 1) : 1; 

  nuevaBanda.id= id;

  bandas.push(nuevaBanda);
 
  res.json(nuevaBanda)

})
app.listen(4000)