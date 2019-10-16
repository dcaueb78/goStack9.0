const express = require('express');

const server = express();

server.use(express.json());
server.listen(3000);

server.use((req, res, next) => {
  console.count("Number of Requests");
  return next();
})

function checkIdInArray(req, res, next) {
  const project = projects.find(project => project.id === req.params.id);
  if (!project) {
    return res.status(400).json({ error: 'ID is requires' })
  }
  return next();
}

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  projects.push({ id: id, title: title, tasks: [] });
  return res.json(projects);
})

server.put('/projects/:id', checkIdInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(project => project.id === id);
  project.title = title;
  return res.json(projects);
})

server.delete('/projects/:id', checkIdInArray, (req, res) => {
  const { id } = req.params;
  projects.splice(projects.find(project => project.id == id), 1)
  return res.json(projects);
})

server.post('/projects/:id/tasks', checkIdInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(project => project.id === id);
  project.tasks.push(title);
  return res.json(projects);
})