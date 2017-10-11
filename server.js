'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const path = require('path');

const pokemonList = require('./utils/pokemon_list');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/pokemon', (_req, res) => {
  res.render('pages/index', {
    data: pokemonList
  });
});

app.get('/pokemon/:id', (req, res, next) => {
  let id = Number.parseInt(req.params.id);

  if (Number.isNaN(id) || id < 0) {
    next();
  }

  let pokemonToRender = 0;
  for (const pokemon of pokemonList) {
    if (id === pokemon.id) {
      pokemonToRender = pokemon;
      break;
    }
  }

  if (!pokemonToRender) {
    next();
  }

  res.render('pages/profile', {
    data: pokemonToRender
  });
});

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}, yo!`);
});
