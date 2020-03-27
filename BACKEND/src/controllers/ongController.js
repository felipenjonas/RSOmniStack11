const connection = require('../database/connection');
/**
* biblioteca de criptografia do Node - para 
* gerar Id de ongs aleatoriamente
**/
//Conectção com database
const crypto = require('crypto');



module.exports= {

  // GET FUNCTION
  async index (req,res) {
      const ongs = await connection('ongs').select('*');
    
      console.log(`Todas as ongs foram listadas`);
      return res.json(ongs)
    },

  // POST FUNCTION
  async create (req, res) {
    const {name, email, whatsapp, city, uf} = req.body;

  //Gerar id aleatorios com crypto (4 bits) hexadeciamis
  const id = crypto.randomBytes(4).toString('HEX');

  //operações com database
  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  })
  console.log(`A ONG:${name} foi cadastrada com sucesso`);
    /**
     * Somente o id será retornado para
     * o usuário, para que ele possa receber
     * este id, e guardar ele para fazer
     * o login na aplicação
     */
  return res.json({ id });
  }
};