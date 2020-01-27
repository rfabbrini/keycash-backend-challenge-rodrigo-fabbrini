'use strict';

const mysql = require('mysql');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

var sequelize = new Sequelize('dbKeycash', 'root', 'root', {
  host: '192.168.99.100',
  port: 3306,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(function () {
      console.log("Conectado a database!");
  })
  .catch(function (err) {
      console.log("Erro ao conectar a database!");
  })
.done();

//Create models
const Imovel = sequelize.define('Imovel', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  endereco: Sequelize.STRING,
  preco: Sequelize.DECIMAL,
  metros_quadrados: Sequelize.INTEGER,
  num_quartos: Sequelize.INTEGER,
  num_banheiros: Sequelize.INTEGER,
  num_suites: Sequelize.INTEGER,
  num_vagas: Sequelize.INTEGER
})

module.exports = {
  sequelize: sequelize,
  Imovel: Imovel,

  inserirImovel: async function(imvl) {
    let json = {retorno: "Sucesso"};
    let imovel = Imovel.build({
      endereco: imvl.endereco,
      preco: imvl.preco,
      metros_quadrados: imvl.metros_quadrados,
      num_quartos: imvl.num_quartos,
      num_banheiros: imvl.num_banheiros,
      num_suites: imvl.num_suites,
      num_vagas: imvl.num_vagas,
    });
    await imovel.save().then((result) => {
      console.log('inserirImovel() - Sucesso');
      json = result;
    }, (error) => {
      console.log('inserirImovel() - Erro');
      console.log(error);
      json.retorno = "Erro";
    });
    return json;
  },

  recuperarImovel: async function(id) {
    let imovel;
    await Imovel.findAll({where: {id: id}}).then((result) => {    
      console.log('recuperarImovel() - Sucesso');
      imovel = result;
    }, (error) => {
        console.log('recuperarImovel() - Erro');
        console.log(error);
    });
    return imovel;
  },

  atualizarImovel: async function(imvl) {
    let json = {retorno: "Sucesso"};
    await Imovel.update(
      {      
        endereco: imvl.endereco,
        preco: imvl.preco,
        metros_quadrados: imvl.metros_quadrados,
        num_quartos: imvl.num_quartos,
        num_banheiros: imvl.num_banheiros,
        num_suites: imvl.num_suites,
        num_vagas: imvl.num_vagas,
      },
        {where:{id:imvl.id}}).then((result) => {    
      console.log('atualizarImovel() - Sucesso');
    }, (error) => {
        console.log('atualizarImovel() - Erro');
        console.log(error);
        json.retorno = "Erro";
    });
    return json;
  },

  removerImovel: async function(id) {
    let json = {retorno: "Sucesso"};
    await Imovel.destroy({where:{id: id}}).then((result) => {    
        console.log('removerImovel() - Sucesso');
    }, (error) => {
        console.log('removerImovel() - Erro');
        console.log(error);
        json.retorno = "Erro";
    });
    return json;
  },

  filtro: async function(imovel) {
    let imoveis;
    await Imovel.findAll({where: { [Op.and]: [
        {endereco:{[Op.substring]: imovel.endereco}},
        {preco:{[Op.lte]: imovel.preco}},
        {metros_quadrados:{[Op.gte]: imovel.metros_quadrados}},
        {num_quartos:{[Op.gte]: imovel.num_quartos}},
        {num_banheiros:{[Op.gte]: imovel.num_banheiros}},
        {num_suites:{[Op.gte]: imovel.num_suites}},
        {num_vagas:{[Op.gte]: imovel.num_vagas}},
    ]}}).then((result) => {    
      console.log('recuperarImovel() - Sucesso');
      imoveis = result;
    }, (error) => {
        console.log('recuperarImovel() - Erro');
        console.log(error);
    });
    return imoveis;
  },
}