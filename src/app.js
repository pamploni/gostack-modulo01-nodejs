const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = [];

//middleware para testar o uuid
function mldTestaUuid(req,resp,next){
    const {id} = req.params;

    if (!isUuid(id)){
      return resp.status(400).json({message:'Erro id invalido'});
    }
  next();
}

app.get("/repositories", (request, response) => {
  // Listar repositorios
  // tem que devolver a porra toda em JSON (põe isso na cabeça!!)
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // inserir novo repositorio
  // Lembre de fazer a desestruturação, seu tapado!!!!

  const {title, url, techs } = request.body;
  const id = uuid();

  likes.push({
    id,
    likes: 0,
  });


  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  }
  
  // se não entender, revise as operações com array do java/javascript
  repositories.push(repository);

  return response.json(repository);
});



app.put("/repositories/:id", mldTestaUuid, (request, response) => {
  // pegue o query param desta bagaça e transforme em algo útil
  // Ah... Antes que vc esqueça, desestrura de novo, seu imbecil!!
  const { id } = request.params;

  console.log(id);

  const index = repositories.findIndex(item=>item.id===id);

  if (index<0) {
    return response.status(400).json({message: 'Registro não encontrado!'})
  }

  const {title, url, techs} = request.body;
  
  const likes = 0;
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  }

  repositories[index] = repository

  // Ah... qualé! apague logo o else! náo precisa usar para este contexto, mané!
  return response.json(repository);

});

app.delete("/repositories/:id", mldTestaUuid, (request, response) => {
  // Me polpe!! Copie e cole o que você fez para o método PUT
  const {id} = request.params;

  console.log(id);

  const index = repositories.findIndex(item=>item.id === id);


  if (index<0) {
    return response.status(204).json({message: 'Registro não encontrado!'})
  }

  repositories.splice(index,1);

  // Ah... qualé! apague logo o else! náo precisa usar para este contexto, mané!
  return response.status(204).json(repositories);



});

app.post("/repositories/:id/like", mldTestaUuid, (request, response) => {
  //criar uma variavel que guarde os likes
  //temos que verificar se o usuario existe antes de permitir o like

  const {id} = request.params;

  //verificar se existe usuario
  const index = repositories.findIndex(item => item.id === id);

  if (index < 0) {
    return response.status(400).json({erro: "Usuario nao existe!"});
  }

  repositories[index].likes++;

  return response.json(repositories[index]);
});

module.exports = app;
