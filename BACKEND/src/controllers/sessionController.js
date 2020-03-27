const connection = require('../database/connection');

module.exports = {
  async create(req,res) {
    const { id } = req.body;

    //Tentativa de buscar ong no banco ja existente
    const ong = await connection('ongs')
      .where('id', id)
      //retorna só o nome
      .select('name')
      .first();

    if (!ong) {
      return res.status(400).json({ error: 'No Ong found with this ID'});
    }
     return res.json(ong);
  
  }




}