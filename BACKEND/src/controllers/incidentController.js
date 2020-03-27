const connection = require('../database/connection');


module.exports = {

  async index(req,res) {
    //PAGINAÇÃO = 5 registros por pagina e também pulando o [0]
    const { page = 1 } = req.query;

    //Query que retornará a quantidade de casos totais
    const [count] = await connection('incidents')
      .count();
  

    const incidents = await connection('incidents')
    //join = relacionar dados de 2 tables
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      //seleciona os campos que eu quero, para nao sobrepor id entre outros
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
        
      
      ]);


      //Header da resposta, informa o total de incidents
    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);

  },


  //POST
  async create(req,res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },

// DELETE
  async delete(req,res) {
    const { id } = req.params;
    
    // verifica se a propria ong que criou quer deletar
    const ong_id = req.headers.authorization;
    const incident = await connection('incidents')
      .where('id',id)
      .select('ong_id')
      .first();

    if (incident.ong_id != ong_id) {
      return res.status(401).json({ erro:'Operation not permitted. ' })
    }

    //Se deu certo, se passou, deleta do banco 
    await connection('incidents').where('id',id).delete();

    return res.status(204).send();

  }

}