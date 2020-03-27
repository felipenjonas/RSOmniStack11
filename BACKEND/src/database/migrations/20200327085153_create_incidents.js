
// Up = Criar a tabela no banco de dados
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments(); //Auto incremento, 1,2,3,4...
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    // Relacionamento
    table.string('ong_id').notNullable();
    // chave estrangeira
    table.foreign('ong_id').references('id').inTable('ongs');
  
  });
};

//down = se der errado a criação, o que fazer?
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
