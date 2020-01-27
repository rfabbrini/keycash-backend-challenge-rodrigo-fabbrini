'use strict';

const assert = require('assert');
const databaseService = require('../src/databaseService');

describe('Database Functions', function() {  
  it('should insert Imovel', async function() {
    //Insere    
    let imovel = databaseService.Imovel.build({
      endereco: "END",
    });
    await databaseService.inserirImovel(imovel);

    //Recupera  
    var imvl;
    await databaseService.Imovel.findAll({where: {endereco:'END'}}).then((result) => {    
      console.log('imovel.find() - Sucesso');
      imvl = result[0];
    }, (error) => {
        console.log('imovel.find() - Erro');
        console.log(error);
    });

    //Remove
    await databaseService.Imovel.destroy({where:{endereco:'END'}}).then((result) => {    
      console.log('imovel.destroy() - Sucesso');
    }, (error) => {
        console.log('imovel.destroy() - Erro');
        console.log(error);
    });

    assert.equal(imvl.endereco, 'END');
  });

  it('should read Imovel', async function() {
      //Insere
      var imovel = databaseService.Imovel.build({
        endereco: "END",
      });
      await imovel.save().then((result) => {
        console.log('imovel.save() - Sucesso');
        imovel = result;
      }, (error) => {
          console.log('imovel.save() - Erro');
          console.log(error);
      });

      //Recupera  
      console.log(imovel);
      const imvl = await databaseService.recuperarImovel(imovel.id);

      //Remove
      await databaseService.Imovel.destroy({where:{id:imovel.id}}).then((result) => {    
          console.log('imovel.destroy() - Sucesso');
      }, (error) => {
          console.log('imovel.destroy() - Erro');
          console.log(error);
      });

      assert.equal(imvl[0].endereco, "END");
  });

  it('should update Imovel', async function() {
    //Insere
    let imovel = databaseService.Imovel.build({
      endereco: "END",
      preco: 99.80
    });
    await imovel.save().then((result) => {
      console.log('imovel.save() - Sucesso');
      imovel = result;
    }, (error) => {
        console.log('imovel.save() - Erro');
        console.log(error);
    });

    //Atualiza
    let imovel2 = databaseService.Imovel.build({
      id: imovel.id,
      endereco: "END",
      preco: 77.45
    });
    await databaseService.atualizarImovel(imovel2);

    //Recupera  
    var imvl;
    await databaseService.Imovel.findAll({where:{endereco:'END'}}).then((result) => {    
      console.log('imovel.find() - Sucesso');
      imvl = result[0];
    }, (error) => {
        console.log('imovel.find() - Erro');
        console.log(error);
    });

    //Remove
    await databaseService.Imovel.destroy({where:{endereco:'END'}}).then((result) => {    
        console.log('imovel.destroy() - Sucesso');
    }, (error) => {
        console.log('imovel.destroy() - Erro');
        console.log(error);
    });

    assert.equal(imvl.preco, 77.45);
  });

  it('should delete Imovel', async function() {
    //Insere
    let imovel = databaseService.Imovel.build({
      endereco: "END",
      preco: 99.80
    });
    await imovel.save().then((result) => {
      console.log('imovel.save() - Sucesso');
      imovel = result;
    }, (error) => {
        console.log('imovel.save() - Erro');
        console.log(error);
    });

    //Remove    
    await databaseService.removerImovel(imovel.id);

    //Recupera  
    var imvl;
    await databaseService.Imovel.findAll({where:{endereco:'END'}}).then((result) => {    
      console.log('imovel.find() - Sucesso');
      imvl = result[0];
    }, (error) => {
        console.log('imovel.find() - Erro');
        console.log(error);
    });

    assert.strictEqual(imvl, undefined);
  });
  
});