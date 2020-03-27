const express = require('express');
const cors = require('cors');
const routes = require('./routes');




const app = express();

/**
 * Quando o front end estiver em producao,
 * entao o cors precisa receber a origem para
 * habilitar quem podera acessar a aplicação 
 * de backend. Dessa seguinte forma:
 * app.use(cors({
 *    origin:'url da aplicaçao(front) em prod'
 * })) 
 */


app.use(cors());
app.use(express.json());
app.use(routes);





app.listen(8080, () => { 
  console.log ('servidor iniciado')
});
