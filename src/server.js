'use strict';

const express = require('express');
const databaseService = require('./databaseService');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// APP
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//API REST
app.get('/recuperarImovel', async (req, res) => {
  const imoveis = await databaseService.recuperarImovel(req.query.id);
  res.json(imoveis);
});

app.post('/inserirImovel', async (req, res) => {
  const imovel = databaseService.Imovel.build({
    endereco: req.body.endereco,
    preco: req.body.preco,
    metros_quadrados: req.body.metros_quadrados,
    num_quartos: req.body.num_quartos,
    num_banheiros: req.body.num_banheiros,
    num_suites: req.body.num_suites,
    num_vagas: req.body.num_vagas,
  });  
  const json = await databaseService.inserirImovel(imovel);
  res.json(json);
});

app.put('/atualizarImovel', async (req, res) => {
  const imovel = databaseService.Imovel.build({
    id: req.body.id,
    endereco: req.body.endereco,
    preco: req.body.preco,
    metros_quadrados: req.body.metros_quadrados,
    num_quartos: req.body.num_quartos,
    num_banheiros: req.body.num_banheiros,
    num_suites: req.body.num_suites,
    num_vagas: req.body.num_vagas,
  });  
  const json = await databaseService.atualizarImovel(imovel);
  res.json(json);
});

app.delete('/removerImovel', async (req, res) => {
  const json = await databaseService.removerImovel(req.body.id);
  res.json(json);
});

app.get('/filtro', async (req, res) => {
  const imovel = databaseService.Imovel.build({
    endereco: req.query.endereco != null ? req.query.endereco : '',
    preco: req.query.preco != null ? req.query.preco : 99999999,
    metros_quadrados: req.query.metros_quadrados != null ? req.query.metros_quadrados : 0,
    num_quartos: req.query.num_quartos != null ? req.query.num_quartos : 0,
    num_banheiros: req.query.num_banheiros != null ? req.query.num_banheiros : 0,
    num_suites: req.query.num_suites != null ? req.query.num_suites : 0,
    num_vagas: req.query.num_vagas != null ? req.query.num_vagas : 0,
  });  
  const json = await databaseService.filtro(imovel);
  res.json(json);
});


app.listen(PORT, HOST);
console.log("APP RUNNING");
