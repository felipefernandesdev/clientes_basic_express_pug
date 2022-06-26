import 'dotenv/config';
import express from "express";
import clientsRouter from "./routes/clients";
//import defaultRouter from './routes/index';
import MethodOverride from 'method-override';
import db from "./db";
import logger from 'morgan'

//define config server
const host = 'localhost';
const port = process.env.PORT || 3001;
const url = `http://${host}:${port}`;

const app = express();

//criar a conexão com o banco de dados
db.sync()
  .then(() => console.log(`💾 Banco de Dados: EXPRESS => ${process.env.DB_NAME} ✅`))
  .catch(err => console.log("💾 Banco de Dados => Erro: ", err));

//configs de ultilização
app.use(express.json()); // configura o uso de json dentro da aplicação
app.use(express.urlencoded({ extended: true })); // consfigura o uso de urlencoded dentro da aplicação
app.use(MethodOverride('_method')) // override de dados PUT via FORM HTML
app.use(clientsRouter) // importando as rotas de clientes
app.use(logger('dev'))
//app.use(defaultRouter) //importando rota default
app.set('view engine', 'pug'); // configura o uso de pug para renderização de views
app.set('views', './views'); // configura o diretório de views

//crianção do server
app.listen(port, () => console.log(`✅ Server is running 🚀 on port: ${port} atention PID: ${process.pid}`));
/* const open = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
require('child_process').exec(open + ' ' + url); */
