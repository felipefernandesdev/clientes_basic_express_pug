import { Request, Response } from 'express';
import { IClients } from '../models/clients.interface';
import ClientRepository from '../models/clients.model';


async function home(req: Request, res: Response, next: any) {
  res.render('home');
}

async function index (req: Request, res: Response, next: any) {
  const clients = await ClientRepository.findAll();
  res.render('index', {clients})
};

async function show(req: Request, res: Response, next: any) {
  const client = await ClientRepository.findByPk(req.params.id)

/*   const client = await ClientRepository.findOne({
    where: {id: req.params.id}
  });*/
  res.render('client', {client})
};

//metodo de acessar formulario de cliente
async function create(req: Request, res: Response, next: any) {
  res.render('create')
};

//metodo de salvar o  cliente
async function store(req: Request, res: Response, next: any) {
  try {
    type client = Omit<IClients, "id">;
    await ClientRepository.create(req.body as client)
    res.redirect('/clients')
  } catch (error) {
    console.error("erro: ", error)
    res.status(500).end()
  }
}

//método de editar cliente
  async function edit(req: Request, res: Response, next: any) {
    try {
      const client = await ClientRepository.findByPk(req.params.id);
      if (client === null) {
        res.status(404).send("Não encontrado");
      } else {
        res.status(200).render('edit', { client });
      }
    } catch (error) {
      console.log(error);
      res.status(500)
    }
  }

//metodo que salva a edição do cliente
async function update(req: Request, res: Response, next: any) {
  try {
   await ClientRepository.update(req.body as IClients, {
      where: { id: req.params.id}
    });
    res.redirect('/clients')
  } catch (error) {
    console.error("erro: ", error)
    res.status(500).end()
  }
}

//metodo que deleta cliente
async function remove(req: Request, res: Response, next: any) {
  try {
    const client = await ClientRepository.findByPk(req.params.id)
    if (client) {
      await ClientRepository.destroy({
        where: {
        id: req.params.id
        }
      })
    res.redirect('/clients')
    } else {
      console.error('Não conseguimos encontrar o usuário');
      res.status(404).redirect('/clients')
    }
  } catch (error) {
    console.error("erro: ", error)
    res.status(500).end()
  }
}

export default { index, show, create, store, edit, update, remove, home }
