const connection = require('../database/connection');



module.exports = {

  //Lista casos especificos de uma perfil de ong
  async index(req,res) {
    const ong_id = req.headers.authorization;

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*')

    return res.json(incidents);
  }
}