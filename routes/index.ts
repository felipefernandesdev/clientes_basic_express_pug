import { Router } from "express";

const router = Router();

router.get('/', (request, response) => {
  response.send('<h1>Obrigado por visitar</h1><h2>Você está em nossa rota principal da aplicação</h2>')
})

export default router;
